import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from './Toast';

export default function LoginModal({ open, onClose, onSwitchToRegister }) {
    const { login, googleAuth } = useAuth();
    const { lang } = useLanguage();
    const showToast = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await login(email, password);
            setEmail('');
            setPassword('');
            onClose();
        } catch {
            showToast(lang === 'ar' ? 'فشل تسجيل الدخول، تحقق من البيانات' : 'Login failed. Check your email and password.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogle = async () => {
        try {
            await googleAuth();
            onClose();
        } catch {
            showToast(lang === 'ar' ? 'فشل تسجيل الدخول عبر Google' : 'Google sign-in failed. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-60 flex items-center justify-center p-6">
            <div className="cyber-card w-full max-w-md p-10 rounded-[2rem] relative border border-white/20">
                <button onClick={onClose} className="absolute top-6 end-6 text-zinc-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>
                <div className="mb-10 text-center">
                    <i className="fa-solid fa-user text-4xl text-arcadeyellow mb-4"></i>
                    <h3 className="text-3xl font-bold font-display text-white">Welcome Back</h3>
                    <p className="text-xs text-zinc-400 font-tech tracking-wide mt-1">Sign in to manage your event plan</p>
                </div>
                <button type="button" onClick={handleGoogle} className="w-full py-4 clip-button bg-white text-black font-bold font-sans uppercase tracking-wide hover:bg-zinc-200 transition-all flex items-center justify-center text-xs mb-8">
                    <i className="fa-brands fa-google me-3 text-lg"></i> Continue with Google
                </button>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="input-field font-tech" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="input-field font-tech" />
                    <button type="submit" disabled={submitting} className="w-full mt-4 py-4 clip-button bg-arcadeyellow text-black font-bold font-sans text-sm uppercase tracking-wide hover:opacity-90 transition-all disabled:opacity-60">
                        Sign In
                    </button>
                </form>
                <p className="text-center text-xs text-zinc-500 font-tech mt-6">
                    Don't have an account?{' '}
                    <button onClick={onSwitchToRegister} className="text-arcadeyellow hover:underline">Create one</button>
                </p>
            </div>
        </div>
    );
}
