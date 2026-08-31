import { useLanguage } from '../contexts/LanguageContext';
import { backgroundImages } from '../data/backgroundImages';
import { useInView } from '../hooks/useInView';

export default function FooterCta() {
    const { t } = useLanguage();
    const [ref, inView] = useInView();

    return (
        <section
            ref={ref}
            className="relative py-28 px-6 z-10 bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: `url(${backgroundImages.footerCta})` }}
        >
            <div className="absolute inset-0 bg-darkbg/80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-darkbg via-transparent to-darkbg/40"></div>

            <div className={`max-w-2xl mx-auto relative z-10 text-center scroll-reveal ${inView ? 'in-view' : ''}`}>
                <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-5 leading-tight">{t('ctaTitle')}</h2>
                <p className="text-zinc-300 font-sans mb-10">{t('ctaSub')}</p>
                <a href="#shop" className="inline-flex px-9 py-4 bg-arcadeyellow text-black font-bold font-sans text-base clip-button shadow-md hover:opacity-90 transition-all">
                    {t('ctaBtn')}
                </a>
            </div>
        </section>
    );
}
