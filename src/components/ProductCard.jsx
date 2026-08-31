import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from './Toast';
import { getDefaultActivityImage } from '../data/defaultActivityImages';

export default function ProductCard({ product, showPrices, onRequireLogin, onAdded }) {
    const { lang } = useLanguage();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const showToast = useToast();

    const name = product.name || 'Untitled Activity';
    const price = product.price || 0;
    const icon = product.icon || 'fa-people-group';
    const categoryTag = product.category || 'Physical';
    const imageUrl = product.imageUrl || getDefaultActivityImage(name) || '';

    let description;
    if (lang === 'ar' && typeof product.descAr === 'string' && product.descAr) {
        description = product.descAr;
    } else if (typeof product.desc === 'string' && product.desc) {
        description = product.desc;
    } else {
        description = lang === 'ar' ? 'لا يوجد وصف متوفر.' : 'No description available.';
    }

    const handleAdd = () => {
        if (!user) {
            showToast(lang === 'ar' ? 'الرجاء تسجيل الدخول لإضافة الأنشطة إلى خطتك' : 'Please sign in to add activities to your plan');
            onRequireLogin();
            return;
        }
        addToCart({ name, price });
        onAdded();
    };

    return (
        <div className="cyber-card rounded-2xl p-6 flex flex-col group relative overflow-hidden h-full">
            {imageUrl ? (
                <div className="w-full h-44 overflow-hidden relative mb-4 rounded-lg border border-white/10">
                    <img
                        src={imageUrl}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        alt={`${name} team activity`}
                        loading="lazy"
                    />
                </div>
            ) : (
                <div className="w-full h-36 bg-black/50 border border-white/10 rounded-lg flex items-center justify-center text-4xl text-arcadeyellow mb-4 shadow-inner">
                    <i className={`fa-solid ${icon}`}></i>
                </div>
            )}

            <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-tech font-semibold px-2 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/10 uppercase tracking-wider">{categoryTag}</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2 leading-snug">{name}</h3>
            <p className="text-xs text-zinc-400 mb-6 flex-grow leading-relaxed font-sans">{description}</p>

            <div className="border-t border-white/10 pt-4 mt-auto relative z-20 pointer-events-auto">
                {showPrices && (
                    <div className="flex justify-between items-center mb-4 font-tech">
                        <span className="text-[11px] text-zinc-400 uppercase tracking-wider">{lang === 'ar' ? 'التكلفة التقديرية' : 'Estimated Price'}</span>
                        <span className="text-2xl font-bold text-white">SAR {Number(price).toLocaleString()}</span>
                    </div>
                )}
                <button
                    type="button"
                    onClick={handleAdd}
                    className="w-full py-3.5 bg-arcadeyellow text-black font-tech font-bold text-sm uppercase tracking-wide clip-button hover:opacity-90 active:scale-95 transition-all cursor-pointer touch-manipulation"
                >
                    {lang === 'ar' ? 'أضف إلى الخطة' : 'Add to Plan'}
                </button>
            </div>
        </div>
    );
}
