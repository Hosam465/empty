import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC_8RUItmr8GHEnjwt0pHtstAjQsx6PFHA",
    authDomain: "smwebsite-0.firebaseapp.com",
    projectId: "smwebsite-0",
    storageBucket: "smwebsite-0.firebasestorage.app",
    messagingSenderId: "750807172857",
    appId: "1:750807172857:web:e36a69bbb7360679fb4428",
    measurementId: "G-F46R6HJT0B"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
