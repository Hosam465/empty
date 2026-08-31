const admin = require('firebase-admin');

// Initialize Firebase Admin (Replace with your service account key file path or credentials)
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Extract of all Team Building & Challenging activities from the document
const activities = [
  // --- Team Building Activities ---
  {
    name: "Wooden Tower",
    category: "Team Building",
    desc: "Standing in a circle, each participant holds one of the ropes connected to the metal crane. The group must use the crane to lift wooden blocks and stack them to build the highest, most stable tower.",
    time: "20-35 mins",
    participants: "6-10 per team",
    teams: "2-5",
    price: 500,
    imageUrl: "https://images.unsplash.com/photo-1539477192933-1a7dde04aa77?auto=format&fit=crop&w=800&q=75",
    icon: "fa-cubes",
    createdAt: Date.now()
  },
  {
    name: "Pipeline",
    category: "Team Building",
    desc: "A high-energy activity where teams transport a small ball through a pipeline constructed with half-pipes. The ball must stay in continuous, one-way motion from start to finish.",
    time: "10-20 mins",
    participants: "4-10 per team",
    teams: "1-5",
    price: 450,
    imageUrl: "https://images.unsplash.com/photo-1752681304960-bd4e018a04bb?auto=format&fit=crop&w=800&q=75",
    icon: "fa-vial",
    createdAt: Date.now() - 1000
  },
  {
    name: "Marshmallow Tower",
    category: "Team Building",
    desc: "Teams practice design thinking, prototyping, and iteration by constructing the tallest free-standing tower using spaghetti, tape, and string that can support a marshmallow at the top.",
    time: "10-20 mins",
    participants: "5-10 per team",
    teams: "1-5",
    price: 400,
    imageUrl: "https://images.unsplash.com/photo-1613549422147-9e4b76b4649b?auto=format&fit=crop&w=800&q=75",
    icon: "fa-chess-rook",
    createdAt: Date.now() - 2000
  },
  {
    name: "Traffic Jam",
    category: "Team Building",
    desc: "A human chess-like brain buster split between 2 sides. Requires meticulous planning, cooperation, and strategic communication to complete.",
    time: "Open",
    participants: "4 per team",
    teams: "2 only",
    price: 350,
    imageUrl: "https://images.unsplash.com/photo-1775323137421-7f1e74b98e29?auto=format&fit=crop&w=800&q=75",
    icon: "fa-arrows-split-up-and-left",
    createdAt: Date.now() - 3000
  },
  {
    name: "Rug & Balls",
    category: "Team Building",
    desc: "Teams coordinate using a designated rug to drop colored balls into their corresponding target holes, enhancing real-life planning and communication skills.",
    time: "10-30 mins",
    participants: "6-8 per team",
    teams: "2-5",
    price: 400,
    imageUrl: "https://images.unsplash.com/photo-1557734864-c78b6dfef1b1?auto=format&fit=crop&w=800&q=75",
    icon: "fa-circle-dot",
    createdAt: Date.now() - 4000
  },
  {
    name: "Tug of War",
    category: "Team Building",
    desc: "A classic favorite testing strength and collective effort, creating a strong sense of team unity as members pull together for victory.",
    time: "10-20 mins",
    participants: "4-10 per team",
    teams: "2-5",
    price: 300,
    imageUrl: "https://images.unsplash.com/photo-1748698534492-746f3950d9ca?auto=format&fit=crop&w=800&q=75",
    icon: "fa-people-pulling",
    createdAt: Date.now() - 5000
  },
  {
    name: "Hula Hoop Pass",
    category: "Team Building",
    desc: "Develops problem-solving and adaptive strategy by passing a hula hoop through a chain of connected team members without breaking contact.",
    time: "10-15 mins",
    participants: "6-10 per team",
    teams: "2-5",
    price: 250,
    imageUrl: "https://images.unsplash.com/photo-1774599661329-d9a2f999d1c4?auto=format&fit=crop&w=800&q=75",
    icon: "fa-circle-notch",
    createdAt: Date.now() - 6000
  },
  {
    name: "Balls and Stick",
    category: "Team Building",
    desc: "Requires patience and high-level synergy. Teams collaborate using specialized sticks to lift a ball from one point and drop it at a specified target location.",
    time: "10-12 mins",
    participants: "4-10 per team",
    teams: "1-5",
    price: 350,
    imageUrl: "https://images.unsplash.com/photo-1539345574544-27e5407b42aa?auto=format&fit=crop&w=800&q=75",
    icon: "fa-align-center",
    createdAt: Date.now() - 7000
  },
  {
    name: "Gold Mine",
    category: "Team Building",
    desc: "A trust-building challenge where blindfolded players navigate a simulated minefield to gather coins, relying purely on verbal directions from their teammates.",
    time: "10-20 mins",
    participants: "5-10 per team",
    teams: "1-5",
    price: 450,
    imageUrl: "https://images.unsplash.com/photo-1761412105162-97f2f2d28407?auto=format&fit=crop&w=800&q=75",
    icon: "fa-coins",
    createdAt: Date.now() - 8000
  },

  // --- Challenging Activities ---
  {
    name: "Mystery Box",
    category: "Challenging",
    desc: "One player acts as the Guesser while teammates guide their hands into a mystery box containing hidden items. The guesser must identify objects strictly by touch.",
    time: "10-15 mins",
    participants: "1-2 per team",
    teams: "2-5",
    price: 350,
    imageUrl: "https://images.unsplash.com/photo-1630397794907-a6574f227a3d?auto=format&fit=crop&w=800&q=75",
    icon: "fa-box-open",
    createdAt: Date.now() - 9000
  },
  {
    name: "XO Game (Tic-Tac-Toe Relay)",
    category: "Challenging",
    desc: "A high-speed physical tic-tac-toe relay set up with hula hoops. Teams race to place items in a 3x3 grid, shifting placement on subsequent runs until 3-in-a-row is achieved.",
    time: "10-20 mins",
    participants: "2-3 per team",
    teams: "1-5",
    price: 400,
    imageUrl: "https://images.unsplash.com/photo-1768319184064-d39a6a196452?auto=format&fit=crop&w=800&q=75",
    icon: "fa-xmark",
    createdAt: Date.now() - 10000
  },
  {
    name: "Infinite Loop",
    category: "Challenging",
    desc: "A creative puzzle game where participants must work together to untangle complex rope configurations and disengage from one another using logic and creative thinking.",
    time: "10-20 mins",
    participants: "2 per team",
    teams: "1-5",
    price: 400,
    imageUrl: "https://images.unsplash.com/photo-1591195852446-b206db137197?auto=format&fit=crop&w=800&q=75",
    icon: "fa-infinity",
    createdAt: Date.now() - 11000
  },
  {
    name: "River Crossing",
    category: "Challenging",
    desc: "Teams must strategize to transport every member across a simulated river using limited stepping stones, ensuring balance and leaving no team member behind.",
    time: "Open",
    participants: "4-6 per team",
    teams: "2 only",
    price: 450,
    imageUrl: "https://images.unsplash.com/photo-1597149560479-3c7d7b96d6bc?auto=format&fit=crop&w=800&q=75",
    icon: "fa-water",
    createdAt: Date.now() - 12000
  },
  {
    name: "Ball Control",
    category: "Challenging",
    desc: "Individual players showcase freestyle juggling skills and football control tricks, promoting fun engagement and energy before main challenges.",
    time: "10-30 mins",
    participants: "1 per team",
    teams: "2-5",
    price: 300,
    imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=75",
    icon: "fa-futbol",
    createdAt: Date.now() - 13000
  },
  {
    name: "The Catch",
    category: "Challenging",
    desc: "Players navigate across a bridge made of box panels where only specific steps are solid enough to hold their weight, testing tactical memory and risk assessment.",
    time: "10-20 mins",
    participants: "1 per team",
    teams: "2-5",
    price: 500,
    imageUrl: "https://images.unsplash.com/photo-1520352408661-83957c1379d2?auto=format&fit=crop&w=800&q=75",
    icon: "fa-bridge",
    createdAt: Date.now() - 14000
  }
];

async function seedDatabase() {
  console.log("Seeding activities into Firestore...");
  const collectionRef = db.collection('activities');
  
  for (const activity of activities) {
    const docRef = await collectionRef.add(activity);
    console.log(`Added: ${activity.name} (ID: ${docRef.id})`);
  }
  
  console.log("Successfully seeded all PDF activities!");
  process.exit();
}

seedDatabase();