import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function PriceToggle() {
    const [showPrices, setShowPrices] = useState(true);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const configDoc = await getDoc(doc(db, 'settings', 'globalConfig'));
                if (configDoc.exists()) {
                    setShowPrices(configDoc.data().showPrices ?? true);
                }
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    const handleChange = async (e) => {
        const checked = e.target.checked;
        setShowPrices(checked);
        try {
            await setDoc(doc(db, 'settings', 'globalConfig'), { showPrices: checked }, { merge: true });
        } catch {
            // matches prior behavior — fail silently
        }
    };

    return (
        <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-xl border border-white/10">
            <span className="text-xs font-tech uppercase font-bold text-zinc-300">Show Prices On Website</span>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={showPrices} onChange={handleChange} disabled={!loaded} className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-arcadegreen"></div>
            </label>
        </div>
    );
}
