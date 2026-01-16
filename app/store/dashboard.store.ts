import { create } from 'zustand';

type DashboardState = {
  data: any;
  loading: boolean;
  setData: (data: any) => void;
  setLoading: (loading: boolean) => void;
};

export const useDashboardStore = create<DashboardState>(set => ({
  data: null,
  loading: false,
  setData: data => set({ data }),
  setLoading: loading => set({ loading }),
}));
