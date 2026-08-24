// Helper for local images in /img folder
const IMG = (name) => `/img/${name}.png`;
// const IMG = (file) => `/img/${file}.png`;

// Curated local image references for STESSARA
const PHOTOS = {
  // Petal collection — soft / floral
  petalsClutch:   IMG("petals-clutch"),
  bloomBag:       IMG("bloom-bag"),
  brownBloomBag: IMG("brown-bloom-bag-front"),
  brownBloomBagBack:IMG('brown-bloom-bag-back'),
  brownBloomBagSide:IMG('brown-bloom-bag-side'),
  brownBloomBagInside:IMG('brown-bloom-bag-inside'),

  whiteBloomBag: IMG("white-bloom-bag-front"),
  whiteBloomBagBack:IMG('white-bloom-bag-back'),
  whiteBloomBagSide:IMG('white-bloom-bag-side'),
  whiteBloomBagInside:IMG('white-bloom-bag-inside'),

  coeurMini:      IMG("coeur-mini"),
  redCoeurMini:      IMG("coeur-mini"),
    redCoeurMini: IMG("red-coeur-mini-front"),
  redCoeurMiniBack:IMG('red-coeur-mini-back'),
  redCoeurMiniSide:IMG('red-coeur-mini-side'),
  redCoeurMiniInside:IMG('red-coeur-mini-inside'),

  
  greenCoeurMini: IMG("green-coeur-mini-front"),
  greenCoeurMiniBack:IMG('green-coeur-mini-back'),
  greenCoeurMiniSide:IMG('green-coeur-mini-side'),
  greenCoeurMiniInside:IMG('green-coeur-mini-inside'),

  gardenTote:     IMG("garden-tote"),
  whisperPouch:   IMG("whisper-pouch"),

  // Bloom collection — bolder / darker
  midnightMesh:   IMG("midnight-mesh"),
  twoWayBeaded:   IMG("two-way-beaded"),
  noirClutch:     IMG("noir-clutch"),
  velvetPetal:    IMG("velvet-petal"),
  emberTote:      IMG("ember-tote"),

  // BTS (behind-the-scenes) lifestyle shots
  btsHands:       IMG("bts-hands"),
  btsWorkshop:    IMG("bts-workshop"),
  btsStringing:   IMG("bts-stringing"),

  // Collection covers
  coverPetal:     IMG("cover-petal"),
  coverBloom:     IMG("cover-bloom"),
  coverStessara:     IMG("cover-stessara"),
};

// Helper: build a colour variant image (same photo, different tint query)
// const variantImg = (id) => IMG(id);

// =============================================================
// The catalogue
// =============================================================

