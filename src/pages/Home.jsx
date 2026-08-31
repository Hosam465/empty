import { useState } from 'react';
import { useGlobalConfig } from '../hooks/useGlobalConfig';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import ProductGrid from '../components/ProductGrid';
import FooterCta from '../components/FooterCta';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import CheckoutModal from '../components/CheckoutModal';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Home() {
    const { showPrices } = useGlobalConfig();
    const [cartOpen, setCartOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const openLogin = () => { setRegisterOpen(false); setLoginOpen(true); };
    const openRegister = () => { setLoginOpen(false); setRegisterOpen(true); };
    const closeAuthModals = () => { setLoginOpen(false); setRegisterOpen(false); };

    return (
        <>
            <WhatsAppButton />
            <Navbar onOpenCart={() => setCartOpen(true)} onOpenLogin={openLogin} onOpenRegister={openRegister} />
            <Hero />
            <HowItWorks />
            <ProductGrid
                showPrices={showPrices}
                onRequireLogin={openLogin}
                onAdded={() => setCartOpen(true)}
            />
            <FooterCta />
            <Footer />

            <CartSidebar
                open={cartOpen}
                onClose={() => setCartOpen(false)}
                onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
                showPrices={showPrices}
            />
            <LoginModal open={loginOpen} onClose={closeAuthModals} onSwitchToRegister={openRegister} />
            <RegisterModal open={registerOpen} onClose={closeAuthModals} onSwitchToLogin={openLogin} />
            <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} showPrices={showPrices} />
        </>
    );
}
