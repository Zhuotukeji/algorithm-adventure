import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, avatarOptions } from '../context/AuthContext';
import GameHeader from '../components/GameHeader';
import { ArrowRight, User, Lock, Mail, Sparkles, Check } from 'lucide-react';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; confirmPassword?: string }>({});

  const validateForm = () => {
    const newErrors: { username?: string; email?: string; password?: string; confirmPassword?: string } = {};

    if (!username.trim()) {
      newErrors.username = '请输入用户名';
    } else if (username.length < 2) {
      newErrors.username = '用户名至少2个字符';
    } else if (username.length > 20) {
      newErrors.username = '用户名最多20个字符';
    }

    if (!email.trim()) {
      newErrors.email = '请输入邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!password) {
      newErrors.password = '请输入密码';
    } else if (password.length < 6) {
      newErrors.password = '密码至少6个字符';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = '两次密码输入不一致';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    const success = await register(username, email, password);
    setLoading(false);

    if (success) {
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <GameHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-secondary-500 to-adventure-500 rounded-2xl p-8 text-white mb-8 text-center">
            <div className="text-5xl mb-4">🌟</div>
            <h1 className="text-3xl font-bold mb-2">欢迎加入魔法世界！</h1>
            <p className="text-secondary-100">开启你的C++编程冒险之旅</p>
          </div>

          {/* Register Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">创建账号</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Avatar Selection */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">选择你的头像</label>
                <div className="flex flex-wrap gap-3 justify-center">
                  {avatarOptions.map((avatar, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`w-14 h-14 rounded-full text-3xl flex items-center justify-center transition-all ${
                        selectedAvatar === avatar
                          ? 'bg-primary-100 border-3 border-primary-500 scale-110'
                          : 'bg-gray-100 border-2 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {avatar}
                      {selectedAvatar === avatar && (
                        <Check className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white rounded-full p-0.5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">用户名</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.username ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'
                    }`}
                    placeholder="2-20个字符"
                  />
                </div>
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">邮箱</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'
                    }`}
                    placeholder="用于找回密码"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.password ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'
                    }`}
                    placeholder="至少6个字符"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">确认密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.confirmPassword ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'
                    }`}
                    placeholder="再次输入密码"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-secondary-500 to-adventure-500 text-white py-3 rounded-xl font-bold text-lg hover:from-secondary-600 hover:to-adventure-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <span className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    注册中...
                  </span>
                ) : (
                  <span className="flex items-center">
                    开始冒险
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                已有账号？
                <Link to="/login" className="text-primary-600 font-bold hover:text-primary-700 ml-1">
                    立即登录
                </Link>
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 bg-white/50 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-3">🎮 注册福利</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>✅ 专属萌宠陪伴学习</li>
              <li>✅ 记录学习进度</li>
              <li>✅ 每日挑战奖励</li>
              <li>✅ 成就系统激励</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
