// app/store/dashboard.store.ts
import { create } from 'zustand';
import type { DashboardData } from '../types/dashboard';

type DashboardState = {
  data: DashboardData | null;
  setData: (data: DashboardData) => void;
};

export const useDashboardStore = create<DashboardState>(set => ({
  data: null,
  setData: data => set({ data }),
}));
