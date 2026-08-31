import { createContext, useCallback, useContext, useRef, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [message, setMessage] = useState(null);
    const timerRef = useRef(null);

    const showToast = useCallback((msg) => {
        setMessage(msg);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setMessage(null), 2800);
    }, []);

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <div
                className={`fixed bottom-24 sm:bottom-6 left-1/2 -translate-x-1/2 z-80 bg-arcadeyellow text-black font-tech font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-lg transition-opacity duration-300 pointer-events-none text-center max-w-[90vw] ${message ? 'opacity-100' : 'opacity-0'}`}
            >
                {message}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}
