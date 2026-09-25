
const hero = "/images/hero.jpg";
const croissant = "/images/croissant.jpg";
const latte = "/images/latte.jpg";
const cake = "/images/cake.jpg";
const brunch = "/images/brunch.jpg";
const gulshan = "/images/gulshan.jpg";
const dhanmondi = "/images/dhanmondi.jpg";
const mirpur = "/images/mirpur.jpg";
const atelier = "/images/atelier.jpg";
const og = "/images/og.jpg";


export const brand = {

  name: "IZ Pâtisserie & Café",

  short: "IZ",

  tagline: "Caffeine & Kindness",

  email: "info@iz.cafe",

  url: "https://iz.cafe",

  instagram: "https://www.instagram.com/izpatisserieandcafe/",

  facebook: "https://www.facebook.com/IZPatisserieandCafe",

  founder: "Israt Zisan",

};



export const images = {

  hero,

  croissant,

  latte,

  cake,

  brunch,

  gulshan,

  dhanmondi,

  mirpur,

  atelier,

  og,

  pastryCase:

    "https://images.pexels.com/photos/19498989/pexels-photo-19498989.jpeg?auto=compress&cs=tinysrgb&w=1600",

  bakery:

    "https://images.pexels.com/photos/20543564/pexels-photo-20543564.jpeg?auto=compress&cs=tinysrgb&w=1600",

  dessertCase:

    "https://images.pexels.com/photos/29517897/pexels-photo-29517897.jpeg?auto=compress&cs=tinysrgb&w=1600",

  espresso:

    "https://images.pexels.com/photos/10439808/pexels-photo-10439808.jpeg?auto=compress&cs=tinysrgb&w=900",

  brownie:

    "https://images.pexels.com/photos/9271569/pexels-photo-9271569.jpeg?auto=compress&cs=tinysrgb&w=1200",

};



export type Location = {

  slug: string;

  name: string;

  neighborhood: string;

  address: string;

  phone: string;

  phoneHref: string;

  hours: string;

  hoursNote: string;

  lat: number;

  lon: number;

  image: string;

  blurb: string;

  seats: string;

  bestFor: string;

  signature: string;

  gettingThere: string;

  mood: string;

  amenities: string[];

  hoursTable: { day: string; time: string }[];

};



