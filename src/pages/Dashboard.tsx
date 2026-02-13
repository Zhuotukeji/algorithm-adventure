import React from 'react';
import GameHeader from '../components/GameHeader';
import ChapterMap from '../components/ChapterMap';
import { useGame } from '../context/GameContext';
import { Trophy, Target, Flame, Gift, PawPrint } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, achievements, pets, levelProgress } = useGame();

  const completedLevels = levelProgress.filter(l => l.status === 'completed').length;
  const totalLevels = 10; // For demo

  const unlockedAchievements = achievements.filter(a => a.unlockedAt).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <GameHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary-500 to-magic-500 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">欢迎回来，小法师！🧙‍♂️</h2>
              <p className="text-primary-100">今天也要继续你的编程冒险吗？</p>
            </div>
            <div className="hidden md:block">
              <div className="text-6xl animate-float">🚀</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-md flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{completedLevels}</div>
              <div className="text-xs text-gray-500">完成关卡</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{user.level}</div>
              <div className="text-xs text-gray-500">当前等级</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{user.experience}</div>
              <div className="text-xs text-gray-500">经验值</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-magic-400 to-magic-600 rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{unlockedAchievements}/{achievements.length}</div>
              <div className="text-xs text-gray-500">成就解锁</div>
            </div>
          </div>
        </div>

        {/* Achievements Preview */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-secondary-500" />
              成就徽章
            </h3>
            <span className="text-sm text-gray-500">{unlockedAchievements} / {achievements.length}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-full border-2
                  ${achievement.unlockedAt
                    ? 'bg-gradient-to-r from-secondary-50 to-secondary-100 border-secondary-300'
                    : 'bg-gray-50 border-gray-200 opacity-50'}
                `}
              >
                <span className="text-2xl">{achievement.icon}</span>
                <div className="text-left">
                  <div className="font-semibold text-sm">{achievement.name}</div>
                  <div className="text-xs text-gray-500">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pets Preview */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <PawPrint className="w-6 h-6 mr-2 text-adventure-500" />
              魔法宠物
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {pets.map(pet => (
              <div
                key={pet.id}
                className="flex items-center space-x-3 bg-gradient-to-br from-adventure-50 to-adventure-100 rounded-xl p-3 border border-adventure-200"
              >
                <span className="text-4xl">{pet.image}</span>
                <div>
                  <div className="font-bold text-gray-800">{pet.name}</div>
                  <div className="text-xs text-gray-600">等级 {pet.level}</div>
                  <div className="text-xs text-primary-600">{pet.skills[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-2">🗺️</span> 冒险地图
          </h3>
          <ChapterMap />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
