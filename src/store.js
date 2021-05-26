import create from 'zustand';
import { devtools } from 'zustand/middleware';

const store = (set, get) => ({
    appName: "#Notes",
    currentUser: null,
    setCurrentUser: (value) => set(state => state.currentUser = value),
    noteMinChars: 5,
    noteMaxChars: 200,
    filter: "",
    setFilter: (filter) => set({filter}),
    notes: [],
    setNotes: (notes) => set((state) => ({
        ...state,
        notes
    })),
    count: () => get().notes.length,
    deadline: '',
    setDeadline: (deadline) => set({deadline})
});

const useStore = create(devtools(store));

export default useStore;