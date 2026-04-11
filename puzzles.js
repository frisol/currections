// puzzles.js
// 20 puzzle sets for the Connections game.
// Each set has 4 groups ordered by difficulty:
//   index 0 → Yellow  (easiest)
//   index 1 → Green
//   index 2 → Blue
//   index 3 → Purple  (hardest)
// Each group has exactly 4 words.
// All content is suitable for ages 16 and under.

const PUZZLES = [
  // ── Puzzle 1 ──────────────────────────────────────────────────────────────
  {
    id: 1,
    groups: [
      {
        category: "Fruits",
        color: "yellow",
        words: ["APPLE", "MANGO", "PEACH", "GRAPE"],
      },
      {
        category: "Things you find in a kitchen",
        color: "green",
        words: ["WHISK", "LADLE", "TONGS", "SPATULA"],
      },
      {
        category: "Types of weather",
        color: "blue",
        words: ["SLEET", "DRIZZLE", "HAIL", "FROST"],
      },
      {
        category: "___ ball (compound words)",
        color: "purple",
        words: ["FIRE", "BASKET", "SNOW", "CANNON"],
      },
    ],
  },

  // ── Puzzle 2 ──────────────────────────────────────────────────────────────
  {
    id: 2,
    groups: [
      {
        category: "Colours of the rainbow",
        color: "yellow",
        words: ["RED", "ORANGE", "VIOLET", "INDIGO"],
      },
      {
        category: "Animals with stripes",
        color: "green",
        words: ["ZEBRA", "TIGER", "SKUNK", "CHIPMUNK"],
      },
      {
        category: "Things in a classroom",
        color: "blue",
        words: ["RULER", "CHALK", "EASEL", "GLOBE"],
      },
      {
        category: "Words that follow 'sun'",
        color: "purple",
        words: ["FLOWER", "BURN", "RISE", "SCREEN"],
      },
    ],
  },

  // ── Puzzle 3 ──────────────────────────────────────────────────────────────
  {
    id: 3,
    groups: [
      {
        category: "Planets in our solar system",
        color: "yellow",
        words: ["MARS", "VENUS", "SATURN", "URANUS"],
      },
      {
        category: "Things you pack for camping",
        color: "green",
        words: ["TENT", "COMPASS", "LANTERN", "CANTEEN"],
      },
      {
        category: "Types of pasta",
        color: "blue",
        words: ["PENNE", "FUSILLI", "ORZO", "RIGATONI"],
      },
      {
        category: "Words that can follow 'dog'",
        color: "purple",
        words: ["FISH", "HOUSE", "WOOD", "SLED"],
      },
    ],
  },

  // ── Puzzle 4 ──────────────────────────────────────────────────────────────
  {
    id: 4,
    groups: [
      {
        category: "Shades of blue",
        color: "yellow",
        words: ["NAVY", "COBALT", "TEAL", "CERULEAN"],
      },
      {
        category: "Things on a farm",
        color: "green",
        words: ["TRACTOR", "BARN", "SILO", "PITCHFORK"],
      },
      {
        category: "Sports played on ice",
        color: "blue",
        words: ["HOCKEY", "CURLING", "SKATING", "BANDY"],
      },
      {
        category: "___ stone (compound words)",
        color: "purple",
        words: ["LIME", "COBBLE", "SAND", "GOLD"],
      },
    ],
  },

  // ── Puzzle 5 ──────────────────────────────────────────────────────────────
  {
    id: 5,
    groups: [
      {
        category: "Types of hat",
        color: "yellow",
        words: ["BERET", "FEDORA", "BONNET", "STETSON"],
      },
      {
        category: "Things in the ocean",
        color: "green",
        words: ["KELP", "CORAL", "TRENCH", "CURRENT"],
      },
      {
        category: "Musical instruments (string)",
        color: "blue",
        words: ["CELLO", "BANJO", "SITAR", "LUTE"],
      },
      {
        category: "Words that precede 'light'",
        color: "purple",
        words: ["FLASH", "MOON", "STAR", "CANDLE"],
      },
    ],
  },

  // ── Puzzle 6 ──────────────────────────────────────────────────────────────
  {
    id: 6,
    groups: [
      {
        category: "Vegetables",
        color: "yellow",
        words: ["CARROT", "TURNIP", "PARSNIP", "LEEK"],
      },
      {
        category: "Things you do with a ball",
        color: "green",
        words: ["THROW", "CATCH", "BOUNCE", "DRIBBLE"],
      },
      {
        category: "Types of bridge",
        color: "blue",
        words: ["ARCH", "CABLE", "TRUSS", "SWING"],
      },
      {
        category: "Words that follow 'book'",
        color: "purple",
        words: ["SHELF", "WORM", "MARK", "CASE"],
      },
    ],
  },

  // ── Puzzle 7 ──────────────────────────────────────────────────────────────
  {
    id: 7,
    groups: [
      {
        category: "Things that are sticky",
        color: "yellow",
        words: ["HONEY", "GLUE", "TAPE", "RESIN"],
      },
      {
        category: "Parts of a castle",
        color: "green",
        words: ["TURRET", "MOAT", "DRAWBRIDGE", "PARAPET"],
      },
      {
        category: "Words meaning 'happy'",
        color: "blue",
        words: ["ELATED", "JOVIAL", "GLEEFUL", "CHIPPER"],
      },
      {
        category: "___ cloud (compound / phrases)",
        color: "purple",
        words: ["RAIN", "THUNDER", "STORM", "ANVIL"],
      },
    ],
  },

  // ── Puzzle 8 ──────────────────────────────────────────────────────────────
  {
    id: 8,
    groups: [
      {
        category: "Things in a bathroom",
        color: "yellow",
        words: ["TOWEL", "MIRROR", "FAUCET", "LOOFAH"],
      },
      {
        category: "Types of cheese",
        color: "green",
        words: ["BRIE", "GOUDA", "EDAM", "HAVARTI"],
      },
      {
        category: "Kinds of dance",
        color: "blue",
        words: ["WALTZ", "TANGO", "SAMBA", "FOXTROT"],
      },
      {
        category: "Words that precede 'walk'",
        color: "purple",
        words: ["BOARD", "CAKE", "SLEEP", "CROSS"],
      },
    ],
  },

  // ── Puzzle 9 ──────────────────────────────────────────────────────────────
  {
    id: 9,
    groups: [
      {
        category: "Things you find in a forest",
        color: "yellow",
        words: ["OAK", "FERN", "MOSS", "ACORN"],
      },
      {
        category: "Types of boat",
        color: "green",
        words: ["KAYAK", "DINGHY", "CANOE", "SCHOONER"],
      },
      {
        category: "Words meaning 'to look'",
        color: "blue",
        words: ["PEER", "GAZE", "GLANCE", "OGLE"],
      },
      {
        category: "___ print (compound words)",
        color: "purple",
        words: ["FOOT", "THUMB", "BLUE", "FINGER"],
      },
    ],
  },

  // ── Puzzle 10 ─────────────────────────────────────────────────────────────
  {
    id: 10,
    groups: [
      {
        category: "Animals that hop",
        color: "yellow",
        words: ["FROG", "RABBIT", "KANGAROO", "GRASSHOPPER"],
      },
      {
        category: "Things made of glass",
        color: "green",
        words: ["WINDOW", "VASE", "LENS", "PRISM"],
      },
      {
        category: "Types of cloud",
        color: "blue",
        words: ["CIRRUS", "NIMBUS", "STRATUS", "CUMULUS"],
      },
      {
        category: "Words that follow 'rain'",
        color: "purple",
        words: ["BOW", "DROP", "COAT", "FOREST"],
      },
    ],
  },

  // ── Puzzle 11 ─────────────────────────────────────────────────────────────
  {
    id: 11,
    groups: [
      {
        category: "Things in outer space",
        color: "yellow",
        words: ["COMET", "NEBULA", "ASTEROID", "PULSAR"],
      },
      {
        category: "Kitchen appliances",
        color: "green",
        words: ["BLENDER", "TOASTER", "JUICER", "STEAMER"],
      },
      {
        category: "Words meaning 'small'",
        color: "blue",
        words: ["TINY", "PETITE", "MINUTE", "PUNY"],
      },
      {
        category: "___ board (compound words)",
        color: "purple",
        words: ["SKATE", "SURF", "CARD", "DART"],
      },
    ],
  },

  // ── Puzzle 12 ─────────────────────────────────────────────────────────────
  {
    id: 12,
    groups: [
      {
        category: "Things that fly",
        color: "yellow",
        words: ["KITE", "DRAGONFLY", "BALLOON", "GLIDER"],
      },
      {
        category: "Types of tree",
        color: "green",
        words: ["WILLOW", "CEDAR", "MAPLE", "BIRCH"],
      },
      {
        category: "Parts of a shoe",
        color: "blue",
        words: ["SOLE", "TONGUE", "HEEL", "LACE"],
      },
      {
        category: "Words that precede 'house'",
        color: "purple",
        words: ["TREE", "LIGHT", "STORE", "WARE"],
      },
    ],
  },

  // ── Puzzle 13 ─────────────────────────────────────────────────────────────
  {
    id: 13,
    groups: [
      {
        category: "Things you find on a beach",
        color: "yellow",
        words: ["SHELL", "DUNE", "PEBBLE", "SEAWEED"],
      },
      {
        category: "Modes of transport",
        color: "green",
        words: ["TRAM", "FERRY", "MONORAIL", "RICKSHAW"],
      },
      {
        category: "Words meaning 'to walk slowly'",
        color: "blue",
        words: ["AMBLE", "SAUNTER", "STROLL", "MEANDER"],
      },
      {
        category: "___ fish (compound words)",
        color: "purple",
        words: ["SWORD", "STAR", "BLOW", "CAT"],
      },
    ],
  },

  // ── Puzzle 14 ─────────────────────────────────────────────────────────────
  {
    id: 14,
    groups: [
      {
        category: "Things that are round",
        color: "yellow",
        words: ["MARBLE", "COIN", "WHEEL", "GLOBE"],
      },
      {
        category: "Types of bread",
        color: "green",
        words: ["BRIOCHE", "CIABATTA", "RYE", "FOCACCIA"],
      },
      {
        category: "Parts of a flower",
        color: "blue",
        words: ["PETAL", "STAMEN", "PISTIL", "SEPAL"],
      },
      {
        category: "Words that follow 'sun'",
        color: "purple",
        words: ["SET", "DIAL", "STROKE", "ROOF"],
      },
    ],
  },

  // ── Puzzle 15 ─────────────────────────────────────────────────────────────
  {
    id: 15,
    groups: [
      {
        category: "Things in a toolbox",
        color: "yellow",
        words: ["HAMMER", "DRILL", "CHISEL", "WRENCH"],
      },
      {
        category: "Types of fabric",
        color: "green",
        words: ["DENIM", "VELVET", "LINEN", "TWEED"],
      },
      {
        category: "Words meaning 'to throw'",
        color: "blue",
        words: ["HURL", "FLING", "LOB", "TOSS"],
      },
      {
        category: "___ work (compound words)",
        color: "purple",
        words: ["FRAME", "FIELD", "NET", "PAPER"],
      },
    ],
  },

  // ── Puzzle 16 ─────────────────────────────────────────────────────────────
  {
    id: 16,
    groups: [
      {
        category: "Things that glow",
        color: "yellow",
        words: ["EMBER", "FIREFLY", "MOON", "NEON"],
      },
      {
        category: "Parts of a bicycle",
        color: "green",
        words: ["PEDAL", "SPOKE", "CHAIN", "FORK"],
      },
      {
        category: "Types of soil",
        color: "blue",
        words: ["LOAM", "CLAY", "SILT", "PEAT"],
      },
      {
        category: "Words that precede 'line'",
        color: "purple",
        words: ["HAIR", "BASE", "LAND", "BORDER"],
      },
    ],
  },

  // ── Puzzle 17 ─────────────────────────────────────────────────────────────
  {
    id: 17,
    groups: [
      {
        category: "Animals in a pond",
        color: "yellow",
        words: ["NEWT", "HERON", "CRAYFISH", "TOAD"],
      },
      {
        category: "Things you find in a library",
        color: "green",
        words: ["ATLAS", "CATALOGUE", "MICROFILM", "PERIODICAL"],
      },
      {
        category: "Words meaning 'to shine'",
        color: "blue",
        words: ["GLEAM", "GLISTEN", "SHIMMER", "SPARKLE"],
      },
      {
        category: "___ box (compound words)",
        color: "purple",
        words: ["MUSIC", "SAND", "TOOL", "VOICE"],
      },
    ],
  },

  // ── Puzzle 18 ─────────────────────────────────────────────────────────────
  {
    id: 18,
    groups: [
      {
        category: "Things that are cold",
        color: "yellow",
        words: ["GLACIER", "TUNDRA", "FROST", "SLUSH"],
      },
      {
        category: "Types of map",
        color: "green",
        words: ["RELIEF", "CONTOUR", "POLITICAL", "NAUTICAL"],
      },
      {
        category: "Words meaning 'to mix'",
        color: "blue",
        words: ["BLEND", "STIR", "FOLD", "WHISK"],
      },
      {
        category: "___ point (compound / phrases)",
        color: "purple",
        words: ["GUN", "VIEW", "BALL", "NEEDLE"],
      },
    ],
  },

  // ── Puzzle 19 ─────────────────────────────────────────────────────────────
  {
    id: 19,
    groups: [
      {
        category: "Types of nut",
        color: "yellow",
        words: ["WALNUT", "CASHEW", "HAZEL", "PECAN"],
      },
      {
        category: "Things you find at a fairground",
        color: "green",
        words: ["CAROUSEL", "BUMPER", "FERRIS", "STALL"],
      },
      {
        category: "Words meaning 'to hide'",
        color: "blue",
        words: ["CONCEAL", "SHROUD", "VEIL", "CLOAK"],
      },
      {
        category: "Words that follow 'ice'",
        color: "purple",
        words: ["BERG", "CAP", "LAND", "BREAKER"],
      },
    ],
  },

  // ── Puzzle 20 ─────────────────────────────────────────────────────────────
  {
    id: 20,
    groups: [
      {
        category: "Things in a garden",
        color: "yellow",
        words: ["TROWEL", "HOSE", "MULCH", "TRELLIS"],
      },
      {
        category: "Types of storm",
        color: "green",
        words: ["BLIZZARD", "TYPHOON", "CYCLONE", "SQUALL"],
      },
      {
        category: "Words meaning 'to begin'",
        color: "blue",
        words: ["LAUNCH", "COMMENCE", "EMBARK", "INITIATE"],
      },
      {
        category: "___ net (compound words)",
        color: "purple",
        words: ["HAIR", "DRAG", "SAFETY", "INTER"],
      },
    ],
  },
];