export const locations: Location[] = [

  {

    slug: "gulshan-2",

    name: "Gulshan 2",

    neighborhood: "Flagship Lounge",

    address: "Concord Baksh Tower, Apt 1/B, House 11/A, Road 48, Gulshan 2, Dhaka 1212",

    phone: "01329-731723",

    phoneHref: "tel:+8801329731723",

    hours: "Sun–Wed 8:00–23:00 · Thu–Sat 8:00–00:00",

    hoursNote: "Kitchen until 22:30",

    lat: 23.7948,

    lon: 90.4143,

    image: gulshan,

    blurb: "A lounge-level house for long coffees, late desserts, and the city’s quietest gold light.",

    seats: "42 inside · lounge banquettes",

    bestFor: "Evening dessert, quiet work, late lattes",

    signature: "Salted Caramel Latte after ten",

    gettingThere: "Road 48, Gulshan 2 — valet on the tower forecourt, ride-share drop at Concord Baksh.",

    mood: "Brass, velvet, city light",

    amenities: ["Lounge seating", "Dessert after 22:00", "Takeaway", "Private corner tables", "Card & bKash"],

    hoursTable: [

      { day: "Sun – Wed", time: "08:00 – 23:00" },

      { day: "Thu – Sat", time: "08:00 – 00:00" },

      { day: "Kitchen", time: "Until 22:30" },

    ],

  },

  {

    slug: "dhanmondi",

    name: "Dhanmondi",

    neighborhood: "Concord Sohel Square",

    address: "Level 5, Concord Sohel Square, 75 Satmasjid Road, Dhanmondi, Dhaka 1205",

    phone: "01335-259229",

    phoneHref: "tel:+8801335259229",

    hours: "Sun–Wed 8:00–23:00 · Thu–Sat 8:00–00:00",

    hoursNote: "Level 5, above the square",

    lat: 23.7465,

    lon: 90.3760,

    image: dhanmondi,

    blurb: "Above Satmasjid Road — pastry, pasta, and a table by the window for the afternoon.",

    seats: "56 · window tables & long communal",

    bestFor: "Brunch with friends, pasta lunches, golden-hour coffee",

    signature: "English Breakfast by the window",

    gettingThere: "Level 5, Concord Sohel Square, 75 Satmasjid Road. Lift from the square atrium.",

    mood: "Daylight, trees, conversation",

    amenities: ["Window seats", "Group tables", "Full kitchen", "Wi-Fi", "Takeaway"],

    hoursTable: [

      { day: "Sun – Wed", time: "08:00 – 23:00" },

      { day: "Thu – Sat", time: "08:00 – 00:00" },

      { day: "Kitchen", time: "Until 22:30" },

    ],

  },

  {

    slug: "mirpur-12",

    name: "Mirpur 12",

    neighborhood: "The Original Atelier",

    address: "Level 5, Safura Tower, House 45, Road 7, Pallabi, Mirpur 12, Dhaka 1216",

    phone: "01770-024245",

    phoneHref: "tel:+8801770024245",

    hours: "Daily 8:00–23:00",

    hoursNote: "Beside Pallabi Metro",

    lat: 23.8273,

    lon: 90.3644,

    image: mirpur,

    blurb: "Where it began. Victorian rooms, chandeliers, and the first laminated dough in the neighborhood.",

    seats: "38 · cream velvet sofas",

    bestFor: "First visits, slow mornings, pastry with the vitrine",

    signature: "Butter croissant + house espresso",

    gettingThere: "Level 5, Safura Tower, House 45, Road 7 — beside Pallabi Metro, same building as the square.",

    mood: "Chandeliers, paintings, hush",

    amenities: ["Victorian salon", "Pastry counter", "Metro-adjacent", "Delivery", "High ceilings"],

    hoursTable: [

      { day: "Every day", time: "08:00 – 23:00" },

      { day: "First bake", time: "06:30" },

      { day: "Last pour", time: "22:45" },

    ],

  },

];



const pic = (id: number) =>

  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;



export type MenuItem = {

  name: string;

  desc: string;

  price: number;

  image: string;

  tag?: string;

};



export type MenuCategory = {

  id: string;

  name: string;

  items: MenuItem[];

};



