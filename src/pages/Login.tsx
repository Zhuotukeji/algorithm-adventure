import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GameHeader } from '../components/GameHeader';
import { ArrowRight, User, Lock, Sparkles } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert('请填写用户名和密码！');
      return;
    }

    setLoading(true);
    const success = await login(username, password);
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
          <div className="bg-gradient-to-r from-primary-500 to-magic-500 rounded-2xl p-8 text-white mb-8 text-center">
            <div className="text-5xl mb-4">🧙‍♂️</div>
            <h1 className="text-3xl font-bold mb-2">欢迎回来，小法师！</h1>
            <p className="text-primary-100">继续你的编程冒险之旅</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">登录账号</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">用户名 / 邮箱</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="请输入用户名或邮箱"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="请输入密码"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-500 to-magic-500 text-white py-3 rounded-xl font-bold text-lg hover:from-primary-600 hover:to-magic-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <span className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    登录中...
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
                还没有账号？
                <Link to="/register" className="text-primary-600 font-bold hover:text-primary-700 ml-1">
                  立即注册
                </Link>
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 bg-white/50 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-3">💡 登录提示</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>• 使用注册时填写的用户名或邮箱登录</li>
              <li>• 密码区分大小写，请注意区分</li>
              <li>• 连续登录可以获得更多奖励哦！</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
