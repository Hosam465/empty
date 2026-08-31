import { useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';

const CATEGORIES = [
    { value: 'All', i18n: 'catAll' },
    { value: 'Physical', i18n: 'catPhysical' },
    { value: 'Digital', i18n: 'catDigital' },
    { value: 'Team Building', i18n: 'catTeamBuilding' },
    { value: 'Challenging', i18n: 'catChallenging' },
    { value: 'Solutions', i18n: 'catSolutions' }
];

function buildItemListSchema(products) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": products.map((p, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "item": {
                "@type": "Service",
                "name": p.name || "Untitled Activity",
                "description": p.desc || undefined,
                "category": p.category || "Physical",
                "provider": { "@type": "Organization", "name": "SM Events" }
            }
        }))
    };
}

export default function ProductGrid({ showPrices, onRequireLogin, onAdded }) {
    const { t, lang } = useLanguage();
    const { products, loading, error } = useProducts();
    const [category, setCategory] = useState('All');

    const filtered = useMemo(() => {
        if (category === 'All') return products;
        return products.filter((p) => (p.category || 'Physical').toLowerCase() === category.toLowerCase());
    }, [products, category]);

    return (
        <section id="shop" className="relative py-32 px-6 min-h-screen z-10">
            <div className="max-w-7xl mx-auto relative">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                        <h2 className="text-5xl md:text-6xl font-bold font-display text-white leading-[1.05] tracking-tight mb-6">
                            {t('shopTitle1')} <br /> <span className="text-arcadeyellow">{t('shopTitle2')}</span>
                        </h2>
                        <p className="text-zinc-400 font-sans text-lg max-w-xl">{t('shopSub')}</p>
                    </div>

                    <div className="flex flex-wrap gap-3 cyber-card p-2 rounded-xl">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setCategory(cat.value)}
                                className={`px-6 py-3 font-tech font-bold text-xs rounded-lg uppercase tracking-widest transition-all ${
                                    category === cat.value
                                        ? 'bg-arcadeyellow text-black shadow-sm'
                                        : 'bg-transparent text-zinc-400 hover:text-white'
                                }`}
                            >
                                {t(cat.i18n)}
                            </button>
                        ))}
                    </div>
                </div>

                {loading && (
                    <div className="flex flex-col items-center justify-center py-32 text-arcadeyellow font-tech font-bold animate-pulse">
                        <i className="fa-solid fa-satellite-dish fa-spin mb-4 text-4xl"></i>
                        <span className="tracking-widest uppercase text-sm">{t('syncingDb')}</span>
                    </div>
                )}

                {error && (
                    <div className="text-center py-16 text-arcadered font-tech text-sm tracking-widest uppercase">
                        ERR_CONNECTION_REFUSED: {error.message}
                    </div>
                )}

                {!loading && !error && products.length === 0 && (
                    <div className="text-center py-16 text-zinc-500 font-tech font-bold uppercase tracking-widest">
                        {lang === 'ar' ? 'لا توجد أنشطة متاحة حالياً' : 'No activities available right now'}
                    </div>
                )}

                {!loading && !error && products.length > 0 && filtered.length === 0 && (
                    <div className="text-center py-16 text-zinc-500 font-tech font-bold uppercase tracking-widest">
                        {lang === 'ar' ? 'لا توجد أنشطة متوفرة في هذا القسم حالياً' : 'No activities available in this category'}
                    </div>
                )}

                {!loading && !error && filtered.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filtered.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                showPrices={showPrices}
                                onRequireLogin={onRequireLogin}
                                onAdded={onAdded}
                            />
                        ))}
                    </div>
                )}

                {!loading && !error && products.length > 0 && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildItemListSchema(products)) }}
                    />
                )}
            </div>
        </section>
    );
}
