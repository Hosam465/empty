import { useLanguage } from '../contexts/LanguageContext';
import { backgroundImages } from '../data/backgroundImages';

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section
            id="hero"
            className="relative pt-40 pb-32 px-6 min-h-screen flex flex-col justify-center overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImages.hero})` }}
        >
            <div className="absolute inset-0 bg-darkbg/75"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-darkbg via-darkbg/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-darkbg/40 via-transparent to-transparent"></div>

            <div className="max-w-3xl mx-auto w-full relative z-10 text-center">
                <div className="inline-flex items-center gap-3 cyber-card rounded-full px-5 py-2.5 mb-10 cursor-default">
                    <div className="w-2 h-2 rounded-full bg-arcadeyellow"></div>
                    <span className="text-arcadeyellow text-[11px] font-semibold font-tech tracking-widest uppercase">{t('heroTag')}</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold font-display text-white leading-[1.05] tracking-tight mb-8">
                    {t('heroTitle1')} <br />
                    <span className="text-arcadeyellow">{t('heroTitle2')}</span> <br />
                    {t('heroTitle3')}
                </h1>

                <p className="text-zinc-300 text-lg font-sans max-w-xl mx-auto mb-12 leading-relaxed">
                    {t('heroDesc')}
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <a href="#shop" className="px-9 py-4 bg-arcadeyellow text-black font-bold font-sans text-base clip-button shadow-md hover:opacity-90 transition-all">
                        {t('btnInitiate')}
                    </a>
                    <button
                        onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-9 py-4 border border-white/20 hover:border-white/40 text-white font-semibold font-sans text-base clip-button hover:bg-white/5 transition-all"
                    >
                        {t('btnHowItWorks')}
                    </button>
                </div>

                <div className="inline-flex items-center mt-12 bg-darkbg/80 backdrop-blur-sm border border-arcadeyellow/30 text-arcadeyellow text-[11px] font-semibold font-tech px-5 py-2.5 rounded-xl">
                    <i className="fa-solid fa-people-group me-3"></i> Built For Real Teams
                </div>
            </div>
        </section>
    );
}
