import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import { Sparkles, User, Menu, Home, LogOut, Settings, Flame } from 'lucide-react';

const GameHeader: React.FC = () => {
  const { user } = useGame();
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const expToNextLevel = user.level * 100;
  const expPercentage = (user.experience / expToNextLevel) * 100;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">算法小冒险</h1>
              <p className="text-xs text-primary-100">C++ 编程魔法学院</p>
            </div>
          </Link>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            {/* Streak */}
            {authUser && authUser.streak > 0 && (
              <div className="hidden sm:flex items-center space-x-1 bg-orange-500/20 rounded-full px-3 py-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="font-bold text-orange-300">{authUser.streak}</span>
              </div>
            )}

            {/* Level Badge */}
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
              <div className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center font-bold text-sm">
                {user.level}
              </div>
              <div className="hidden sm:block">
                <div className="text-xs text-primary-100">等级</div>
                <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full transition-all duration-500"
                    style={{ width: `${expPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Magic Stones */}
            <div className="flex items-center space-x-1 bg-white/10 rounded-full px-3 py-2">
              <span className="text-lg">💎</span>
              <span className="font-bold">{user.magicStones}</span>
            </div>

            {/* Avatar with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 bg-white/10 rounded-xl px-3 py-2 hover:bg-white/20 transition-colors"
              >
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">{user.avatar}</span>
                </div>
                <div className="hidden md:block">
                  <div className="font-semibold text-sm">{user.username}</div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="font-semibold text-gray-800">{user.username}</div>
                    <div className="text-xs text-gray-500">等级 {user.level} · {user.experience} 经验</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>退出登录</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Header for auth pages (Login/Register) - simplified version
export const AuthHeader: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">算法小冒险</h1>
            <p className="text-xs text-primary-100">C++ 编程魔法学院</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default GameHeader;
