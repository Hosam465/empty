import { getDefaultActivityImage } from '../../data/defaultActivityImages';

export default function ActivityList({ activities, onEdit, onDelete }) {
    if (activities.length === 0) {
        return <p className="text-zinc-500 text-center py-10 font-tech uppercase tracking-widest text-xs font-bold">No activities added yet.</p>;
    }

    return (
        <div className="space-y-4">
            {activities.map((item) => {
                const thumb = item.imageUrl || getDefaultActivityImage(item.name) || '';
                return (
                    <div key={item.id} className="bg-black/40 border border-white/10 p-5 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-all">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl text-zinc-400 overflow-hidden">
                                {thumb ? (
                                    <img src={thumb} referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-xl" alt={item.name} />
                                ) : (
                                    <i className={`fa-solid ${item.icon}`}></i>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-black text-white font-tech uppercase tracking-wider text-sm">{item.name}</h4>
                                    <span className="text-[9px] font-tech font-bold px-2 py-0.5 rounded bg-arcadeyellow/20 text-arcadeyellow border border-arcadeyellow/30 uppercase">{item.category || 'Physical'}</span>
                                </div>
                                <p className="text-arcadeyellow font-tech text-xs tracking-widest mt-1">SAR {Number(item.price).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => onEdit(item)} className="w-10 h-10 rounded-xl bg-white/5 text-zinc-400 hover:text-arcadeyellow transition-all flex items-center justify-center">
                                <i className="fa-solid fa-pen text-xs"></i>
                            </button>
                            <button onClick={() => onDelete(item.id)} className="w-10 h-10 rounded-xl bg-white/5 text-zinc-400 hover:text-arcadered transition-all flex items-center justify-center">
                                <i className="fa-solid fa-trash text-xs"></i>
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