export const menu: MenuCategory[] = [

  {

    id: "coffee",

    name: "Coffee",

    items: [

      { name: "House Espresso", desc: "Chocolate, toasted almond, molasses", price: 220, image: pic(34206522) },

      { name: "Americano", desc: "Long espresso, hot or iced", price: 305, image: pic(35835480) },

      { name: "Vanilla Latte", desc: "Creamed milk, Madagascar vanilla", price: 390, image: pic(631160) },

      { name: "Caramel Latte", desc: "Buttery caramel, house espresso", price: 390, image: pic(39576775) },

      { name: "Salted Caramel Latte", desc: "Our most-loved winter-to-summer cup", price: 460, tag: "Signature", image: pic(1621260) },

      { name: "Spanish Latte", desc: "Condensed milk, espresso, ice", price: 420, image: pic(31797948) },

      { name: "Tiramisu Latte", desc: "Mascarpone cream, cocoa, espresso", price: 470, tag: "New", image: pic(37210665) },

      { name: "Dark Mocha", desc: "70% chocolate, double espresso", price: 440, image: pic(28869124) },

      { name: "Coconut Cold Brew", desc: "18-hour steep, coconut, sea salt", price: 410, tag: "Iced", image: pic(4869336) },

      { name: "Café Freddo", desc: "Shaken espresso over ice", price: 360, image: pic(26582523) },

    ],

  },

  {

    id: "pastry",

    name: "Pâtisserie",

    items: [

      { name: "Butter Croissant", desc: "Laminated at dawn, 27 layers", price: 220, tag: "Classic", image: pic(15023803) },

      { name: "Almond Croissant", desc: "Frangipane, toasted almonds", price: 280, image: pic(15738015) },

      { name: "Pain au Chocolat", desc: "Two batons of dark couverture", price: 260, image: pic(8909323) },

      { name: "Nutella Croissant", desc: "Hazelnut ganache, pearl sugar", price: 300, image: pic(9114088) },

      { name: "Custard Croissant", desc: "Vanilla pastry cream", price: 290, image: pic(7332874) },

      { name: "Spinach & Feta Croissant", desc: "Savory, flaky, lunch-ready", price: 320, image: pic(1839752) },

      { name: "Cinnamon Roll", desc: "Brown butter glaze", price: 240, image: pic(30666843) },

      { name: "Banana Bread", desc: "Walnut, sea salt", price: 210, image: pic(4114141) },

      { name: "Chocolate Chip Cookie", desc: "Warm, with flaky salt", price: 160, image: pic(13921501) },

      { name: "The Brownie", desc: "Fudgy, the one guests return for", price: 175, tag: "Beloved", image: pic(36500587) },

    ],

  },

  {

    id: "dessert",

    name: "Dessert",

    items: [

      { name: "Tart au Chocolat", desc: "Ganache, gold leaf, raspberry", price: 420, tag: "Atelier", image: pic(30181075) },

      { name: "Molten Chocolate Cake", desc: "Warm centre, vanilla cream", price: 390, image: pic(291528) },

      { name: "Biscoff Bomboloni", desc: "Fried dough, cookie butter", price: 280, image: pic(1721932) },

      { name: "Crème Brûlée", desc: "Burnt sugar, Madagascar vanilla", price: 360, image: pic(34520970) },

      { name: "Mini Cake of the Day", desc: "Ask the counter", price: 450, image: pic(9833959) },

    ],

  },

  {

    id: "kitchen",

    name: "Kitchen",

    items: [

      { name: "Classic English Breakfast", desc: "Eggs, mushrooms, toast, beans", price: 690, tag: "All day", image: pic(8480747) },

      { name: "Soft Scramble & Mushrooms", desc: "Crème fraîche, sourdough", price: 540, image: pic(8480756) },

      { name: "Beef Croissant Sandwich", desc: "Slow beef, cornichon, butter", price: 620, image: pic(13689825) },

      { name: "Buffalo Chicken Melt", desc: "Hot sauce, mozzarella, sourdough", price: 580, image: pic(29954941) },

      { name: "Veg Pesto Panini", desc: "Honey mustard, seasonal greens", price: 520, image: pic(1640777) },

      { name: "BBQ Chicken Toasty", desc: "Smoked sauce, cheddar", price: 540, image: pic(32715053) },

      { name: "Tuna Melt Toasty", desc: "Herb mayo, gruyère", price: 530, image: pic(566566) },

      { name: "Alfredo Pasta", desc: "Parmesan cream, black pepper", price: 720, image: pic(2703468) },

    ],

  },

];



export const philosophy = [

  {

    title: "Laminated, not rushed",

    body: "Dough rests overnight. Butter stays cold. Every croissant is a small act of patience.",

  },

  {

    title: "Coffee with a name",

    body: "We pull espresso for the person in front of us — not for a queue on a screen.",

  },

  {

    title: "Rooms that remember Europe",

    body: "Chandeliers, cream velvet, and the warmth of a Dhaka afternoon. Hospitality is the interior.",

  },

  {

    title: "Caffeine & Kindness",

    body: "A house rule. Come as you are. Stay as long as the cup lasts.",

  },

];



