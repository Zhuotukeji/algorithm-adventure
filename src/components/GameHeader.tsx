import React from 'react';
import { useGame } from '../context/GameContext';
import { Sparkles, User, Menu, Home } from 'lucide-react';

const GameHeader: React.FC = () => {
  const { user } = useGame();

  const expToNextLevel = user.level * 100;
  const expPercentage = (user.experience / expToNextLevel) * 100;

  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">算法小冒险</h1>
              <p className="text-xs text-primary-100">C++ 编程魔法学院</p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-6">
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

            {/* Avatar */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">{user.avatar}</span>
              </div>
              <div className="hidden md:block">
                <div className="font-semibold">{user.username}</div>
                <div className="text-xs text-primary-100">小法师</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
