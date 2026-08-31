import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

export default function CartSidebar({ open, onClose, onCheckout, showPrices }) {
    const { t, lang } = useLanguage();
    const { cart, removeItem, total } = useCart();

    return (
        <div className={`fixed inset-y-0 end-0 w-full sm:w-[450px] bg-panelbg border-s border-white/10 z-50 transform transition-transform duration-500 flex flex-col justify-between shadow-2xl ${open ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'}`}>
            <div className="p-10 h-full flex flex-col">
                <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-8">
                    <div>
                        <h3 className="text-3xl font-bold font-display text-white">{t('cartTitle1')} <span className="text-arcadeyellow">{t('cartTitle2')}</span></h3>
                        <p className="text-[11px] text-zinc-400 font-tech font-semibold uppercase tracking-widest mt-2">{t('cartSub')}</p>
                    </div>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10">
                        <i className="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto pe-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-6 pt-24">
                            <i className="fa-solid fa-cubes-stacked text-6xl opacity-20"></i>
                            <p
                                className="text-xs font-tech font-bold uppercase tracking-widest text-center leading-loose"
                                dangerouslySetInnerHTML={{
                                    __html: lang === 'ar' ? 'خطتك فارغة.<br>أضف بعض الأنشطة.' : 'Your plan is empty.<br>Add some activities.'
                                }}
                            />
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <div key={`${item.name}-${index}`} className="p-4 bg-black/40 border border-white/10 rounded-lg flex items-center justify-between">
                                <div>
                                    <span className="text-sm font-tech font-bold text-white uppercase mb-1 block">{item.name}</span>
                                    {showPrices && <span className="text-xs text-arcadeyellow font-tech">SAR {item.price.toLocaleString()}</span>}
                                </div>
                                <button onClick={() => removeItem(index)} className="text-zinc-500 hover:text-arcadered transition-colors">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="border-t border-white/10 pt-8 mt-8 bg-black/40 -mx-10 -mb-10 p-10">
                    {showPrices && (
                        <div className="flex justify-between items-end mb-8">
                            <span className="text-zinc-400 text-[11px] font-tech font-semibold uppercase tracking-widest mb-1">{t('totalCost')}</span>
                            <span className="text-4xl font-bold font-tech text-arcadeyellow">SAR {total.toLocaleString()}</span>
                        </div>
                    )}
                    <button
                        onClick={onCheckout}
                        disabled={cart.length === 0}
                        className="w-full py-5 clip-button bg-arcadeyellow text-black font-bold font-sans text-base uppercase tracking-wide hover:opacity-90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {t('initCheckout')}
                    </button>
                </div>
            </div>
        </div>
    );
}
