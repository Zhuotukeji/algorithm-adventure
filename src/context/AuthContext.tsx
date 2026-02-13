import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  avatar: string;
  email?: string;
  createdAt: Date;
}

interface AuthUser extends User {
  level: number;
  experience: number;
  magicStones: number;
  streak: number;
  lastLoginDate: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserProgress: (progress: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const USERS_KEY = 'algorithm_adventure_users';
const CURRENT_USER_KEY = 'algorithm_adventure_current_user';

// Avatars for users to choose
export const avatarOptions = ['🧙‍♂️', '🧙‍♀️', '🦸', '🦸‍♀️', '🧝', '🧝‍♀️', '🐉', '🦄', '🐲', '🦅'];

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Restore date objects
        parsedUser.createdAt = new Date(parsedUser.createdAt);
        if (parsedUser.lastLoginDate) {
          parsedUser.lastLoginDate = parsedUser.lastLoginDate;
        }
        setUser(parsedUser);
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Get all users from storage
  const getUsers = (): Array<{ id: string; username: string; email: string; password: string; avatar: string; createdAt: Date; level: number; experience: number; magicStones: number; streak: number; lastLoginDate: string }> => {
    const stored = localStorage.getItem(USERS_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  };

  // Save users to storage
  const saveUsers = (users: Array<{ id: string; username: string; email: string; password: string; avatar: string; createdAt: Date; level: number; experience: number; magicStones: number; streak: number; lastLoginDate: string }>) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  // Generate unique ID
  const generateId = () => {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  // Register new user
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    const users = getUsers();

    // Check if username or email already exists
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      alert('用户名已存在！');
      return false;
    }

    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      alert('邮箱已被注册！');
      return false;
    }

    // Create new user with default game progress
    const newUser = {
      id: generateId(),
      username,
      email,
      password, // In a real app, this should be hashed!
      avatar: avatarOptions[Math.floor(Math.random() * avatarOptions.length)],
      createdAt: new Date(),
      level: 1,
      experience: 0,
      magicStones: 0,
      streak: 0,
      lastLoginDate: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    saveUsers(users);

    // Auto login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    return true;
  };

  // Login user
  const login = async (username: string, password: string): Promise<boolean> => {
    const users = getUsers();
    const foundUser = users.find(
      u => (u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === username.toLowerCase())
        && u.password === password
    );

    if (!foundUser) {
      alert('用户名或密码错误！');
      return false;
    }

    // Check streak - if last login was yesterday, increment streak
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    let newStreak = foundUser.streak;
    if (foundUser.lastLoginDate === yesterday) {
      newStreak += 1;
    } else if (foundUser.lastLoginDate !== today) {
      newStreak = 1; // Reset streak if more than 1 day gap
    }

    // Update last login date and streak
    foundUser.lastLoginDate = today;
    foundUser.streak = newStreak;

    // Save updated users
    const updatedUsers = users.map(u => u.id === foundUser.id ? foundUser : u);
    saveUsers(updatedUsers);

    // Set current user (without password)
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(foundUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));

    return true;
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  // Update user progress
  const updateUserProgress = (progress: Partial<AuthUser>) => {
    if (!user) return;

    const updatedUser = { ...user, ...progress };
    setUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    // Also update in users storage
    const users = getUsers();
    const updatedUsers = users.map(u => u.id === user.id ? { ...u, ...progress } : u);
    saveUsers(updatedUsers);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateUserProgress
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
