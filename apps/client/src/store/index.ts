import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IState } from './types';
import createTestSlice from './slices/createTestSlice';
import createResponseSlice from './slices/createResponseSlice';
import createUserSlice from './slices/createUserSlice';

const useClientStore = create<IState>()(
  devtools(
    (...a) => ({
      ...createTestSlice(...a),
      ...createResponseSlice(...a),
      ...createUserSlice(...a),
    }),
    { name: 'store-client' },
  ),
);

const { getState, setState } = useClientStore;

export { getState, setState };

export default useClientStore;
