import { useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import MobileMenu from './MobileMenu';

export default function Navbar({ onOpenCart, onOpenLogin, onOpenRegister }) {
    const { t, lang, toggleLanguage } = useLanguage();
    const { user, isAdmin, displayName, logout } = useAuth();
    const { cart } = useCart();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-40 bg-darkbg/90 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
                    <img src="/smlogo.png" alt="SM Events Logo" className="w-14 h-14 object-contain group-hover:scale-105 transition-transform duration-300" />
                    <span className="text-2xl font-black font-tech tracking-widest uppercase text-white">SM <span className="text-arcadeyellow">Events</span></span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-xs font-bold font-tech uppercase tracking-widest text-zinc-300">
                    <a href="#hero" className="hover:text-arcadeyellow transition-all">{t('navServices')}</a>
                    <a href="#how-it-works" className="hover:text-arcadeyellow transition-all">{t('navHow')}</a>
                    <a href="#shop" className="hover:text-arcadeyellow transition-all">{t('navEvents')}</a>

                    <button onClick={toggleLanguage} className="bg-white/10 hover:bg-arcadeyellow hover:text-black border border-white/20 text-arcadeyellow font-tech px-3 py-1.5 rounded transition-all duration-300 flex items-center gap-2">
                        <i className="fa-solid fa-globe"></i>
                        <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
                    </button>

                    {user ? (
                        <div className="flex items-center gap-8 ps-8 border-s border-white/10">
                            <span className="text-arcadeyellow font-black font-tech">
                                <i className="fa-solid fa-user-astronaut me-2 text-zinc-400"></i> {displayName.split(' ')[0]}
                            </span>
                            <button onClick={logout} className="hover:text-arcadered transition-colors">
                                <i className="fa-solid fa-power-off me-2"></i> {t('btnLogout')}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-8 ps-8 border-s border-white/10">
                            <button onClick={onOpenLogin} className="hover:text-arcadeyellow transition-colors">
                                <i className="fa-solid fa-right-to-bracket me-2"></i> {t('btnLogin')}
                            </button>
                            <button onClick={onOpenRegister} className="hover:text-arcadeyellow transition-colors">
                                <i className="fa-solid fa-user-plus me-2"></i> {t('btnRegister')}
                            </button>
                        </div>
                    )}

                    {isAdmin && (
                        <Link to="/admin" className="hover:text-arcadegreen transition-colors">
                            <i className="fa-solid fa-shield-halved me-2"></i> Admin
                        </Link>
                    )}
                </div>

                <div className="flex items-center gap-6">
                    <button onClick={onOpenCart} className="relative text-zinc-300 hover:text-arcadeyellow transition-colors group p-2">
                        <i className="fa-solid fa-layer-group text-2xl group-hover:scale-110 transition-transform"></i>
                        <span className="absolute -top-1 -end-1 bg-arcadegreen text-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-sm">{cart.length}</span>
                    </button>
                    <a href="#shop" className="hidden sm:inline-flex px-8 py-3 bg-arcadeyellow text-black font-bold font-sans text-xs uppercase tracking-wide clip-button hover:opacity-90 transition-all duration-300 shadow-md">
                        {t('buildBlueprint')}
                    </a>
                    <button onClick={() => setMobileOpen((v) => !v)} className="md:hidden text-zinc-300 hover:text-arcadeyellow transition-colors p-2 text-2xl" aria-label="Menu">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </div>
            </div>

            <MobileMenu
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                onOpenLogin={onOpenLogin}
                onOpenRegister={onOpenRegister}
            />
        </nav>
    );
}
