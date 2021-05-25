import create from 'zustand';
import { devtools } from 'zustand/middleware';

const store = (set) => ({
    currentUser: null,
    setCurrentUser: (value) => set(state => state.currentUser = value),
    setLogout: () => set(state => state.currentUser = null)    
});

const useCredentialsStore = create(devtools(store));

export default useCredentialsStore;