export const BAGS = [
  // ============= PETAL COLLECTION =============
  {
    slug: 'petals-clutch',
    name: 'Petals Clutch',
    collection: 'stessara01',
    tagline: 'A whisper of florals in the palm of your hand.',
    description:
      'Our signature piece. The Petals Clutch is hand-strung with thousands of glass seed beads in a soft floral motif. Designed for the woman who loves a quiet kind of drama — feminine, intentional, and unmistakably hers.',
    price: 145000,
    material: 'Czech glass seed beads, satin lining, magnetic clasp',
    dimensions: '22cm × 12cm × 4cm',
    care: 'Spot clean only. Store in dust bag.',
    delivery: 'Ships in 5–7 working days from Lagos.',
    featured: true,
    hero: true,
    photos: [PHOTOS.petalsClutch],
    variants: [
      { id: 'blush',   name: 'Blush',   hex: '#E97197', image: (PHOTOS.petalsClutch) },
      { id: 'cream',   name: 'Cream',   hex: '#F5EFE6', image: (PHOTOS.petalsClutch) },
      { id: 'wine',    name: 'Wine',    hex: '#7A1A2E', image: (PHOTOS.petalsClutch) },
      { id: 'noir',    name: 'Noir',    hex: '#0E0E0E', image: (PHOTOS.petalsClutch) },
    ],
  },
  {
    slug: 'bloom-bag',
    name: 'Bloom Bag',
    collection: 'stessara01',
    tagline: 'The bag that opened petals, now reborn.',
    description:
      'Inspired by Lagos sunsets. The Bloom Bag is a full-floral beaded tote with a removable inner pouch — wear it open for a roomy daytime carry, or cinched for a structured evening silhouette.',
    price: 185000,
    material: 'Glass seed beads, canvas lining, leather drawstring',
    dimensions: '30cm × 28cm × 14cm',
    care: 'Wipe with a soft, dry cloth.',
    delivery: 'Ships in 7–10 working days from Lagos.',
    featured: true,
    photos: [PHOTOS.bloomBag],
variants: [
  {
    id: 'green',
    name: 'Green',
    hex: '#094C13',
    images: [
      PHOTOS.bloomBag,
      PHOTOS.bloomBagBack,
      PHOTOS.bloomBagSide,
      PHOTOS.bloomBagInside,
    ],
  },
  {
    id: 'brown',
    name: 'Brown',
    hex: '#421410',
    images: [
      PHOTOS.brownBloomBag,
      PHOTOS.brownBloomBagBack,
      PHOTOS.brownBloomBagSide,
      PHOTOS.brownBloomBagInside,
    ],
  },
  {
    id: 'white',
    name: 'White',
    hex: '#FFFFFF',
    images: [
      PHOTOS.whiteBloomBag,
      PHOTOS.whiteBloomBagBack,
      PHOTOS.whiteBloomBagSide,
      PHOTOS.whiteBloomBagInside,
    ],
  },
],
  },
  {
    slug: 'coeur-mini',
    name: 'Cœur Mini',
    collection: 'stessara01',
    tagline: 'Tiny. Precious. A heart-shaped keepsake.',
    description:
      'A miniature heart-shaped beaded clutch, the Cœur Mini is our love letter to small, intentional things. Carry it to dinners, dates, and the moments you want to remember.',
    price: 95000,
    material: 'Glass seed beads, velvet backing, clasp closure',
    dimensions: '14cm × 12cm × 5cm',
    care: 'Spot clean only.',
    delivery: 'Ships in 5–7 working days from Lagos.',
    featured: true,
    hero:true,
    photos: [PHOTOS.coeurMini],
    variants: [
        {
    id: 'red',
    name: 'Red',
    hex: '#980002',
    images: [
       PHOTOS.redCoeurMini,
      PHOTOS.redCoeurMiniInside,
      PHOTOS.redCoeurMiniBack,
      PHOTOS.redCoeurMiniSide,
    ],
  },
  {
    id: 'green',
    name: 'Green',
    hex: '#094C13',
    images: [
      PHOTOS.greenCoeurMini,
      PHOTOS.greenCoeurMiniInside,
      PHOTOS.greenCoeurMiniBack,
      PHOTOS.greenCoeurMiniSide,
    ],
  },

],
  },
  {
    slug: 'garden-tote',
    name: 'Garden Tote',
    collection: 'stessara01',
    tagline: 'A walk through a flower market, in bag form.',
    description:
      'A full-beaded tote with a botanical motif inspired by the markets of Lagos. Roomy enough for your day, soft enough to feel like an accessory.',
    price: 165000,
    material: 'Glass beads, canvas lining, leather handles',
    dimensions: '34cm × 30cm × 12cm',
    care: 'Wipe with a soft, dry cloth.',
    delivery: 'Ships in 7–10 working days from Lagos.',
    featured: true,
    hero:true,
    photos: [PHOTOS.gardenTote],
    variants: [
      { id: 'sage',    name: 'Sage',    hex: '#8FA68E', image: (PHOTOS.gardenTote) },
      { id: 'blush',   name: 'Blush',   hex: '#E97197', image: (PHOTOS.gardenTote) },
      { id: 'cream',   name: 'Cream',   hex: '#F5EFE6', image: (PHOTOS.gardenTote) },
    ],
  },
  {
    slug: 'whisper-pouch',
    name: 'Whisper Pouch',
    collection: 'petal',
    tagline: 'Soft as its name. The evening clutch reimagined.',
    description:
      'A delicate drawstring pouch, hand-beaded in a soft floral pattern. Light enough to forget you\'re carrying it — until someone asks where you got it.',
    price: 110000,
    material: 'Glass seed beads, satin drawstring, silk lining',
    dimensions: '20cm × 18cm × 6cm',
    care: 'Spot clean only.',
    delivery: 'Ships in 5–7 working days from Lagos.',
    featured: false,
    photos: [PHOTOS.whisperPouch],
    variants: [
      { id: 'blush',   name: 'Blush',   hex: '#E97197', image: (PHOTOS.whisperPouch) },
      { id: 'cream',   name: 'Cream',   hex: '#F5EFE6', image: (PHOTOS.whisperPouch) },
      { id: 'lilac',   name: 'Lilac',   hex: '#C8A2C8', image: (PHOTOS.whisperPouch) },
    ],
  },

  // ============= BLOOM COLLECTION =============
  {
    slug: 'midnight-mesh',
    name: 'Midnight Mesh',
    collection: 'stessara01',
    tagline: 'Dark. Deliberate. The bag for after dark.',
    description:
      'A fully beaded mesh bag in deep, jewel tones. Inspired by Lagos nightlife — the Midnight Mesh carries everything you need and nothing you don\'t.',
    price: 175000,
    material: 'Glass beads, mesh lining, magnetic clasp',
    dimensions: '24cm × 18cm × 8cm',
    care: 'Wipe with a soft, dry cloth.',
    delivery: 'Ships in 7–10 working days from Lagos.',
    featured: true,
    photos: [PHOTOS.midnightMesh],
    variants: [
      { id: 'noir',    name: 'Noir',    hex: '#0E0E0E', image: (PHOTOS.midnightMesh) },
      { id: 'wine',    name: 'Wine',    hex: '#7A1A2E', image: (PHOTOS.midnightMesh) },
      { id: 'emerald', name: 'Emerald', hex: '#0E5C40', image: (PHOTOS.midnightMesh) },
    ],
  },
  {
    slug: 'two-way-beaded-bag',
    name: '2-Way Beaded Bag',
    collection: 'stessara01',
    tagline: 'Two silhouettes. One signature bag.',
    description:
      'Wear it as a structured top-handle, or release the strap and wear it crossbody. The 2-Way is our most versatile piece — and the one our customers reach for again and again.',
    price: 195000,
    material: 'Glass beads, leather handles, adjustable strap, suede lining',
    dimensions: '26cm × 20cm × 10cm',
    care: 'Spot clean. Treat leather handles with conditioner.',
    delivery: 'Ships in 7–10 working days from Lagos.',
    featured: true,
    hero: true,
    photos: [PHOTOS.twoWayBeaded],
    variants: [
      { id: 'noir',    name: 'Noir',    hex: '#0E0E0E', image: (PHOTOS.twoWayBeaded) },
      { id: 'crimson', name: 'Crimson', hex: '#980002', image: (PHOTOS.twoWayBeaded) },
      { id: 'gold',    name: 'Gold',    hex: '#C9A86A', image: (PHOTOS.twoWayBeaded) },
      { id: 'ivory',   name: 'Ivory',   hex: '#F5EFE6', image: (PHOTOS.twoWayBeaded) },
    ],
  },
  {
    slug: 'noir-clutch',
    name: 'Noir Clutch',
    collection: 'bloom',
    tagline: 'When in doubt: black, but make it beadwork.',
    description:
      'A jet-black beaded clutch with a subtle geometric pattern. The Noir Clutch is the quiet hero of any evening — it goes with everything and outlasts trends.',
    price: 125000,
    material: 'Glass seed beads, satin lining, magnetic clasp',
    dimensions: '24cm × 14cm × 5cm',
    care: 'Spot clean only.',
    delivery: 'Ships in 5–7 working days from Lagos.',
    featured: false,
    photos: [PHOTOS.noirClutch],
    variants: [
      { id: 'noir',    name: 'Noir',    hex: '#0E0E0E', image: (PHOTOS.noirClutch) },
      { id: 'gold',    name: 'Gold',    hex: '#C9A86A', image: (PHOTOS.noirClutch) },
      { id: 'silver',  name: 'Silver',  hex: '#C0C0C0', image: (PHOTOS.noirClutch) },
    ],
  },
  {
    slug: 'velvet-petal',
    name: 'Velvet Petal',
    collection: 'bloom',
    tagline: 'Velvet meets beadwork. A texture story.',
    description:
      'A bold hybrid: deep velvet panels framed by intricate beadwork. The Velvet Petal is for the woman who wants her accessories to make a statement — softly.',
    price: 155000,
    material: 'Cotton velvet, glass beads, leather clasp',
    dimensions: '22cm × 16cm × 7cm',
    care: 'Velvet: brush gently. Beadwork: spot clean.',
    delivery: 'Ships in 7–10 working days from Lagos.',
    featured: false,
    photos: [PHOTOS.velvetPetal],
    variants: [
      { id: 'wine',    name: 'Wine',    hex: '#7A1A2E', image: (PHOTOS.velvetPetal) },
      { id: 'noir',    name: 'Noir',    hex: '#0E0E0E', image: (PHOTOS.velvetPetal) },
      { id: 'crimson', name: 'Crimson', hex: '#980002', image: (PHOTOS.velvetPetal) },
    ],
  },
  {
    slug: 'ember-tote',
    name: 'Ember Tote',
    collection: 'bloom',
    tagline: 'The everyday tote, with a flame inside.',
    description:
      'A structured beaded tote in deep, warm tones. The Ember Tote is the bag that goes everywhere with you — to the office, to dinner, to the weekend.',
    price: 175000,
    material: 'Glass beads, canvas lining, leather handles',
    dimensions: '32cm × 28cm × 14cm',
    care: 'Wipe with a soft, dry cloth.',
    delivery: 'Ships in 7–10 working days from Lagos.',
    featured: false,
    photos: [PHOTOS.emberTote],
    variants: [
      { id: 'crimson', name: 'Crimson', hex: '#980002', image: (PHOTOS.emberTote) },
      { id: 'gold',    name: 'Gold',    hex: '#C9A86A', image: (PHOTOS.emberTote) },
      { id: 'noir',    name: 'Noir',    hex: '#0E0E0E', image: (PHOTOS.emberTote) },
    ],
  },
];

