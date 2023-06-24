import {create} from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  Salt: string;
  setSalt: (salt: string) => void;
  UserSubject: string;
  setUserSubject: (subject: string) => void;
}

export const useStorePersist = create(
  persist<Store>(
    (set, get) => ({
      Salt: '',
      setSalt: (salt: string) => set({ Salt: salt }),
      UserSubject: '',
      setUserSubject: (subject: string) => set({ UserSubject: subject }),
    }),
    {
      name: 'todo-user-storage',
    }
  )
);
