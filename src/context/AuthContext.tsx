import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase 配置
const supabaseUrl = 'https://unjspenxavczhdhfhqln.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuanNwZW54YXZjemhkaGZocWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTc0ODYsImV4cCI6MjA4NjU3MzQ4Nn0.Eg6Xb9XPCjnVmW5NPTpsS9J2VpnjdZskWlMDFUoj5xo';

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

interface User {
  id: string;
  username: string;
  avatar: string;
  email?: string;
  createdAt: Date;
}

interface AuthUser extends User {
  level: number;
  experience: number;
  magicStones: number;
  streak: number;
  lastLoginDate: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserProgress: (progress: Partial<AuthUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage key for current user
const CURRENT_USER_KEY = 'algorithm_adventure_current_user';

// Avatars for users to choose
export const avatarOptions = ['🧙‍♂️', '🧙‍♀️', '🦸', '🦸‍♀️', '🧝', '🧝‍♀️', '🐉', '🦄', '🐲', '🦅'];

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simple password hashing (for demo purposes - in production use proper hashing)
  const hashPassword = (password: string): string => {
    // Simple base64 encoding (not secure for production!)
    return btoa(password);
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.createdAt = new Date(parsedUser.createdAt);
        setUser(parsedUser);
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Initialize user data in database
  const initializeUserData = async (userId: string) => {
    // Initialize progress
    const levelIds = [
      '1-1', '1-2', '1-3', '2-1', '2-2', '3-1', '3-2',
      '4-1', '4-2', '4-3', '4-4', '5-1', '5-2', '5-3',
      '6-1', '6-2', '6-3', '7-1', '7-2', '7-3', '8-1',
      '9-1', '9-2', '9-3', '9-4', '10-1', '10-2', '10-3'
    ];

    // Insert level progress for each level
    for (let i = 0; i < levelIds.length; i++) {
      const levelId = levelIds[i];
      const status = levelId === '1-1' ? 'unlocked' : 'locked';

      await supabase.from('user_progress').upsert({
        user_id: userId,
        level_id: levelId,
        status: status,
        attempts: 0
      }, {
        onConflict: 'user_id,level_id'
      });
    }

    // Initialize pets
    const pets = [
      { pet_id: 'pet-1', pet_name: '变量兔', pet_type: 'rabbit' },
      { pet_id: 'pet-2', pet_name: '循环鹰', pet_type: 'eagle' },
      { pet_id: 'pet-3', pet_name: '指针猫', pet_type: 'cat' },
      { pet_id: 'pet-4', pet_name: '排序龙', pet_type: 'dragon' },
      { pet_id: 'pet-5', pet_name: '函数狐', pet_type: 'fox' },
      { pet_id: 'pet-6', pet_name: '查找狼', pet_type: 'wolf' }
    ];

    for (const pet of pets) {
      await supabase.from('user_pets').upsert({
        user_id: userId,
        ...pet,
        level: 1,
        exp: 0
      }, {
        onConflict: 'user_id,pet_id'
      });
    }
  };

  // Register new user
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // Check if username or email already exists
      const { data: existingUsers } = await supabase
        .from('users')
        .select('username, email')
        .or(`username.eq.${username},email.eq.${email}`)
        .single();

      if (existingUsers) {
        if (existingUsers.username === username) {
          alert('用户名已存在！');
          return false;
        }
        if (existingUsers.email === email) {
          alert('邮箱已被注册！');
          return false;
        }
      }

      // Create new user
      const today = new Date().toISOString().split('T')[0];
      const { data: newUser, error } = await supabase
        .from('users')
        .insert({
          username,
          email,
          password_hash: hashPassword(password),
          avatar: avatarOptions[Math.floor(Math.random() * avatarOptions.length)],
          level: 1,
          experience: 0,
          magic_stones: 0,
          streak: 1,
          last_login_date: today,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Registration error:', error);
        alert('注册失败，请重试！');
        return false;
      }

      // Initialize user data in database
      if (newUser) {
        await initializeUserData(newUser.id);

        // Set current user
        const userData: AuthUser = {
          id: newUser.id,
          username: newUser.username,
          avatar: newUser.avatar,
          email: newUser.email,
          createdAt: new Date(newUser.created_at),
          level: newUser.level,
          experience: newUser.experience,
          magicStones: newUser.magic_stones,
          streak: newUser.streak,
          lastLoginDate: newUser.last_login_date
        };

        setUser(userData);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
      }

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      alert('注册失败，请重试！');
      return false;
    }
  };

  // Login user
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const { data: foundUser, error } = await supabase
        .from('users')
        .select('*')
        .or(`username.eq.${username},email.eq.${username}`)
        .single();

      if (error || !foundUser) {
        alert('用户名或密码错误！');
        return false;
      }

      // Verify password
      if (foundUser.password_hash !== hashPassword(password)) {
        alert('用户名或密码错误！');
        return false;
      }

      // Check streak - if last login was yesterday, increment streak
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

      let newStreak = foundUser.streak;
      if (foundUser.last_login_date === yesterday) {
        newStreak += 1;
      } else if (foundUser.last_login_date !== today) {
        newStreak = 1; // Reset streak if more than 1 day gap
      }

      // Update last login date and streak
      const { error: updateError } = await supabase
        .from('users')
        .update({
          last_login_date: today,
          streak: newStreak
        })
        .eq('id', foundUser.id);

      if (updateError) {
        console.error('Update error:', updateError);
      }

      // Set current user
      const userData: AuthUser = {
        id: foundUser.id,
        username: foundUser.username,
        avatar: foundUser.avatar,
        email: foundUser.email,
        createdAt: new Date(foundUser.created_at),
        level: foundUser.level,
        experience: foundUser.experience,
        magicStones: foundUser.magic_stones,
        streak: newStreak,
        lastLoginDate: today
      };

      setUser(userData);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));

      return true;
    } catch (error) {
      console.error('Login error:', error);
      alert('登录失败，请重试！');
      return false;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  // Update user progress in database
  const updateUserProgress = async (progress: Partial<AuthUser>) => {
    if (!user) return;

    try {
      const updateData: Record<string, unknown> = {};

      if (progress.level !== undefined) updateData.level = progress.level;
      if (progress.experience !== undefined) updateData.experience = progress.experience;
      if (progress.magicStones !== undefined) updateData.magic_stones = progress.magicStones;
      if (progress.streak !== undefined) updateData.streak = progress.streak;
      if (progress.lastLoginDate !== undefined) updateData.last_login_date = progress.lastLoginDate;

      if (Object.keys(updateData).length > 0) {
        const { error } = await supabase
          .from('users')
          .update(updateData)
          .eq('id', user.id);

        if (error) {
          console.error('Update progress error:', error);
        }
      }

      // Update local state
      const updatedUser = { ...user, ...progress };
      setUser(updatedUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Update progress error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateUserProgress
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
