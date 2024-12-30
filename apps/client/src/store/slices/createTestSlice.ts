import type { StoreSlice } from '../types';

export interface ITestState {
  isTest: boolean;
  setIsTest: () => void;
}

const createTestSlice: StoreSlice<ITestState> = (set) => ({
  isTest: false,
  setIsTest: () => set({ isTest: true }),
});

export default createTestSlice;
