import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { generateOrderPDF, sendWhatsAppInquiry } from '../lib/pdf';

export default function CheckoutModal({ open, onClose, showPrices }) {
    const { t } = useLanguage();
    const { cart, total, clearCart } = useCart();
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [headcount, setHeadcount] = useState('');
    const [submitting, setSubmitting] = useState(false);

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const orderItems = [...cart];
        try {
            if (showPrices) {
                await generateOrderPDF(company, email, orderItems, eventDate, headcount);
            } else {
                sendWhatsAppInquiry(company, email, orderItems, eventDate, headcount);
            }
            clearCart();
            setCompany('');
            setEmail('');
            setEventDate('');
            setHeadcount('');
            onClose();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-70 flex items-center justify-center p-6 overflow-y-auto">
            <div className="w-full max-w-5xl rounded-[2rem] relative shadow-2xl my-8 border border-white/10 overflow-hidden flex flex-col md:flex-row bg-panelbg">
                <button onClick={onClose} className="absolute top-6 end-6 text-zinc-400 hover:text-white z-20 bg-black/50 w-10 h-10 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>

                <div className="w-full md:w-1/2 bg-white/5 p-12 border-e border-white/5 flex flex-col justify-between">
                    <div>
                        <h3 className="text-4xl font-bold font-display mb-3 text-white">{t('genTitle1')} <span className="text-arcadeyellow">{t('genTitle2')}</span></h3>
                        <p className="text-zinc-400 font-tech text-sm tracking-wide mb-10">{t('genSub')}</p>

                        <h4 className="font-bold font-tech text-zinc-400 mb-5 uppercase tracking-widest text-[11px] border-b border-white/10 pb-3">{t('manifestSummary')}</h4>
                        <div className="space-y-4 mb-8 text-sm max-h-[40vh] overflow-y-auto pe-3 font-tech">
                            {cart.map((item, idx) => (
                                <div key={`${item.name}-${idx}`} className="flex justify-between items-center text-zinc-300 text-xs font-tech bg-black/40 p-3 rounded border border-white/5">
                                    <span className="uppercase font-bold">{item.name}</span>
                                    {showPrices && <span className="text-arcadeyellow">SAR {item.price.toLocaleString()}</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                    {showPrices && (
                        <div className="pt-8 border-t border-white/10">
                            <div className="flex justify-between items-end text-lg font-bold font-tech">
                                <span className="text-zinc-400 text-xs tracking-widest uppercase mb-1">{t('totalCost')}</span>
                                <span className="text-4xl text-arcadeyellow">SAR {total.toLocaleString()}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-full md:w-1/2 p-12 bg-panelbg relative flex flex-col justify-center">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[11px] font-bold font-tech text-zinc-400 uppercase tracking-widest mb-2">{t('lblCompany')}</label>
                            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required className="input-field font-tech" placeholder="e.g. Acme Corp" />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold font-tech text-zinc-400 uppercase tracking-widest mb-2">{t('lblEmail')}</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field font-tech" placeholder="email@company.com" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-bold font-tech text-zinc-400 uppercase tracking-widest mb-2">{t('lblDate')}</label>
                                <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="input-field font-tech" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold font-tech text-zinc-400 uppercase tracking-widest mb-2">{t('lblHeadcount')}</label>
                                <input type="number" min="1" value={headcount} onChange={(e) => setHeadcount(e.target.value)} className="input-field font-tech" placeholder="e.g. 50" />
                            </div>
                        </div>

                        {showPrices ? (
                            <button type="submit" disabled={submitting} className="w-full mt-6 py-5 clip-button bg-arcadeyellow text-black font-bold font-tech text-base uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-60">
                                <i className="fa-solid fa-file-pdf me-3 text-lg"></i> {t('btnPdf')}
                            </button>
                        ) : (
                            <button type="submit" disabled={submitting} className="w-full mt-6 py-5 clip-button bg-[#25D366] text-black font-bold font-tech text-base uppercase tracking-widest hover:bg-[#128C7E] hover:text-white transition-all flex items-center justify-center disabled:opacity-60">
                                <i className="fa-brands fa-whatsapp me-3 text-2xl"></i> {t('btnWhatsapp')}
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
