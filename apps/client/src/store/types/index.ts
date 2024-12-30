import type { StateCreator } from 'zustand';
import type { getState, setState } from '../index';
import type { ITestState } from '../slices/createTestSlice';
import type { IUserState } from '../slices/createUserSlice';
import type { IResponseSlice } from '../slices/createResponseSlice';

export type IGetState = typeof getState;
export type ISetState = typeof setState;

export type IState = ITestState & IResponseSlice & IUserState;

export type StoreSlice<T> = StateCreator<
  IState,
  [['zustand/devtools', never]],
  [],
  T
>;

export type ValueOf<T> = T[keyof T];

export type Role = 'user' | 'assistant' | 'developer';
