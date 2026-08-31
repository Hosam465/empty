const admin = require('firebase-admin');

// Initialize Firebase Admin (needs serviceAccountKey.json in this folder — same as seedActivities.js)
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Solutions: generic, de-branded versions of interactive booth/kiosk experiences.
// Prices are placeholders — edit these (or via the admin panel) before going live.
const solutions = [
  {
    name: "Digital Innovation Showcase",
    category: "Solutions",
    desc: "A touchscreen showcase that walks visitors through your product's key digital features through an interactive, self-guided demo — built to make complex innovations easy to grasp in seconds.",
    descAr: "عرض تفاعلي على شاشة لمس يقدم أبرز مزايا منتجكم الرقمي بأسلوب سهل وتفاعلي، مصمم لتبسيط الابتكارات المعقدة خلال ثوانٍ.",
    price: 8000,
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=75",
    icon: "fa-microchip",
    createdAt: Date.now()
  },
  {
    name: "Gamified Event Arcade",
    category: "Solutions",
    desc: "A multi-game digital arcade with a live leaderboard — quick, competitive mini-games that pull crowds in and keep the energy high between activities.",
    descAr: "أركيد رقمي متعدد الألعاب مع لوحة صدارة مباشرة، ألعاب قصيرة وتنافسية تجذب الحضور وتحافظ على الحماس بين الأنشطة.",
    price: 9000,
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=75",
    icon: "fa-gamepad",
    createdAt: Date.now() - 1000
  },
  {
    name: "Community Sign-Up Hub",
    category: "Solutions",
    desc: "A registration kiosk that turns event visitors into an ongoing community — an on-site sign-up flow with a QR handoff so people can pick up where they left off on their own phone.",
    descAr: "منصة تسجيل تُحوّل زوار الفعالية إلى مجتمع مستمر، عبر تسجيل مباشر في الموقع مع رمز QR لمتابعة التجربة من هاتفهم الخاص.",
    price: 6000,
    imageUrl: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=800&q=75",
    icon: "fa-rocket",
    createdAt: Date.now() - 2000
  },
  {
    name: "AI & AR Innovation Lab",
    category: "Solutions",
    desc: "A forward-looking experience zone featuring conversational AI, augmented-reality object recognition, and concept previews — designed to showcase what's coming next.",
    descAr: "منطقة تجريبية مستقبلية تجمع الذكاء الاصطناعي التحاوري، والتعرف بالواقع المعزز، ولمحات عن المفاهيم القادمة، لعرض ما هو قادم.",
    price: 10000,
    imageUrl: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=75",
    icon: "fa-vr-cardboard",
    createdAt: Date.now() - 3000
  }
];

async function addSolutionsToDb() {
  console.log("Adding Solutions activities to Firestore...");
  const collectionRef = db.collection('activities');

  for (const solution of solutions) {
    const docRef = await collectionRef.add(solution);
    console.log(`Added: ${solution.name} (ID: ${docRef.id})`);
  }

  console.log("Done — 4 Solutions added.");
  process.exit();
}

addSolutionsToDb();
