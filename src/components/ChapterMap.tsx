import React from 'react';
import { useGame } from '../context/GameContext';
import { courseData } from '../data/courseData';
import { Level } from '../types';
import { Lock, CheckCircle, PlayCircle, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChapterMap: React.FC = () => {
  const { levelProgress, setCurrentLevel } = useGame();
  const navigate = useNavigate();

  const getLevelStatus = (levelId: string) => {
    const progress = levelProgress.find(p => p.levelId === levelId);
    return progress?.status || 'locked';
  };

  const handleLevelClick = (level: Level) => {
    const status = getLevelStatus(level.id);
    if (status === 'locked') return;
    setCurrentLevel(level);
    navigate(`/level/${level.id}`);
  };

  const getCompletedCount = (chapterId: number) => {
    const chapter = courseData.find(c => c.id === chapterId);
    if (!chapter) return 0;
    return chapter.levels.filter(l => getLevelStatus(l.id) === 'completed').length;
  };

  return (
    <div className="space-y-8">
      {courseData.map((chapter, chapterIndex) => (
        <div
          key={chapter.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Chapter Header */}
          <div className={`bg-gradient-to-r ${chapter.color} p-6 text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{chapter.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold">{chapter.name}</h2>
                  <p className="text-white/80">{chapter.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {getCompletedCount(chapter.id)}/{chapter.levels.length}
                </div>
                <div className="text-sm text-white/80">已完成关卡</div>
              </div>
            </div>
          </div>

          {/* Levels Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapter.levels.map((level, levelIndex) => {
                const status = getLevelStatus(level.id);
                const isLocked = status === 'locked';
                const isCompleted = status === 'completed';

                return (
                  <button
                    key={level.id}
                    onClick={() => handleLevelClick(level)}
                    disabled={isLocked}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all duration-300
                      ${isLocked
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                        : isCompleted
                          ? 'border-adventure-300 bg-adventure-50 hover:shadow-lg hover:scale-105 cursor-pointer'
                          : 'border-primary-200 bg-primary-50 hover:shadow-lg hover:scale-105 cursor-pointer'
                      }
                    `}
                  >
                    {/* Level Number Badge */}
                    <div className={`
                      absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm
                      ${isLocked ? 'bg-gray-400' : isCompleted ? 'bg-adventure-500' : 'bg-primary-500'}
                    `}>
                      {isLocked ? <Lock className="w-5 h-5" /> : isCompleted ? <CheckCircle className="w-5 h-5" /> : levelIndex + 1}
                    </div>

                    {/* Level Content */}
                    <div className="mt-2">
                      <h3 className="font-bold text-gray-800 text-lg">{level.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{level.description}</p>

                      {/* Difficulty & Type */}
                      <div className="flex items-center justify-between mt-3">
                        <span className={`
                          text-xs px-2 py-1 rounded-full
                          ${level.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                            level.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'}
                        `}>
                          {level.difficulty === 'easy' ? '简单' : level.difficulty === 'medium' ? '中等' : '困难'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {level.type === 'tutorial' ? '📖 教程' : level.type === 'practice' ? '✏️ 练习' : '🏆 挑战'}
                        </span>
                      </div>

                      {/* Rewards */}
                      <div className="flex items-center space-x-3 mt-3 text-sm">
                        <span className="flex items-center text-primary-600">
                          <Star className="w-4 h-4 mr-1" />
                          +{level.rewards.experience} 经验
                        </span>
                        <span className="flex items-center text-secondary-600">
                          💎 +{level.rewards.magicStones}
                        </span>
                      </div>
                    </div>

                    {/* Arrow for unlocked levels */}
                    {!isLocked && (
                      <div className="absolute bottom-4 right-4 text-primary-400">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChapterMap;
