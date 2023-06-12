import { create } from 'zustand'

export const usePageLoadingStore = create<Store>((set) => ({
  pageLoading: false,
  setPageLoading: (loading: boolean)=> set((state: Store) => ({ pageLoading: typeof loading === 'boolean' ? loading : state.pageLoading  })),
}))


interface Store {
  pageLoading: boolean;
  setPageLoading: (loading: boolean) => void;
}