import { useLanguage } from '../contexts/LanguageContext';

export default function WhatsAppButton() {
    const { t } = useLanguage();

    return (
        <a
            href="https://wa.me/966570098994"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 end-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center group"
            title="Chat on WhatsApp"
        >
            <i className="fa-brands fa-whatsapp text-3xl"></i>
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-xs font-tech font-bold uppercase tracking-widest ps-0 group-hover:ps-2">
                {t('chatWhatsapp')}
            </span>
        </a>
    );
}
