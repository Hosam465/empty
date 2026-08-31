import { createContext, useContext, useEffect, useState } from 'react';
import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                    setProfile(userDoc.exists() ? userDoc.data() : null);
                } catch {
                    setProfile(null);
                }
            } else {
                setProfile(null);
            }
            setLoading(false);
        });
    }, []);

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const register = async (name, email, password) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', cred.user.uid), { name, email, cart: [] });
    };

    const googleAuth = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        const userDocRef = doc(db, 'users', result.user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
            await setDoc(userDocRef, { name: result.user.displayName || '', email: result.user.email || '', cart: [] });
        }
    };

    const logout = () => signOut(auth);

    const displayName = profile?.name || user?.displayName || 'Agent';
    const isAdmin = profile?.isAdmin === true;

    return (
        <AuthContext.Provider value={{ user, profile, loading, displayName, isAdmin, login, register, googleAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
