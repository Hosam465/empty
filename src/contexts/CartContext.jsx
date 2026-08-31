import { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            if (!user) {
                setCart([]);
                return;
            }
            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                const data = userDoc.exists() ? userDoc.data() : null;
                if (!cancelled && data?.cart && Array.isArray(data.cart)) {
                    setCart(data.cart);
                }
            } catch {
                // ignore — cart stays empty
            }
        })();
        return () => { cancelled = true; };
    }, [user]);

    const syncCartToDB = async (nextCart) => {
        if (!user) return;
        try {
            await setDoc(doc(db, 'users', user.uid), { cart: nextCart }, { merge: true });
        } catch {
            // ignore — matches prior behavior (silent failure)
        }
    };

    const addToCart = (item) => {
        if (!user) return false;
        const next = [...cart, item];
        setCart(next);
        syncCartToDB(next);
        return true;
    };

    const removeItem = (index) => {
        const next = cart.filter((_, i) => i !== index);
        setCart(next);
        syncCartToDB(next);
    };

    const clearCart = () => {
        setCart([]);
        syncCartToDB([]);
    };

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeItem, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
