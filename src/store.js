import create from 'zustand';
import firebase from 'firebase';
import { db } from './firebase';
import { devtools } from 'zustand/middleware';

const store = (set, get) => ({
    currentUser: null,
    setCurrentUser: (value) => set(state => state.currentUser = value),
    login: (payload) => set(state => state.user = payload),
    logout: () => set(state => state.user = null),
    noteMinChars: 5,
    noteMaxChars: 155,
    filter: "",
    setFilter: (text) => set(state => state.filter = text),
    notes: [],
    setNotes: (notes) => set((state) => ({
        ...state,
        notes
    })),
    addNote: (note) => 
        set((state) => ({
        notes: [...state.notes, note ] 
    })),
    saveNote: (note) => set(state => {
        db.collection('notes').add({
            owner: get().currentUser.uid,
            content: note,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
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