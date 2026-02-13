-- 算法小冒险 - 数据库设置脚本
-- 请在 Supabase SQL 编辑器中执行此脚本

-- 1. 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar VARCHAR(10) DEFAULT '🧙‍♂️',
    level INTEGER DEFAULT 1,
    experience INTEGER DEFAULT 0,
    magic_stones INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,
    last_login_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建用户进度表
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    level_id VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'locked',
    attempts INTEGER DEFAULT 0,
    best_code TEXT,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, level_id)
);

-- 3. 创建成就表
CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id VARCHAR(50) NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- 4. 创建宠物表
CREATE TABLE IF NOT EXISTS user_pets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    pet_id VARCHAR(50) NOT NULL,
    pet_name VARCHAR(50) NOT NULL,
    pet_type VARCHAR(20) NOT NULL,
    level INTEGER DEFAULT 1,
    exp INTEGER DEFAULT 0,
    UNIQUE(user_id, pet_id)
);

-- 5. 启用RLS策略
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_pets ENABLE ROW LEVEL SECURITY;

-- 6. 用户表策略
CREATE POLICY "用户可以查看自己的信息" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "用户可以更新自己的信息" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "用户可以插入自己的信息" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 7. 用户进度表策略
CREATE POLICY "用户可以查看自己的进度" ON user_progress
    FOR SELECT USING (user_id = (SELECT id FROM users WHERE auth.uid() = id));

CREATE POLICY "用户可以更新自己的进度" ON user_progress
    FOR UPDATE USING (user_id = (SELECT id FROM users WHERE auth.uid() = id));

CREATE POLICY "用户可以插入自己的进度" ON user_progress
    FOR INSERT WITH CHECK (user_id = (SELECT id FROM users WHERE auth.uid() = id));

-- 8. 成就表策略
CREATE POLICY "用户可以查看自己的成就" ON user_achievements
    FOR SELECT USING (user_id = (SELECT id FROM users WHERE auth.uid() = id));

CREATE POLICY "用户可以插入自己的成就" ON user_achievements
    FOR INSERT WITH CHECK (user_id = (SELECT id FROM users WHERE auth.uid() = id));

-- 9. 宠物表策略
CREATE POLICY "用户可以查看自己的宠物" ON user_pets
    FOR SELECT USING (user_id = (SELECT id FROM users WHERE auth.uid() = id));

CREATE POLICY "用户可以更新自己的宠物" ON user_pets
    FOR UPDATE USING (user_id = (SELECT id FROM users WHERE auth.uid() = id));

CREATE POLICY "用户可以插入自己的宠物" ON user_pets
    FOR INSERT WITH CHECK (user_id = (SELECT id FROM users WHERE auth.uid() = id));

-- 10. 创建索引
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_user_pets_user_id ON user_pets(user_id);

-- 11. 创建默认宠物数据函数
CREATE OR REPLACE FUNCTION init_user_pets(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
    INSERT INTO user_pets (user_id, pet_id, pet_name, pet_type, level, exp)
    VALUES
        (user_uuid, 'pet-1', '变量兔', 'rabbit', 1, 0),
        (user_uuid, 'pet-2', '循环鹰', 'eagle', 1, 0),
        (user_uuid, 'pet-3', '指针猫', 'cat', 1, 0),
        (user_uuid, 'pet-4', '排序龙', 'dragon', 1, 0),
        (user_uuid, 'pet-5', '函数狐', 'fox', 1, 0),
        (user_uuid, 'pet-6', '查找狼', 'wolf', 1, 0)
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- 12. 创建默认关卡进度函数
CREATE OR REPLACE FUNCTION init_user_progress(user_uuid UUID)
RETURNS VOID AS $$
DECLARE
    level_ids TEXT[] := ARRAY['1-1', '1-2', '1-3', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2', '4-3', '4-4', '5-1', '5-2', '5-3', '6-1', '6-2', '6-3', '7-1', '7-2', '7-3', '8-1', '9-1', '9-2', '9-3', '9-4', '10-1', '10-2', '10-3'];
    level_id TEXT;
BEGIN
    FOREACH level_id IN ARRAY level_ids
    LOOP
        INSERT INTO user_progress (user_id, level_id, status, attempts)
        VALUES (user_uuid, level_id, CASE WHEN level_id = '1-1' THEN 'unlocked' ELSE 'locked' END, 0)
        ON CONFLICT (user_id, level_id) DO NOTHING;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 13. 创建自动更新时间戳的触发器
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER user_progress_updated_at
    BEFORE UPDATE ON user_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

SELECT '数据库设置完成！' AS message;
