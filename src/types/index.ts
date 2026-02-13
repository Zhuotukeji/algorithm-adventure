// User types
export interface User {
  id: string;
  username: string;
  avatar: string;
  level: number;
  experience: number;
  magicStones: number;
  createdAt: Date;
  streak: number; // 连续登录天数
  lastLoginDate: string;
}

// Daily Challenge types
export interface DailyChallenge {
  id: string;
  date: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  codeTemplate: string;
  solution: string;
  testCases: TestCase[];
  rewards: {
    experience: number;
    magicStones: number;
  };
  completed: boolean;
}

// Game progress types
export interface LevelProgress {
  levelId: string;
  status: 'locked' | 'unlocked' | 'in_progress' | 'completed';
  attempts: number;
  bestCode?: string;
  completedAt?: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

// Pet system types
export interface Pet {
  id: string;
  name: string;
  type: string;
  level: number;
  exp: number;
  image: string;
  skills: string[];
}

// Course and level types
export interface Level {
  id: string;
  chapterId: number;
  chapterName: string;
  name: string;
  description: string;
  story: string;
  npc: NPC;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'tutorial' | 'practice' | 'challenge';
  codeTemplate: string;
  solution: string;
  testCases: TestCase[];
  hints: string[];
  rewards: {
    experience: number;
    magicStones: number;
  };
  unlockRequirement?: {
    previousLevel: string;
  };
}

export interface Chapter {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  levels: Level[];
}

export interface NPC {
  name: string;
  avatar: string;
  dialogue: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

// Code execution types
export interface CodeExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
  memoryUsed?: number;
}

// Visualization types
export interface VisualizationStep {
  step: number;
  array: number[];
  highlight: number[];
  swap?: [number, number];
  message: string;
}

// Game state types
export interface GameState {
  user: User;
  currentLevel?: Level;
  levelProgress: LevelProgress[];
  achievements: Achievement[];
  pets: Pet[];
}
