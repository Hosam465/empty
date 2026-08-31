import { useLanguage } from '../contexts/LanguageContext';
import { useInView } from '../hooks/useInView';

function StepCard({ number, title, desc, delay }) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            className={`cyber-card rounded-2xl p-8 scroll-reveal ${inView ? 'in-view' : ''}`}
            style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
        >
            <div className="w-11 h-11 rounded-lg bg-arcadeyellow text-black font-display font-bold text-xl flex items-center justify-center mb-6">{number}</div>
            <h3 className="text-xl font-bold font-display text-white mb-3">{title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">{desc}</p>
        </div>
    );
}

export default function HowItWorks() {
    const { t } = useLanguage();

    return (
        <section id="how-it-works" className="relative py-28 px-6 z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white leading-[1.1] tracking-tight mb-5">{t('howTitle')}</h2>
                    <p className="text-zinc-400 font-sans text-lg">{t('howSub')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StepCard number={1} title={t('howStep1Title')} desc={t('howStep1Desc')} delay={0} />
                    <StepCard number={2} title={t('howStep2Title')} desc={t('howStep2Desc')} delay={100} />
                    <StepCard number={3} title={t('howStep3Title')} desc={t('howStep3Desc')} delay={200} />
                </div>
            </div>
        </section>
    );
}
