export const DEFAULT_ACTIVITY_IMAGES = {
    'Wooden Tower': 'https://images.unsplash.com/photo-1539477192933-1a7dde04aa77?auto=format&fit=crop&w=800&q=75',
    'Pipeline': 'https://images.unsplash.com/photo-1752681304960-bd4e018a04bb?auto=format&fit=crop&w=800&q=75',
    'Marshmallow Tower': 'https://images.unsplash.com/photo-1613549422147-9e4b76b4649b?auto=format&fit=crop&w=800&q=75',
    'Traffic Jam': 'https://images.unsplash.com/photo-1775323137421-7f1e74b98e29?auto=format&fit=crop&w=800&q=75',
    'Rug & Balls': 'https://images.unsplash.com/photo-1557734864-c78b6dfef1b1?auto=format&fit=crop&w=800&q=75',
    'Tug of War': 'https://images.unsplash.com/photo-1748698534492-746f3950d9ca?auto=format&fit=crop&w=800&q=75',
    'Hula Hoop Pass': 'https://images.unsplash.com/photo-1774599661329-d9a2f999d1c4?auto=format&fit=crop&w=800&q=75',
    'Balls and Stick': 'https://images.unsplash.com/photo-1539345574544-27e5407b42aa?auto=format&fit=crop&w=800&q=75',
    'Gold Mine': 'https://images.unsplash.com/photo-1761412105162-97f2f2d28407?auto=format&fit=crop&w=800&q=75',
    'Mystery Box': 'https://images.unsplash.com/photo-1630397794907-a6574f227a3d?auto=format&fit=crop&w=800&q=75',
    'XO Game (Tic-Tac-Toe Relay)': 'https://images.unsplash.com/photo-1768319184064-d39a6a196452?auto=format&fit=crop&w=800&q=75',
    'Infinite Loop': 'https://images.unsplash.com/photo-1591195852446-b206db137197?auto=format&fit=crop&w=800&q=75',
    'River Crossing': 'https://images.unsplash.com/photo-1597149560479-3c7d7b96d6bc?auto=format&fit=crop&w=800&q=75',
    'Ball Control': 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=75',
    'The Catch': 'https://images.unsplash.com/photo-1520352408661-83957c1379d2?auto=format&fit=crop&w=800&q=75',
    'MC Speaker (Arabic/English)': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=75',
    'Spin the Wheel': 'https://images.unsplash.com/photo-1573788583106-acf6c8f3f0b5?auto=format&fit=crop&w=800&q=75'
};

export function getDefaultActivityImage(name) {
    if (!name) return '';
    const key = Object.keys(DEFAULT_ACTIVITY_IMAGES).find(k => k.toLowerCase() === name.toLowerCase());
    return key ? DEFAULT_ACTIVITY_IMAGES[key] : '';
}
