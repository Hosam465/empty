import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const snapshot = await getDocs(collection(db, 'activities'));
                if (cancelled) return;
                const list = [];
                snapshot.forEach((docSnap) => list.push({ id: docSnap.id, ...docSnap.data() }));
                setProducts(list);
            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, []);

    return { products, loading, error };
}
