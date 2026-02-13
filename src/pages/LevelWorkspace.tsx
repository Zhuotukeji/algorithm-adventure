import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseData, dailyChallenges } from '../data/courseData';
import { useGame } from '../context/GameContext';
import CodeEditor from '../components/CodeEditor';
import VisualizationPanel from '../components/VisualizationPanel';
import { ArrowLeft, ChevronRight, CheckCircle, XCircle, Sparkles, PartyPopper, Lightbulb, Calendar } from 'lucide-react';
import { Level, VisualizationStep } from '../types';
import { translateError } from '../utils/errorTranslations';

const LevelWorkspace: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const { setCurrentLevel, completeLevel, addExp, addMagicStones, levelProgress } = useGame();

  const [level, setLevel] = useState<Level | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [visualizationSteps, setVisualizationSteps] = useState<VisualizationStep[]>([]);
  const [isVisualizing, setIsVisualizing] = useState(false);

  // Find level data (supports both regular levels and daily challenges)
  useEffect(() => {
    if (!levelId) return;

    // First try to find in regular course levels
    const allLevels = courseData.flatMap(chapter => chapter.levels);
    let foundLevel = allLevels.find(l => l.id === levelId);

    // If not found, check if it's a daily challenge
    if (!foundLevel && levelId.startsWith('daily-')) {
      const challenge = dailyChallenges.find(c => c.id === levelId || `daily-${c.id}` === levelId);
      if (challenge) {
        // Convert DailyChallenge to Level format
        foundLevel = {
          id: challenge.id,
          chapterId: 0,
          chapterName: '每日挑战',
          name: challenge.title,
          description: challenge.description,
          story: challenge.description,
          npc: {
            name: '每日挑战导师',
            avatar: '🎯',
            dialogue: '完成这个挑战来获得额外奖励！'
          },
          difficulty: challenge.difficulty,
          type: 'challenge' as const,
          codeTemplate: challenge.codeTemplate,
          solution: challenge.solution,
          testCases: challenge.testCases,
          hints: ['仔细思考问题的解法', '尝试使用数学方法简化问题'],
          rewards: challenge.rewards
        };
      }
    }

    if (foundLevel) {
      setLevel(foundLevel);
      setCurrentLevel(foundLevel);
      setCode(foundLevel.codeTemplate);
    }
  }, [levelId, setCurrentLevel]);

  // Get previous level progress
  const getLevelStatus = (id: string) => {
    const progress = levelProgress.find(p => p.levelId === id);
    return progress?.status || 'locked';
  };

  // Simulated code execution (for demo purposes)
  const runCode = useCallback(async () => {
    if (!level) return;

    setIsRunning(true);
    setOutput('');
    setError(null);
    setVisualizationSteps([]);
    setIsVisualizing(false);

    // Simulate compilation and execution
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple simulation - check if code contains expected solution elements
    const hasSolution = level.testCases.some(testCase => {
      // Check for key elements in the code
      if (level.id.includes('1-1')) {
        return code.includes('cout') && code.includes('Hello');
      }
      if (level.id.includes('1-2')) {
        return code.includes('int') && code.includes('age') && code.includes('=');
      }
      if (level.id.includes('1-3')) {
        return code.includes('5') && code.includes('3') && code.includes('+');
      }
      if (level.id.includes('2-1')) {
        return code.includes('cin') && code.includes('num');
      }
      if (level.id.includes('2-2')) {
        return code.includes('cin') && code.includes('a') && code.includes('b') && code.includes('+');
      }
      if (level.id.includes('3-1')) {
        return code.includes('if') && code.includes('>');
      }
      if (level.id.includes('3-2')) {
        return code.includes('if') && code.includes('else') && code.includes('%');
      }
      if (level.id.includes('4-1')) {
        return code.includes('for') || code.includes('while');
      }
      if (level.id.includes('4-2')) {
        return code.includes('sum') && (code.includes('for') || code.includes('while'));
      }
      if (level.id.includes('5-1')) {
        return code.includes('arr[0]') && code.includes('arr[4]');
      }
      if (level.id.includes('5-2')) {
        return code.includes('max') && code.includes('for');
      }
      if (level.id.includes('6-1')) {
        return code.includes('swap') || (code.includes('arr[j]') && code.includes('arr[j+1]'));
      }
      return false;
    });

    if (hasSolution) {
      // Show correct output based on level
      const correctOutput = level.testCases[0]?.expectedOutput || '正确！';
      setOutput(correctOutput);

      // Generate visualization steps for sorting levels
      if (level.id.includes('6-1')) {
        const steps: VisualizationStep[] = [];
        const arr = [5, 2, 8, 1, 9, 3];
        const n = arr.length;

        // Bubble sort steps
        for (let i = 0; i < n - 1; i++) {
          for (let j = 0; j < n - i - 1; j++) {
            steps.push({
              step: steps.length + 1,
              array: [...arr],
              highlight: [j, j + 1],
              message: `比较 arr[${j}]=${arr[j]} 和 arr[${j+1}]=${arr[j+1]}`,
            });

            if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              steps.push({
                step: steps.length + 1,
                array: [...arr],
                highlight: [j, j + 1],
                swap: [j, j + 1],
                message: `交换！arr[${j}]=${arr[j]} 和 arr[${j+1}]=${arr[j+1]}`,
              });
            }
          }
        }
        steps.push({
          step: steps.length + 1,
          array: [1, 2, 3, 5, 8, 9],
          highlight: [],
          message: '排序完成！🎉',
        });

        setVisualizationSteps(steps);
        setIsVisualizing(true);
      }

      // Show success after a delay
      setTimeout(() => {
        setShowSuccess(true);
        completeLevel(level.id, code);
        addExp(level.rewards.experience);
        addMagicStones(level.rewards.magicStones);
      }, 1000);
    } else {
      // Show kid-friendly error using the translation system
      const simulatedError = 'error: expected \';\' before'; // Simulated error for demo
      const translated = translateError(simulatedError);

      setError(`哎呀，魔法出错了！😢

${translated.message}

💡 小贴士：${translated.tip}

再试一次吧！加油！💪`);
    }

    setIsRunning(false);
  }, [level, code, completeLevel, addExp, addMagicStones]);

  const handleReset = () => {
    if (level) {
      setCode(level.codeTemplate);
      setOutput('');
      setError(null);
      setShowSuccess(false);
      setCurrentHint(0);
      setVisualizationSteps([]);
    }
  };

  const handleShowHint = () => {
    if (level && currentHint < level.hints.length) {
      setCurrentHint(prev => prev + 1);
    }
  };

  const handleNextLevel = () => {
    const allLevels = courseData.flatMap(chapter => chapter.levels);
    const currentIndex = allLevels.findIndex(l => l.id === levelId);
    if (currentIndex < allLevels.length - 1) {
      const nextLevel = allLevels[currentIndex + 1];
      navigate(`/level/${nextLevel.id}`);
    } else {
      navigate('/');
    }
  };

  if (!level) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>返回地图</span>
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-2xl">{level.npc.avatar}</span>
              <div>
                <h1 className="font-bold text-gray-800">{level.name}</h1>
                <p className="text-xs text-gray-500">{level.chapterName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-semibold">
                +{level.rewards.experience} 经验
              </span>
              <span className="px-2 py-1 bg-secondary-100 text-secondary-600 rounded-full text-xs font-semibold">
                💎 {level.rewards.magicStones}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Story & Task */}
          <div className="space-y-4">
            {/* NPC Dialogue */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 text-white">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{level.npc.avatar}</span>
                  <div>
                    <div className="font-bold">{level.npc.name}</div>
                    <div className="text-xs text-primary-100">魔法导师</div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 leading-relaxed">{level.story}</p>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border-l-4 border-primary-500">
                  <div className="text-sm font-semibold text-primary-600 mb-1">任务目标</div>
                  <p className="text-gray-700">{level.npc.dialogue}</p>
                </div>
              </div>
            </div>

            {/* Difficulty & Type */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between">
                <span className={`
                  px-3 py-1 rounded-full text-sm font-semibold
                  ${level.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    level.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'}
                `}>
                  {level.difficulty === 'easy' ? '🌱 简单' :
                   level.difficulty === 'medium' ? '🌟 中等' : '🔥 困难'}
                </span>
                <span className="text-gray-500 text-sm">
                  {level.type === 'tutorial' ? '📖 教程关' :
                   level.type === 'practice' ? '✏️ 练习关' : '🏆 挑战关'}
                </span>
              </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
              <div className="bg-gradient-to-br from-adventure-500 to-adventure-600 rounded-xl p-6 text-white shadow-xl animate-pulse-glow">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold mb-2">恭喜通关！</h3>
                  <p className="text-adventure-100 mb-4">你成功完成了这个关卡！</p>
                  <div className="flex justify-center space-x-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">+{level.rewards.experience}</div>
                      <div className="text-xs text-adventure-200">经验值</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">💎{level.rewards.magicStones}</div>
                      <div className="text-xs text-adventure-200">魔法石</div>
                    </div>
                  </div>
                  <button
                    onClick={handleNextLevel}
                    className="w-full bg-white text-adventure-600 py-3 rounded-lg font-bold hover:bg-adventure-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>下一关</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Middle Panel - Code Editor */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            {/* Code Editor */}
            <div className="flex-1 min-h-[500px]">
              <CodeEditor
                code={code}
                onChange={setCode}
                onRun={runCode}
                onReset={handleReset}
                isRunning={isRunning}
                output={output}
                error={error}
                hints={level.hints}
                onShowHint={handleShowHint}
                currentHint={currentHint}
              />
            </div>

            {/* Visualization Panel */}
            <div className="h-80">
              <VisualizationPanel
                steps={visualizationSteps}
                isPlaying={isVisualizing}
                speed={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelWorkspace;
