import React from 'react';
import { DailyChallenge } from '../types';
import { dailyChallenges } from '../data/courseData';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, Award, ArrowRight } from 'lucide-react';

interface DailyChallengeCardProps {
  challenge: DailyChallenge;
}

const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({ challenge }) => {
  const navigate = useNavigate();

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700 border-green-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    hard: 'bg-red-100 text-red-700 border-red-300'
  };

  const difficultyLabels = {
    easy: '简单',
    medium: '中等',
    hard: '困难'
  };

  const isToday = challenge.date === new Date().toISOString().split('T')[0];

  return (
    <div className={`rounded-xl p-5 border-2 transition-all hover:shadow-lg ${
      challenge.completed
        ? 'bg-gray-50 border-gray-200 opacity-75'
        : 'bg-white border-primary-200 hover:border-primary-400'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {isToday && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-primary-500 to-magic-500 text-white text-xs rounded-full">
                今日
              </span>
            )}
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${difficultyColors[challenge.difficulty]}`}>
              {difficultyLabels[challenge.difficulty]}
            </span>
          </div>
          <h4 className="font-bold text-gray-800 text-lg">{challenge.title}</h4>
        </div>
        <div className="text-3xl">
          {challenge.completed ? '✅' : '🎯'}
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>

      {/* Rewards */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center text-secondary-600">
          <Star className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">+{challenge.rewards.experience} 经验</span>
        </div>
        <div className="flex items-center text-magic-600">
          <Award className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">+{challenge.rewards.magicStones} 魔法石</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => {
          if (!challenge.completed) {
            navigate(`/level/daily-${challenge.id}`);
          }
        }}
        disabled={challenge.completed}
        className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center transition-all ${
          challenge.completed
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-primary-500 to-magic-500 text-white hover:from-primary-600 hover:to-magic-600 shadow-md hover:shadow-lg'
        }`}
      >
        {challenge.completed ? (
          <>
            <Award className="w-4 h-4 mr-2" />
            已完成
          </>
        ) : (
          <>
            {isToday ? '开始挑战' : '查看答案'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </button>
    </div>
  );
};

const DailyChallenges: React.FC = () => {
  const todayChallenge = dailyChallenges.find(c => c.date === new Date().toISOString().split('T')[0]);

  return (
    <div className="bg-gradient-to-r from-primary-50 to-magic-50 rounded-xl p-6 mb-8 border border-primary-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Clock className="w-6 h-6 mr-2 text-primary-500" />
          每日挑战
        </h3>
        <span className="text-sm text-gray-500 flex items-center">
          <Star className="w-4 h-4 mr-1 text-secondary-500" />
          连续签到: {0} 天
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {todayChallenge && <DailyChallengeCard challenge={todayChallenge} />}

        {/* Past Challenges Preview */}
        {dailyChallenges.filter(c => c.date !== new Date().toISOString().split('T')[0]).slice(0, 1).map(challenge => (
          <DailyChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>

      {todayChallenge?.completed && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center justify-center text-green-700">
          <Award className="w-5 h-5 mr-2" />
          太棒了！你已完成今天的挑战！
        </div>
      )}
    </div>
  );
};

export default DailyChallenges;