// =============================================================
// Lookups
// =============================================================

export const HERO_SLIDES = BAGS.filter((b) => b.hero).slice(0, 4);

export const FEATURED_BAGS = BAGS.filter((b) => b.featured).slice(0, 4);

export const PETAL_BAGS = BAGS.filter((b) => b.collection === 'petal');
export const STESSARA01_BAGS = BAGS.filter((b) => b.collection === 'stessara01');
// export const BLOOM_BAGS = BAGS.filter((b) => b.collection === 'bloom');

export const COLLECTIONS = [
  // {
  //   slug: 'petal',
  //   name: 'Petal Collection',
  //   tagline: 'Floral. Soft. Romantic.',
  //   description:
  //     'The Petal Collection is our softer side — floral motifs, blush tones, and silhouettes designed for the moments you want to feel like yourself.',
  //   coverImage: PHOTOS.coverPetal,
  // },
    {
    slug: 'stessara01',
    name: ' Stessara 0\'1   Collection',
    tagline: 'Floral. Soft. Functional.',
    description:
      'The Stessara 0\'1 Collection is our softer side — floral motifs, blush tones, and silhouettes designed for the moments you want to feel like yourself.',
    coverImage: PHOTOS.coverStessara,
  },
  // {
  //   slug: 'bloom',
  //   name: 'Bloom Collection',
  //   tagline: 'Bold. Dark. Unapologetic.',
  //   description:
  //     'The Bloom Collection is for after dark. Jewel tones, structured silhouettes, and the kind of beadwork that turns heads across the room.',
  //   coverImage: PHOTOS.coverBloom
  // },
];

export const BTS_PHOTOS = [
  IMG(PHOTOS.btsHands, 1600),
  IMG(PHOTOS.btsWorkshop, 1600),
  IMG(PHOTOS.btsStringing, 1600),
];

// =============================================================
// Helpers
// =============================================================

export function getBagBySlug(slug) {
  return BAGS.find((b) => b.slug === slug);
}

export function formatNGN(amount) {
  return `₦${amount.toLocaleString('en-NG')}`;
}
