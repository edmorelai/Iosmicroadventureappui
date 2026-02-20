import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Adventure, ADVENTURES, DAILY_BOSS } from '../data/adventures';
import { supabase } from '../../lib/supabase';
import { User } from '@supabase/supabase-js';
import { projectId } from '/utils/supabase/info';

interface UserState {
  xp: number;
  level: number;
  coins: number;
  streak: number;
  lastCompletedDate: string | null;
  history: string[]; // IDs of completed adventures
  mood: string;
  preferences: {
    categories: string[];
    socialLevel: number;
    timeBudget: number;
    randomness: number;
  };
  onboardingComplete: boolean;
  currentAdventure: Adventure | null;
  adventureStatus: 'idle' | 'active' | 'completed';
  rerolls: number;
}

const LEVEL_XP_THRESHOLD = 1000;

const DEFAULT_STATE: UserState = {
  xp: 1250,
  level: 2,
  coins: 45,
  streak: 3,
  lastCompletedDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  history: [],
  mood: 'Neutral',
  preferences: {
    categories: ['Food', 'Nature'],
    socialLevel: 2, // 1-5
    timeBudget: 30,
    randomness: 50,
  },
  onboardingComplete: false,
  currentAdventure: null,
  adventureStatus: 'idle',
  rerolls: 3,
};

interface GameContextType {
  state: UserState;
  user: User | null;
  isLoading: boolean;
  completeAdventure: (adventure: Adventure) => void;
  startAdventure: (adventure: Adventure) => void;
  cancelAdventure: () => void;
  updatePreferences: (prefs: Partial<UserState['preferences']>) => void;
  setMood: (mood: string) => void;
  setOnboardingComplete: (complete: boolean) => void;
  rerollAdventure: () => Adventure | null;
  generateAdventure: () => Adventure;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UserState>(DEFAULT_STATE);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isFetchingRef = useRef(false);

  // Load session and state
  useEffect(() => {
    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        
        if (session?.user) {
          isFetchingRef.current = true;
          await fetchGameState(session.access_token);
          isFetchingRef.current = false;
        }
      } catch (error) {
        console.error("Error initializing game:", error);
      } finally {
        setIsLoading(false);
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        setIsLoading(true);
        isFetchingRef.current = true;
        await fetchGameState(session?.access_token);
        isFetchingRef.current = false;
        setIsLoading(false);
      } else {
        // Optional: Reset state on logout or keep local?
        // Usually better to keep local or reset. Let's reset to default to avoid confusion.
        setState(DEFAULT_STATE);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchGameState = async (token?: string) => {
    if (!token) return;
    try {
      const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3db49237/game-state`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.state) {
          setState(data.state);
        }
      }
    } catch (e) {
      console.error("Failed to fetch game state:", e);
    }
  };

  // Sync state to server
  useEffect(() => {
    if (!user || isLoading || isFetchingRef.current) return;
    
    const timeout = setTimeout(async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) return;

        await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3db49237/game-state`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ state })
        });
      } catch (e) {
        console.error("Failed to save game state:", e);
      }
    }, 2000); // 2s debounce
    
    return () => clearTimeout(timeout);
  }, [state, user, isLoading]);

  const completeAdventure = (adventure: Adventure) => {
    setState(prev => {
      const newXp = prev.xp + adventure.xp;
      const newLevel = Math.floor(newXp / LEVEL_XP_THRESHOLD) + 1;
      
      // Simple streak logic
      const today = new Date().toISOString().split('T')[0];
      const last = prev.lastCompletedDate ? prev.lastCompletedDate.split('T')[0] : '';
      let newStreak = prev.streak;
      
      if (last !== today) {
         // If last completion was yesterday, increment. If older, reset (simplified)
         newStreak += 1;
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        coins: prev.coins + adventure.coins,
        streak: newStreak,
        lastCompletedDate: new Date().toISOString(),
        history: [...prev.history, adventure.id],
        currentAdventure: null,
        adventureStatus: 'idle',
      };
    });
  };

  const startAdventure = (adventure: Adventure) => {
    setState(prev => ({
      ...prev,
      currentAdventure: adventure,
      adventureStatus: 'active',
    }));
  };

  const cancelAdventure = () => {
    setState(prev => ({
      ...prev,
      currentAdventure: null,
      adventureStatus: 'idle',
    }));
  };

  const updatePreferences = (prefs: Partial<UserState['preferences']>) => {
    setState(prev => ({
      ...prev,
      preferences: { ...prev.preferences, ...prefs },
    }));
  };

  const setMood = (mood: string) => {
    setState(prev => ({ ...prev, mood }));
  };

  const setOnboardingComplete = (complete: boolean) => {
    setState(prev => ({ ...prev, onboardingComplete: complete }));
  };

  const rerollAdventure = (): Adventure | null => {
    if (state.rerolls > 0) {
      setState(prev => ({ ...prev, rerolls: prev.rerolls - 1 }));
      return generateAdventure();
    }
    return null;
  };

  const generateAdventure = (): Adventure => {
    // Simple randomizer for demo
    // In real app, use AI matching based on prefs/mood
    const available = ADVENTURES.filter(a => !state.history.includes(a.id));
    if (available.length === 0) return ADVENTURES[Math.floor(Math.random() * ADVENTURES.length)];
    return available[Math.floor(Math.random() * available.length)];
  };

  return (
    <GameContext.Provider
      value={{
        state,
        user,
        isLoading,
        completeAdventure,
        startAdventure,
        cancelAdventure,
        updatePreferences,
        setMood,
        setOnboardingComplete,
        rerollAdventure,
        generateAdventure,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
}
