import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useGlobalConfig() {
    const [showPrices, setShowPrices] = useState(true);

    useEffect(() => {
        return onSnapshot(doc(db, 'settings', 'globalConfig'), (docSnap) => {
            setShowPrices(docSnap.exists() ? (docSnap.data().showPrices ?? true) : true);
        });
    }, []);

    return { showPrices };
}
