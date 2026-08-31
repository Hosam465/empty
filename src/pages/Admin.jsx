import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import PriceToggle from '../components/admin/PriceToggle';
import ActivityForm from '../components/admin/ActivityForm';
import ActivityList from '../components/admin/ActivityList';

export default function Admin() {
    const { user, isAdmin, loading, logout } = useAuth();
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [activitiesLoading, setActivitiesLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
        return () => document.head.removeChild(meta);
    }, []);

    useEffect(() => {
        if (!loading && (!user || !isAdmin)) {
            navigate('/', { replace: true });
        }
    }, [loading, user, isAdmin, navigate]);

    const fetchActivities = useCallback(async () => {
        setActivitiesLoading(true);
        try {
            const q = query(collection(db, 'activities'), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            const list = [];
            snapshot.forEach((docSnap) => list.push({ id: docSnap.id, ...docSnap.data() }));
            setActivities(list);
        } catch {
            // matches prior behavior — fail silently, list stays empty
        } finally {
            setActivitiesLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!loading && user && isAdmin) {
            fetchActivities();
        }
    }, [loading, user, isAdmin, fetchActivities]);

    const handleDelete = async (id) => {
        if (!confirm('Delete this activity?')) return;
        try {
            await deleteDoc(doc(db, 'activities', id));
            await fetchActivities();
        } catch {
            // matches prior behavior — fail silently
        }
    };

    const handleSaved = async () => {
        setEditingItem(null);
        await fetchActivities();
    };

    if (loading || !user || !isAdmin) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-darkbg">
                <div className="w-16 h-16 rounded-2xl bg-black/50 border border-white/5 flex items-center justify-center text-arcadeyellow mb-6 animate-pulse">
                    <i className="fa-solid fa-shield-halved text-3xl"></i>
                </div>
                <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-2">Checking Access</h2>
                <p className="text-zinc-500 text-xs tracking-widest uppercase font-mono">One moment...</p>
            </div>
        );
    }

    return (
        <div className="bg-darkbg text-white font-sans antialiased overflow-x-hidden p-6 min-h-screen">
            <header className="max-w-7xl mx-auto cyber-card p-6 rounded-2xl mb-8 flex flex-wrap justify-between items-center gap-4">
                <div>
                    <span className="text-2xl font-black font-tech uppercase tracking-widest text-white">SM <span className="text-arcadeyellow">Events</span></span>
                    <span className="ms-4 text-arcadegreen font-bold tracking-widest uppercase text-xs hidden sm:inline-block">Admin Panel</span>
                </div>

                <PriceToggle />

                <div className="flex items-center gap-6">
                    <button onClick={logout} className="text-arcadered hover:text-red-400 transition-colors text-xs font-bold font-tech uppercase tracking-widest">
                        <i className="fa-solid fa-power-off me-2"></i> Log Out
                    </button>
                    <a href="/" className="text-zinc-400 hover:text-white transition-colors text-xs font-bold font-tech uppercase tracking-widest border-s border-white/10 ps-6">
                        <i className="fa-solid fa-arrow-left me-2"></i> Return to Site
                    </a>
                </div>
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 cyber-card p-8 rounded-[2rem] h-fit sticky top-6">
                    <ActivityForm editingItem={editingItem} onSaved={handleSaved} onCancelEdit={() => setEditingItem(null)} />
                </div>

                <div className="lg:col-span-2 cyber-card p-8 rounded-[2rem] min-h-[500px]">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                        <h3 className="text-2xl font-bold font-display text-white tracking-tight">Your Activities</h3>
                        <span className="bg-arcadegreen/20 text-arcadegreen px-4 py-1 rounded-full text-xs font-tech font-bold tracking-widest">{activities.length} Activities</span>
                    </div>

                    {activitiesLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-arcadeyellow font-tech font-bold animate-pulse">
                            <i className="fa-solid fa-satellite-dish fa-spin mb-4 text-3xl"></i>
                            <span className="tracking-widest uppercase text-xs">Syncing Database...</span>
                        </div>
                    ) : (
                        <ActivityList
                            activities={activities}
                            onEdit={(item) => { setEditingItem(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
