import React, { useEffect, useState } from 'react';
import { VisualizationStep } from '../types';

interface VisualizationPanelProps {
  steps: VisualizationStep[];
  isPlaying: boolean;
  speed: number;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({
  steps,
  isPlaying,
  speed,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      setIsAnimating(true);
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsAnimating(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed * 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, speed, steps.length]);

  useEffect(() => {
    // Reset when steps change
    setCurrentStep(0);
  }, [steps]);

  const currentData = steps[currentStep];

  return (
    <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-magic-500 to-magic-600 px-4 py-3 text-white">
        <h3 className="font-bold flex items-center">
          <span className="mr-2">🔮</span> 可视化舞台
        </h3>
      </div>

      {/* Visualization Area */}
      <div className="flex-1 p-4 bg-gray-50">
        {steps.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-4">🎬</div>
              <p>点击"运行代码"查看可视化</p>
            </div>
          </div>
        ) : (
          <>
            {/* Array Visualization */}
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">数组状态</div>
              <div className="flex items-end justify-center space-x-1 h-40">
                {currentData?.array.map((value, index) => {
                  const isHighlighted = currentData?.highlight.includes(index);
                  const isSwapping = currentData?.swap &&
                    (currentData.swap[0] === index || currentData.swap[1] === index);

                  return (
                    <div
                      key={index}
                      className={`
                        flex flex-col items-center transition-all duration-300
                        ${isSwapping ? 'animate-bounce' : ''}
                      `}
                    >
                      <div
                        className={`
                          w-10 flex items-center justify-center rounded-t-lg font-bold text-white text-sm
                          transition-all duration-300
                          ${isHighlighted ? 'bg-primary-500 shadow-lg scale-110' :
                            isSwapping ? 'bg-secondary-500 shadow-lg scale-110' :
                            'bg-gray-300'}
                        `}
                        style={{
                          height: `${Math.max(value * 4, 20)}px`,
                        }}
                      >
                        {value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{index}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div className="bg-magic-50 rounded-lg p-3 text-center">
              <p className="text-magic-700 font-medium">
                {currentData?.message || '等待执行...'}
              </p>
            </div>

            {/* Step Indicator */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>步骤 {currentStep + 1} / {steps.length}</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-magic-400 to-magic-600 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Controls */}
            <div className="flex justify-center mt-4 space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`
                    w-3 h-3 rounded-full transition-all
                    ${index === currentStep ? 'bg-magic-500 w-6' : 'bg-gray-300 hover:bg-gray-400'}
                  `}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Legend */}
      {steps.length > 0 && (
        <div className="px-4 py-3 bg-gray-100 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-6 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary-500 rounded mr-2"></div>
              <span className="text-gray-600">当前比较</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-secondary-500 rounded mr-2"></div>
              <span className="text-gray-600">交换元素</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded mr-2"></div>
              <span className="text-gray-600">已排序</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualizationPanel;
