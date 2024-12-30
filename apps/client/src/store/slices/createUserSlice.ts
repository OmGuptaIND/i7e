import type { StoreSlice } from '../types';

export interface IUserState {
  user: {
    sessionId: string;
  };

  setSessionId: (sessionId: string) => void;
}

const createUserSlice: StoreSlice<IUserState> = (set) => ({
  user: {
    sessionId: '',
  },

  setSessionId: (sessionId: string) => set({ user: { sessionId } }),
});

export default createUserSlice;