export const ritual = [

  { time: "04:00", title: "Laminate", body: "Butter stays cold. Dough is folded, rested, folded again — 27 layers before the sun." },

  { time: "06:30", title: "First bake", body: "Croissants, pain au chocolat, the brownie tin. The house smells like a Paris morning." },

  { time: "08:00", title: "Doors", body: "Espresso pulled for the first name we know. Cream sofas, open windows, no hurry." },

  { time: "12:00", title: "Kitchen", body: "English breakfast, melts, pasta. The vitrine is reset for the afternoon." },

  { time: "16:00", title: "Second bake", body: "Cinnamon rolls, tarts, whatever the pastry chef decided at dawn." },

  { time: "22:00", title: "Last light", body: "Gulshan stays late. Dessert, a salted caramel, the city below." },

];



export const ingredients = [

  { name: "French butter", note: "For every laminated dough. We do not substitute." },

  { name: "70% couverture", note: "The tart, the mocha, the molten cake." },

  { name: "Madagascar vanilla", note: "Crème brûlée, pastry cream, the vanilla latte." },

  { name: "Single-origin espresso", note: "Chocolate, toasted almond, molasses — pulled to order." },

];




export const pairings = [
  { cup: "Salted Caramel Latte", plate: "The Brownie", why: "Salt, fudge, and a long finish." },
  { cup: "House Espresso", plate: "Butter Croissant", why: "The original IZ breakfast." },
  { cup: "Coconut Cold Brew", plate: "Tart au Chocolat", why: "Cold, dark, a little gold leaf." },
  { cup: "Vanilla Latte", plate: "Almond Croissant", why: "Soft, toasted, unhurried." },
];

export const faqs = [
  { q: "Do I need a reservation?", a: "Walk-ins are welcome until the room fills. Evenings in Gulshan and weekend brunch in Dhanmondi book out — write us a note." },
  { q: "Is there vegetarian pastry?", a: "Most viennoiserie is vegetarian. The spinach & feta croissant and pesto panini are kitchen favourites. Ask for today’s tart." },
  { q: "Do you deliver?", a: "Yes — through our partners across Dhaka. Packaging is designed so a croissant still flakes at your door." },
  { q: "Can I host a private table?", a: "Gulshan has two corner banquettes for 6–8. Call the house a day ahead. We do not take walk-in parties over six." },
  { q: "What time is the last bake?", a: "Second bake lands around 16:00. After 20:00 the vitrine is whatever survived the afternoon — still worth it." },
];

export const gallery = [

  { src: images.hero, title: "The salon", caption: "Gulshan light on cream marble" },

  { src: images.croissant, title: "27 layers", caption: "Butter croissant, dawn bake" },

  { src: images.latte, title: "The house cup", caption: "Tulip art, gold rim" },

  { src: images.cake, title: "Atelier", caption: "Tart au chocolat, gold leaf" },

  { src: images.brunch, title: "All day", caption: "English breakfast, properly" },

  { src: images.atelier, title: "Hands", caption: "Laminating before the city wakes" },

  { src: images.gulshan, title: "Gulshan 2", caption: "Lounge, brass, late dessert" },

  { src: images.dhanmondi, title: "Dhanmondi", caption: "Level 5, Satmasjid Road" },

  { src: images.mirpur, title: "Mirpur 12", caption: "The original Victorian room" },

  { src: images.pastryCase, title: "Vitrine", caption: "Whatever came out at 06:30" },

  { src: images.bakery, title: "Counter", caption: "The pass between kitchen and house" },

  { src: images.espresso, title: "Steam", caption: "Pulled for the person in front of us" },

];



export const testimonials = [

  {

    quote: "The croissant was an actual croissant — flaky, sweet, perfectly shaped. Not the flat bread most cafés sell.",

    name: "Nafis",

    place: "Mirpur 12",

  },

  {

    quote: "Vanilla latte with the perfect bitter-to-sweet ratio. Their brownie is my favourite in the city.",

    name: "Jannatul",

    place: "Regular",

  },

  {

    quote: "The Classic English Breakfast is 100/100, and the packaging is genuinely premium.",

    name: "Asif",

    place: "Delivery",

  },

];


