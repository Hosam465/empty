import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function MobileMenu({ open, onClose, onOpenLogin, onOpenRegister }) {
    const { t, lang, toggleLanguage } = useLanguage();
    const { user, isAdmin, displayName, logout } = useAuth();

    if (!open) return null;

    return (
        <div className="md:hidden flex flex-col bg-darkbg/98 backdrop-blur-md border-t border-white/10 px-6 py-6 gap-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="flex flex-col gap-5 text-sm font-bold font-tech uppercase tracking-widest text-zinc-300">
                <a href="#hero" onClick={onClose} className="hover:text-arcadeyellow transition-all">{t('navServices')}</a>
                <a href="#how-it-works" onClick={onClose} className="hover:text-arcadeyellow transition-all">{t('navHow')}</a>
                <a href="#shop" onClick={onClose} className="hover:text-arcadeyellow transition-all">{t('navEvents')}</a>
            </div>

            <button onClick={toggleLanguage} className="w-full bg-white/10 hover:bg-arcadeyellow hover:text-black border border-white/20 text-arcadeyellow font-tech px-3 py-2.5 rounded transition-all duration-300 flex items-center justify-center gap-2">
                <i className="fa-solid fa-globe"></i>
                <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            <div className="border-t border-white/10 pt-6 flex flex-col gap-5 text-sm font-bold font-tech uppercase tracking-widest">
                {user ? (
                    <div className="flex flex-col gap-5">
                        <span className="text-arcadeyellow font-black font-tech">
                            <i className="fa-solid fa-user-astronaut me-2 text-zinc-400"></i> {displayName.split(' ')[0]}
                        </span>
                        <button onClick={logout} className="text-start hover:text-arcadered transition-colors">
                            <i className="fa-solid fa-power-off me-2"></i> {t('btnLogout')}
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        <button onClick={onOpenLogin} className="text-start hover:text-arcadeyellow transition-colors">
                            <i className="fa-solid fa-right-to-bracket me-2"></i> {t('btnLogin')}
                        </button>
                        <button onClick={onOpenRegister} className="text-start hover:text-arcadeyellow transition-colors">
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
        </div>
    );
}
