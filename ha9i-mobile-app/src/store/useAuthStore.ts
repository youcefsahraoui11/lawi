import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Platform } from 'react-native';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  nationalId?: string;
  passportNumber?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, token: string, user: User) => void;
  logout: () => void;
  register: (user: User, token: string) => void;
}

// Robust storage provider for both Web (localStorage) and Native (AsyncStorage)
const getStorageProvider = () => {
  if (Platform.OS === 'web') {
    return typeof window !== 'undefined' ? window.localStorage : {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    } as any;
  }
  return AsyncStorage;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (_email, token, user) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      register: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },
    }),
    {
      name: 'ha9i-auth-storage',
      storage: createJSONStorage(getStorageProvider),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
