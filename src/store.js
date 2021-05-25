import create from 'zustand';
import { devtools } from 'zustand/middleware';

const store = (set, get) => ({
    noteMinChars: 5,
    noteMaxChars: 200,
    filter: "",
    setFilter: (text) => set(state => state.filter = text),
    notes: [],
    setNotes: (notes) => set((state) => ({
        ...state,
        notes
    })),
    count: () => get().notes.length
});

const useStore = create(devtools(store));

export default useStore;