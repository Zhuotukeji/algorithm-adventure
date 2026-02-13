import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Level, LevelProgress, Achievement, Pet } from '../types';
import { defaultUser, courseData, achievements as defaultAchievements, pets as defaultPets } from '../data/courseData';

interface GameContextType {
  user: User;
  setUser: (user: User) => void;
  currentLevel: Level | null;
  setCurrentLevel: (level: Level | null) => void;
  levelProgress: LevelProgress[];
  completeLevel: (levelId: string, code: string) => void;
  achievements: Achievement[];
  unlockAchievement: (achievementId: string) => void;
  pets: Pet[];
  addExp: (exp: number) => void;
  addMagicStones: (stones: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [levelProgress, setLevelProgress] = useState<LevelProgress[]>(() => {
    // Initialize with first level unlocked
    return courseData.flatMap(chapter => chapter.levels).map((level, index) => ({
      levelId: level.id,
      status: index === 0 ? 'unlocked' : 'locked',
      attempts: 0,
    }));
  });
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [pets, setPets] = useState<Pet[]>(defaultPets);

  const completeLevel = (levelId: string, code: string) => {
    setLevelProgress(prev => prev.map(progress =>
      progress.levelId === levelId
        ? { ...progress, status: 'completed' as const, completedAt: new Date(), bestCode: code }
        : progress
    ));

    // Unlock next level
    const allLevels = courseData.flatMap(chapter => chapter.levels);
    const currentIndex = allLevels.findIndex(l => l.id === levelId);
    if (currentIndex < allLevels.length - 1) {
      setLevelProgress(prev => prev.map(progress =>
        progress.levelId === allLevels[currentIndex + 1].id
          ? { ...progress, status: 'unlocked' as const }
          : progress
      ));
    }
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => prev.map(achievement =>
      achievement.id === achievementId
        ? { ...achievement, unlockedAt: new Date() }
        : achievement
    ));
  };

  const addExp = (exp: number) => {
    setUser(prev => {
      const newExp = prev.experience + exp;
      // Level up logic
      const expToLevel = prev.level * 100;
      if (newExp >= expToLevel) {
        return {
          ...prev,
          experience: newExp - expToLevel,
          level: prev.level + 1,
        };
      }
      return { ...prev, experience: newExp };
    });
  };

  const addMagicStones = (stones: number) => {
    setUser(prev => ({ ...prev, magicStones: prev.magicStones + stones }));
  };

  return (
    <GameContext.Provider value={{
      user,
      setUser,
      currentLevel,
      setCurrentLevel,
      levelProgress,
      completeLevel,
      achievements,
      unlockAchievement,
      pets,
      addExp,
      addMagicStones,
    }}>
      {children}
    </GameContext.Provider>
  );
};
