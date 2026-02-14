import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Level, LevelProgress, Achievement, Pet } from '../types';
import { defaultUser, courseData, achievements as defaultAchievements, pets as defaultPets } from '../data/courseData';
import { useAuth } from './AuthContext';
import { supabase } from '../utils/supabase';

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
  const { user: authUser, updateUserProgress } = useAuth();
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

  // Sync user with auth when authenticated
  useEffect(() => {
    if (authUser) {
      setUser({
        id: authUser.id,
        username: authUser.username,
        avatar: authUser.avatar,
        level: authUser.level,
        experience: authUser.experience,
        magicStones: authUser.magicStones,
        createdAt: authUser.createdAt,
        streak: authUser.streak,
        lastLoginDate: authUser.lastLoginDate
      });

      // Load level progress from database
      const loadLevelProgress = async () => {
        try {
          const { data: progressData, error } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', authUser.id);

          if (error) {
            console.error('Error loading level progress:', error);
            return;
          }

          if (progressData && progressData.length > 0) {
            // Merge database progress with default progress
            const allLevels = courseData.flatMap(chapter => chapter.levels);
            const mergedProgress = allLevels.map((level, index) => {
              const dbProgress = progressData.find(p => p.level_id === level.id);
              if (dbProgress) {
                return {
                  levelId: level.id,
                  status: dbProgress.status as 'locked' | 'unlocked' | 'in_progress' | 'completed',
                  attempts: dbProgress.attempts || 0,
                  completedAt: dbProgress.completed_at ? new Date(dbProgress.completed_at) : undefined,
                  bestCode: dbProgress.best_code || undefined
                };
              }
              // Default: first level unlocked, others locked
              return {
                levelId: level.id,
                status: (index === 0 ? 'unlocked' : 'locked') as 'locked' | 'unlocked' | 'in_progress' | 'completed',
                attempts: 0
              };
            });
            setLevelProgress(mergedProgress);
          }
        } catch (error) {
          console.error('Error loading level progress:', error);
        }
      };

      loadLevelProgress();
    }
  }, [authUser]);

  // Sync game progress back to auth when updated
  useEffect(() => {
    if (authUser) {
      updateUserProgress({
        level: user.level,
        experience: user.experience,
        magicStones: user.magicStones,
        streak: user.streak,
        lastLoginDate: user.lastLoginDate
      });
    }
  }, [user.level, user.experience, user.magicStones, user.streak, user.lastLoginDate]);

  const completeLevel = async (levelId: string, code: string) => {
    // Get user ID for database sync
    const userId = authUser?.id;

    // Update local state
    setLevelProgress(prev => prev.map(progress =>
      progress.levelId === levelId
        ? { ...progress, status: 'completed' as const, completedAt: new Date(), bestCode: code }
        : progress
    ));

    // Unlock next level
    const allLevels = courseData.flatMap(chapter => chapter.levels);
    const currentIndex = allLevels.findIndex(l => l.id === levelId);
    let nextLevelId: string | null = null;
    if (currentIndex < allLevels.length - 1) {
      nextLevelId = allLevels[currentIndex + 1].id;
      setLevelProgress(prev => prev.map(progress =>
        progress.levelId === nextLevelId
          ? { ...progress, status: 'unlocked' as const }
          : progress
      ));
    }

    // Sync to database if user is logged in
    if (userId) {
      try {
        // Mark current level as completed
        await supabase.from('user_progress').upsert({
          user_id: userId,
          level_id: levelId,
          status: 'completed',
          best_code: code,
          completed_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,level_id'
        });

        // Unlock next level in database
        if (nextLevelId) {
          const { data: existingNext } = await supabase
            .from('user_progress')
            .select('status')
            .eq('user_id', userId)
            .eq('level_id', nextLevelId)
            .single();

          if (!existingNext) {
            await supabase.from('user_progress').upsert({
              user_id: userId,
              level_id: nextLevelId,
              status: 'unlocked'
            }, {
              onConflict: 'user_id,level_id'
            });
          } else if (existingNext.status === 'locked') {
            await supabase.from('user_progress').update({
              status: 'unlocked'
            }).eq('user_id', userId).eq('level_id', nextLevelId);
          }
        }
      } catch (error) {
        console.error('Error saving level progress to database:', error);
      }
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
