import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseData, dailyChallenges } from '../data/courseData';
import { useGame } from '../context/GameContext';
import CodeEditor from '../components/CodeEditor';
import VisualizationPanel from '../components/VisualizationPanel';
import { ArrowLeft, ChevronRight, CheckCircle, XCircle, Sparkles, PartyPopper, Lightbulb, Calendar, FileText, ArrowDown, ArrowUp } from 'lucide-react';
import { Level, VisualizationStep, TestCase } from '../types';
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
  const [failedTestCase, setFailedTestCase] = useState<{index: number; testCase: TestCase} | null>(null);
  const [showIOExamples, setShowIOExamples] = useState(true);

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
    setFailedTestCase(null);

    // Simulate compilation and execution
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check each test case individually and provide detailed feedback
    let passedCount = 0;
    let firstFailedTest: {index: number; testCase: TestCase} | null = null;

    for (let i = 0; i < level.testCases.length; i++) {
      const testCase = level.testCases[i];
      let passed = false;

      // Check for key elements in the code based on level
      if (level.id.includes('1-1')) {
        passed = code.includes('cout') && code.includes('Hello');
      } else if (level.id.includes('1-2')) {
        passed = code.includes('int') && code.includes('age') && code.includes('=');
      } else if (level.id.includes('1-3') || level.id.includes('1-4')) {
        passed = code.includes('5') && code.includes('3') && code.includes('+');
      } else if (level.id.includes('1-5')) {
        passed = code.includes('6') && code.includes('7') && code.includes('*');
      } else if (level.id.includes('2-1')) {
        passed = code.includes('cin') && code.includes('num');
      } else if (level.id.includes('2-2') || level.id.includes('2-3')) {
        passed = code.includes('cin') && code.includes('a') && code.includes('b') && code.includes('+');
      } else if (level.id.includes('3-1')) {
        passed = code.includes('if') && code.includes('>');
      } else if (level.id.includes('3-2')) {
        passed = code.includes('if') && code.includes('else') && code.includes('%');
      } else if (level.id.includes('3-3')) {
        passed = code.includes('if') && code.includes('else') && (code.includes('>') || code.includes('a > b') || code.includes('b > a'));
      } else if (level.id.includes('4-1')) {
        passed = code.includes('for') || code.includes('while');
      } else if (level.id.includes('4-2') || level.id.includes('4-5')) {
        passed = code.includes('sum') && (code.includes('for') || code.includes('while'));
      } else if (level.id.includes('5-1')) {
        passed = code.includes('arr[0]') && code.includes('arr[4]');
      } else if (level.id.includes('5-2')) {
        passed = code.includes('max') && code.includes('for');
      } else if (level.id.includes('5-3')) {
        passed = code.includes('sum') && code.includes('for');
      } else if (level.id.includes('5-4')) {
        passed = code.includes('min') && code.includes('for');
      } else if (level.id.includes('6-1')) {
        passed = code.includes('swap') || (code.includes('arr[j]') && code.includes('arr[j+1]'));
      } else if (level.id.includes('6-2')) {
        passed = code.includes('min') && code.includes('for') && code.includes('i + 1');
      } else if (level.id.includes('6-3')) {
        passed = code.includes('for') && code.includes('target');
      } else if (level.id.includes('6-4')) {
        passed = code.includes('key') && code.includes('while') && code.includes('arr[j]');
      } else if (level.id.includes('7-1')) {
        passed = code.includes('void') && code.includes('hello') && code.includes('cout');
      } else if (level.id.includes('7-2')) {
        passed = code.includes('int') && code.includes('add') && code.includes('return');
      } else if (level.id.includes('7-3')) {
        passed = code.includes('return') && code.includes('*');
      } else if (level.id.includes('7-4')) {
        passed = code.includes('isPrime') && code.includes('for') && code.includes('%');
      } else if (level.id.includes('8-1')) {
        passed = code.includes('left') && code.includes('right') && code.includes('mid');
      } else if (level.id.includes('8-2')) {
        passed = code.includes('for') && code.includes('target') && code.includes('break');
      } else if (level.id.includes('8-3')) {
        passed = code.includes('count') && code.includes('++');
      } else if (level.id.includes('9-1')) {
        passed = code.includes('string') && code.includes('cin');
      } else if (level.id.includes('9-2')) {
        passed = code.includes('+') && code.includes('string');
      } else if (level.id.includes('9-3')) {
        passed = code.includes('length') || code.includes('size');
      } else if (level.id.includes('9-4')) {
        passed = code.includes('s[0]') || code.includes('s[0');
      } else if (level.id.includes('9-5')) {
        passed = code.includes('swap') && code.includes('s[');
      } else if (level.id.includes('10-1')) {
        passed = code.includes('if') && code.includes('+') && code.includes('-') && code.includes('*');
      } else if (level.id.includes('10-2')) {
        passed = code.includes('while') && code.includes('rand');
      } else if (level.id.includes('10-3')) {
        passed = code.includes('sum') && code.includes('/') && code.includes('5.0');
      } else if (level.id.includes('10-4')) {
        passed = code.includes('for') && code.includes('if') && code.includes('swap');
      } else if (level.id.includes('10-5')) {
        passed = code.includes('a') && code.includes('b') && code.includes('c');
      } else {
        // Generic check - look for common patterns
        passed = code.includes('cout') || code.includes('cin');
      }

      if (passed) {
        passedCount++;
      } else if (!firstFailedTest) {
        firstFailedTest = { index: i, testCase };
      }
    }

    if (passedCount === level.testCases.length) {
      // All tests passed - Show correct output based on level
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
      // Some tests failed - show detailed error with which test case failed
      setFailedTestCase(firstFailedTest);

      const testCaseInfo = firstFailedTest ? `
📝 测试样例 ${firstFailedTest.index + 1}:
   输入: ${firstFailedTest.testCase.input || '(无)'}
   期望输出: ${firstFailedTest.testCase.expectedOutput}
   说明: ${firstFailedTest.testCase.description}
` : '';

      const progressInfo = `\n\n📊 进度: ${passedCount}/${level.testCases.length} 个测试样例通过`;

      const simulatedError = 'error: expected \';\' before';
      const translated = translateError(simulatedError);

      setError(`哎呀，魔法出错了！😢${testCaseInfo}${progressInfo}

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

            {/* Input/Output Examples */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setShowIOExamples(!showIOExamples)}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold">输入输出样例</span>
                </div>
                {showIOExamples ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              </button>

              {showIOExamples && (
                <div className="p-4 space-y-3">
                  {level.testCases.map((testCase, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600 border-b border-gray-200">
                        样例 {index + 1}
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="flex items-start space-x-2">
                          <span className="text-green-600 text-xs font-bold mt-0.5">输入:</span>
                          <code className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded flex-1 font-mono">
                            {testCase.input || '(无)'}
                          </code>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-blue-600 text-xs font-bold mt-0.5">输出:</span>
                          <code className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded flex-1 font-mono">
                            {testCase.expectedOutput}
                          </code>
                        </div>
                        {testCase.description && (
                          <div className="text-xs text-gray-500 mt-1">
                            💡 {testCase.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
