// store/useAppStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AppState = {
  isUserLoggedIn: boolean;
  userName: string | null;
  toggleIsUserLoggedIn: () => void;
  setUserName: (name: string | null) => void;
  logout: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isUserLoggedIn: false,
      userName: null,
      toggleIsUserLoggedIn: () => set((state) => ({ isUserLoggedIn: !state.isUserLoggedIn })),
      setUserName: (name) => set({ userName: name, isUserLoggedIn: !!name }),
      logout: () => set({ isUserLoggedIn: false, userName: null }),
    }),
    {
      name: 'trvl-bucketlist-app-store', // localStorage key
    }
  )
);
