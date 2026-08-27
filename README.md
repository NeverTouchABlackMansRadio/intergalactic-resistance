# INTERGALACTIC RESISTANCE - Prototype
## Phase 1: Core Game Loop MVP

A turn-based space strategy game built with React + Supabase.

---

## WHAT'S INCLUDED

### ✅ Working Mechanics
- Turn-based infrastructure management (Age of Empires style)
- Planet facility building and upgrades
- Resource generation per turn
- Exploration system (20 locations)
- Basic game state management
- Game persistence (Supabase database)

### 🎮 Playable Features
- Build mining/crystal/quantum facilities on home planet
- Upgrade facilities to increase production
- Explore locations and discover resources
- Build ships with collected resources
- Track FOE HP (increases each turn)
- View inventory and game logs
- Save/load game automatically

### ⚙️ Technology
- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand
- **Backend:** Supabase (PostgreSQL)
- **Build:** Vite
- **Deployment:** Vercel (optional)

---

## SETUP INSTRUCTIONS

### 1. Clone the Repository

```bash
git clone https://github.com/NeverTouchABlackMansRadio/intergalactic-resistance.git
cd intergalactic-resistance
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

The file already contains your Supabase credentials. No changes needed unless updating later.

### 4. Set Up Supabase Database

Go to your Supabase dashboard and run the SQL schema:

1. **Go to:** https://supabase.com/dashboard/project/feckhrgbhbgnhzppzzuu
2. **Click:** SQL Editor (left sidebar)
3. **Create new query**
4. **Copy/paste the contents of:** `01_database_schema.sql`
5. **Run the query**

This creates all tables and RLS policies needed.

### 5. Run Locally

```bash
npm run dev
```

Game will open at `http://localhost:3000`

---

## HOW TO PLAY

### Getting Started
1. Game creates automatically on first load
2. You start on **Barren** home planet with 500 ore + 200 credits
3. Check the **right sidebar** for Inventory and Game Log

### Building Facilities
1. Open **PlanetView** (main panel)
2. Click **"Build Facility"** on empty slots
3. Choose: Mining, Crystals, or Quantum Lab
4. Pay the resource cost
5. Facility takes 1-2 turns to build
6. Once built, produces resources every turn automatically

### Exploring
1. Switch to **Exploration** view
2. Click **"Explore"** on unknown locations
3. Discover locations and collect resources
4. Each exploration = 1 turn

### Building a Ship
1. Click **"Build Ship"** in action bar
2. Enter ship name
3. Pay cost: 400 ore, 100 crystals, 300 credits
4. Takes 1 turn to build

### Ending Turns
1. Click **"End Turn"** in action bar
2. Foe HP increases by 10
3. All facilities produce resources
4. Resources accumulate in inventory

### Winning
- Reduce foe HP to 0 by exploring and gathering resources
- Better facilities = more production = faster foe defeat

---

## GAME MECHANICS

### Facility Production (per turn)

**Mining Facility:**
- Level 1: 20 ore/turn
- Level 2: 40 ore/turn
- Level 3: 70 ore/turn
- Level 4: 110 ore/turn
- Level 5: 160 ore/turn

**Crystal Extraction:**
- Level 1: 15 crystals/turn
- Level 5: 130 crystals/turn

**Quantum Lab:**
- Level 1: 8 quantum/turn
- Level 5: 75 quantum/turn
- Consumes 5 crystals per 2 quantum automatically

### Resource Locations

Each location found gives one-time bonus:
- Mining Site: +200 ore
- Crystal Cave: +100 crystals
- Quantum Anomaly: +50 quantum

### Foe HP

- Starts at: 5000 HP
- Increases by: 10 HP per turn
- Win condition: Reduce to 0 HP through combat

---

## PROJECT STRUCTURE

```
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Game state header
│   │   ├── PlanetView.tsx          # Facility management
│   │   ├── ExplorationView.tsx     # Location discovery
│   │   ├── InventoryPanel.tsx      # Resource display
│   │   ├── GameLog.tsx             # Event log
│   │   └── ActionBar.tsx           # Player actions
│   ├── store/
│   │   └── gameStore.ts            # Zustand state management
│   ├── lib/
│   │   └── supabase.ts             # Supabase client + types
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   ├── App.css                     # App styles
│   └── index.css                   # Global styles
├── 01_database_schema.sql          # Database migrations
├── package.json                    # Dependencies
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript config
├── tailwind.config.js              # Tailwind config
├── postcss.config.js               # PostCSS config
├── index.html                      # HTML entry
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

---

## DEPLOYMENT (Optional)

### Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repo
   - Environment variables are auto-detected from `.env.local`
   - Click "Deploy"

3. **Game is live!** Share the URL with friends

---

## CURRENT LIMITATIONS (MVP)

- ❌ No multiplayer yet (solo only)
- ❌ No crew cards (just labels for now)
- ❌ No advanced combat system
- ❌ No advanced scoring
- ❌ Limited to Barren planet (1 planet)
- ❌ Only 3 facility types
- ❌ Simple UI (no animations)

---

## NEXT STEPS (Phase 2)

- [ ] Add more planets to discover
- [ ] Add crew cards and selection
- [ ] Combat encounters with enemies
- [ ] Multiple ship types
- [ ] Crafting blueprints
- [ ] Alien tech system
- [ ] Research center facility
- [ ] Trade hub facility
- [ ] Foe encounter logic
- [ ] Multiplayer/alliance system

---

## TROUBLESHOOTING

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install
```

### "Environment variables not loading"
Make sure `.env.local` exists in project root with Supabase credentials.

### "Database connection failed"
1. Check Supabase project URL is correct
2. Verify anon key is valid
3. Run database schema in Supabase SQL editor

### "Game won't save"
1. Open browser DevTools (F12)
2. Check "Application" tab → "Local Storage"
3. Look for `currentGameId`
4. Check Supabase database has records

---

## FILES TO DOWNLOAD/COPY

All the following files are ready in this directory. Copy them into your GitHub repo:

```
✅ Database: 01_database_schema.sql
✅ Config: package.json, vite.config.ts, tsconfig.json, tailwind.config.js, postcss.config.js
✅ Environment: .env.example, .gitignore
✅ HTML: index.html
✅ Source: src/ (all files)
✅ Docs: README.md
```

---

## PLAYING THE GAME

### Turn 1-10: Early Game
- Build first mining facility (1 turn)
- Explore and discover resource locations
- Accumulate resources

### Turn 11-30: Mid Game
- Upgrade mining to level 2-3
- Build crystal extraction facility
- Continue exploring

### Turn 31-50: Late Game
- Upgrade facilities to level 4-5
- Build quantum lab (2 turns)
- Build first ship

### Turn 51+: Endgame
- Launch exploration campaign
- Return home to harvest resources
- Build new ships and facilities
- Encounter and defeat foe

---

## CREDITS

- **Design:** Complete game design document (12 systems)
- **Code:** React + Supabase implementation
- **Art:** Placeholder (ready for real art integration)

---

## LICENSE

MIT - Feel free to modify and use!

---

**Ready to play?** Follow the setup instructions and enjoy Intergalactic Resistance! 🚀
