import { useEffect, useState } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const EMPTY_FORM = {
    name: '',
    category: 'Physical',
    imageUrl: '',
    desc: '',
    descAr: '',
    price: '',
    icon: 'fa-gamepad'
};

export default function ActivityForm({ editingItem, onSaved, onCancelEdit }) {
    const [form, setForm] = useState(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (editingItem) {
            setForm({
                name: editingItem.name || '',
                category: editingItem.category || 'Physical',
                imageUrl: editingItem.imageUrl || '',
                desc: editingItem.desc || '',
                descAr: editingItem.descAr || '',
                price: editingItem.price ?? '',
                icon: editingItem.icon || 'fa-gamepad'
            });
        } else {
            setForm(EMPTY_FORM);
        }
    }, [editingItem]);

    const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const payload = {
            name: form.name,
            category: form.category,
            desc: form.desc,
            descAr: form.descAr || form.desc,
            price: parseFloat(form.price),
            icon: form.icon,
            imageUrl: form.imageUrl || null
        };
        try {
            if (editingItem) {
                await updateDoc(doc(db, 'activities', editingItem.id), payload);
            } else {
                await addDoc(collection(db, 'activities'), { ...payload, createdAt: Date.now() });
            }
            setForm(EMPTY_FORM);
            await onSaved();
        } catch {
            // matches prior behavior — fail silently
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <h3 className="text-xl font-bold font-display mb-8 text-white flex items-center">
                <i className={`fa-solid ${editingItem ? 'fa-pen' : 'fa-plus'} me-3 text-arcadeyellow`}></i>
                {editingItem ? 'Edit Activity' : 'Add New Activity'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-[10px] font-bold font-tech text-zinc-400 uppercase tracking-widest mb-2">Activity Name *</label>
                    <input type="text" value={form.name} onChange={update('name')} required className="input-field font-tech" />
                </div>
                <div>
                    <label className="block text-[10px] font-bold font-tech text-zinc-400 uppercase tracking-widest mb-2">Category *</label>
                    <select value={form.category} onChange={update('category')} required className="input-field py-[0.85rem] cursor-pointer appearance-none bg-black font-tech text-arcadeyellow">
                        <option value="Physical">Physical (أنشطة بدنية)</option>
                        <option value="Digital">Digital (أنشطة رقمية)</option>
                        <option value="Team Building">Team Building (بناء الفريق)</option>
                        <option value="Challenging">Challenging (تحديات)</option>
                        <option value="Solutions">Solutions (حلول متكاملة)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] font-bold font-tech text-zinc-400 uppercase tracking-widest mb-2">Image URL</label>
                    <input type="url" value={form.imageUrl} onChange={update('imageUrl')} placeholder="https://..." className="input-field font-tech" />
                </div>
                <div>
                    <label className="block text-[10px] font-bold font-tech text-zinc-400 uppercase tracking-widest mb-2">English Description *</label>
                    <textarea value={form.desc} onChange={update('desc')} required rows={3} className="input-field resize-none font-tech" />
                </div>
                <div>
                    <label className="block text-[10px] font-bold font-tech text-arcadeyellow uppercase tracking-widest mb-2">Arabic Description (الوصف بالعربية)</label>
                    <textarea value={form.descAr} onChange={update('descAr')} dir="rtl" rows={3} placeholder="اكتب الوصف باللغة العربية..." className="input-field resize-none font-tech" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold font-tech text-zinc-400 uppercase tracking-widest mb-2">Price (SAR) *</label>
                        <input type="number" value={form.price} onChange={update('price')} required className="input-field font-tech" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold font-tech text-zinc-400 uppercase tracking-widest mb-2">Icon</label>
                        <select value={form.icon} onChange={update('icon')} className="input-field py-[0.85rem] cursor-pointer appearance-none bg-black font-tech">
                            <option value="fa-gamepad">Gamepad</option>
                            <option value="fa-bullseye">Bullseye</option>
                            <option value="fa-microchip">Microchip</option>
                            <option value="fa-rocket">Rocket</option>
                            <option value="fa-vr-cardboard">VR/AR</option>
                            <option value="fa-puzzle-piece">Puzzle</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-3 pt-4">
                    <button type="submit" disabled={submitting} className="flex-1 py-4 rounded-xl bg-arcadeyellow text-black font-bold font-tech text-xs uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-60">
                        Save Activity
                    </button>
                    {editingItem && (
                        <button type="button" onClick={onCancelEdit} className="px-6 rounded-xl bg-white/10 text-white font-black font-tech text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </>
    );
}
