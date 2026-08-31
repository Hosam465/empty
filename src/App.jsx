import { BrowserRouter, Routes, Route } from 'react-router';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

export default function App() {
    return (
        <LanguageProvider>
            <AuthProvider>
                <CartProvider>
                    <ToastProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/admin" element={<Admin />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </BrowserRouter>
                    </ToastProvider>
                </CartProvider>
            </AuthProvider>
        </LanguageProvider>
    );
}
