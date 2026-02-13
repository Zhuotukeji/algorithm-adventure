import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Lightbulb, Copy, Check } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning: boolean;
  output: string;
  error: string | null;
  hints: string[];
  onShowHint: () => void;
  currentHint: number;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onReset,
  isRunning,
  output,
  error,
  hints,
  onShowHint,
  currentHint,
}) => {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle Tab key for indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      onChange(newCode);

      // Set cursor position after the tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }

    // Ctrl+Enter or Cmd+Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [code]);

  // Generate line numbers
  const lineNumbers = code.split('\n').map((_, i) => i + 1);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-xl">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-sm ml-3">main.cpp</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500 mr-2 hidden sm:inline">
            Tab 缩进 | Ctrl+Enter 运行
          </span>
          <button
            onClick={handleCopy}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="复制代码"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={onReset}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="重置代码"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="relative flex-1 bg-[#1e1e1e] rounded-b-xl overflow-hidden">
        {/* Line Numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#252526] border-r border-gray-700 flex flex-col items-end py-4 pr-2 text-gray-500 text-sm font-mono select-none z-10">
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6">{num}</div>
          ))}
        </div>

        {/* Editor */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-full min-h-[400px] pl-14 pr-4 py-4 bg-[#1e1e1e] text-gray-100 font-mono text-sm leading-6 resize-none focus:outline-none"
          spellCheck={false}
          placeholder="在这里编写你的C++代码..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-3 rounded-b-xl mt-1">
        <button
          onClick={onShowHint}
          disabled={currentHint >= hints.length}
          className="flex items-center space-x-2 px-3 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors disabled:opacity-50"
        >
          <Lightbulb className="w-4 h-4" />
          <span className="text-sm">
            {currentHint > 0 ? `提示 ${currentHint}/${hints.length}` : '查看提示'}
          </span>
        </button>

        <button
          onClick={onRun}
          disabled={isRunning}
          className={`
            flex items-center space-x-2 px-6 py-2 rounded-lg font-semibold transition-all
            ${isRunning
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-adventure-500 to-adventure-600 hover:from-adventure-600 hover:to-adventure-700 shadow-lg hover:shadow-xl'
            }
          `}
        >
          <Play className={`w-5 h-5 ${isRunning ? 'animate-pulse' : ''}`} />
          <span>{isRunning ? '运行中...' : '运行代码'}</span>
        </button>
      </div>

      {/* Output Area */}
      {(output || error) && (
        <div className="mt-4 rounded-xl overflow-hidden">
          <div className={`
            px-4 py-2 font-semibold text-sm flex items-center
            ${error ? 'bg-red-500/20 text-red-400' : 'bg-adventure-500/20 text-adventure-400'}
          `}>
            {error ? '❌ 错误' : '✅ 输出'}
          </div>
          <div className={`
            p-4 font-mono text-sm max-h-48 overflow-auto whitespace-pre-wrap
            ${error ? 'bg-red-500/10 text-red-300' : 'bg-adventure-500/10 text-gray-100'}
          `}>
            {error || output}
          </div>
        </div>
      )}

      {/* Hint Display */}
      {currentHint > 0 && currentHint <= hints.length && (
        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-yellow-500 mb-1">提示 {currentHint}</div>
              <div className="text-gray-700">{hints[currentHint - 1]}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
