import create from 'zustand';
import firebase from 'firebase';
import { db } from './firebase';
import { devtools } from 'zustand/middleware';

const store = (set, get) => ({
    currentUser: null,
    setCurrentUser: (value) => set(state => state.currentUser = value),
    login: (payload) => set(state => state.user = payload),
    logout: () => set(state => state.user = null),
    charLimit: 200,
    input: "",
    setInput: (input) => set({input}),
    filter: "",
    setFilter: (filter) => set({filter}),
    notes: [],
    setNotes: (notes) => set((state) => ({
        ...state,
        notes
    })),
    addNote: (note) => 
        set((state) => ({
        notes: [...state.notes, note ] 
    })),
    createNote: (e) => set((state) => {
        e.preventDefault();

        db.collection('notes').add({
            owner: get().currentUser.uid,
            content: state.input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        state.setInput('');
    }),
    removeNote: (id) => set(() => {
        db
            .collection('notes')
            .doc(id)
            .delete();
    }),
    count: () => get().notes.length,
});

const useStore = create(devtools(store));

export default useStore;