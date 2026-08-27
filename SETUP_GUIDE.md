# INTERGALACTIC RESISTANCE - SETUP GUIDE
## Getting the prototype running (15 minutes)

---

## QUICK START (3 Steps)

### ✅ STEP 1: Copy Files to GitHub (5 minutes)

I've created all the files. You need to copy them to your GitHub repo.

**Option A: Download & Upload (Easiest)**
1. Download all files from `/mnt/user-data/outputs/` in this chat
2. Go to your GitHub repo: https://github.com/NeverTouchABlackMansRadio/intergalactic-resistance
3. Click **"Add file"** → **"Upload files"**
4. Select all the downloaded files and upload
5. Add commit message: "Initial prototype setup"
6. Click **"Commit changes"**

**Option B: Copy Manually (If files won't download)**
1. Go to your GitHub repo
2. Click **"Add file"** → **"Create new file"**
3. Copy each file from this chat:
   - `package.json`
   - `vite.config.ts`
   - `tsconfig.json`
   - etc.
4. Paste content and commit each file

**Key files to copy:**
- `package.json` (dependencies)
- All files in `src/` folder (React components)
- `01_database_schema.sql` (database)
- `.env.example` (environment)
- `index.html` (HTML entry)
- Config files: `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`

---

### ✅ STEP 2: Set Up Supabase Database (5 minutes)

1. **Go to Supabase:**
   - https://supabase.com/dashboard/project/feckhrgbhbgnhzppzzuu

2. **Run database schema:**
   - Click **"SQL Editor"** (left sidebar)
   - Click **"New query"**
   - Copy the SQL from `01_database_schema.sql` (in this chat or your GitHub)
   - Paste it in the editor
   - Click **"Run"** (or Ctrl+Enter)
   - Wait for success message ✅

3. **Database is ready!** All tables created

---

### ✅ STEP 3: Run Locally or Deploy (5 minutes)

#### Option A: Run Locally (Development)

```bash
# Clone your repo
git clone https://github.com/NeverTouchABlackMansRadio/intergalactic-resistance.git
cd intergalactic-resistance

# Install dependencies
npm install

# Start development server
npm run dev

# Opens http://localhost:3000 automatically
# Game is live! 🎮
```

#### Option B: Deploy to Vercel (Production)

1. **Go to:** https://vercel.com
2. **Click:** "New Project"
3. **Select GitHub repo:** intergalactic-resistance
4. **Click:** "Import"
5. **Vercel auto-detects settings:**
   - Framework: Vite ✅
   - Build command: npm run build ✅
   - Environment variables auto-detected from `.env.example` ✅
6. **Click:** "Deploy"
7. **Wait 1-2 minutes**
8. **Game is live!** 🚀 (Vercel gives you a URL)

---

## DETAILED SETUP (If you prefer step-by-step)

### Step 1A: Verify GitHub Repo

```bash
# Your repo should be here:
https://github.com/NeverTouchABlackMansRadio/intergalactic-resistance

# Should be empty or have just a README
```

### Step 1B: Add All Project Files

Create folder structure in GitHub:
```
intergalactic-resistance/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── PlanetView.tsx
│   │   ├── ExplorationView.tsx
│   │   ├── InventoryPanel.tsx
│   │   ├── GameLog.tsx
│   │   └── ActionBar.tsx
│   ├── store/
│   │   └── gameStore.ts
│   ├── lib/
│   │   └── supabase.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── App.css
│   └── index.css
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── .env.example
├── .gitignore
├── 01_database_schema.sql
├── vercel.json
└── README.md
```

### Step 2A: Verify Supabase Credentials

Your Supabase project should have:
- **Project URL:** https://feckhrgbhbgnhzppzzuu.supabase.co
- **Anon Key:** (in `.env.example`)

These are already in the project files.

### Step 2B: Create Database Tables

```sql
-- Run this in Supabase SQL Editor:
-- Copy entire contents of 01_database_schema.sql
```

Tables created:
- `games` - Game state
- `planets` - Player planets
- `facilities` - Buildings on planets
- `inventory` - Player resources
- `locations` - Exploration locations
- `player_crew` - Crew members
- `ships` - Player ships
- `combat_log` - Combat history
- `game_log` - Event log

### Step 3A: Run Locally

```bash
# Terminal in project directory:
npm install
npm run dev

# Visit http://localhost:3000
# Play the game!
```

### Step 3B: Deploy to Vercel

```bash
# Just push to GitHub:
git add .
git commit -m "Deploy to Vercel"
git push origin main

# Go to https://vercel.com
# Import the GitHub repo
# Auto-deployment happens
# Game goes live!
```

---

## VERIFICATION CHECKLIST

After setup, verify everything works:

### ✅ Can you see the game?
- Open http://localhost:3000 (local) or your Vercel URL (deployed)
- See "INTERGALACTIC RESISTANCE" title
- See game board with planet info

### ✅ Can you build facilities?
- Click "Build Facility"
- Resources deduct from inventory
- Facility appears on planet
- Production increases each turn

### ✅ Can you explore?
- Switch to "Exploration" view
- Click "Explore" on unknown locations
- Resources add to inventory
- Locations mark as discovered

### ✅ Can you build a ship?
- Click "Build Ship"
- Enter name
- Resources deduct
- Ship appears in list

### ✅ Does persistence work?
- Refresh the page (F5)
- Game state remains (same turn, resources, facilities)
- Check browser DevTools → Application → Local Storage → `currentGameId`

---

## COMMON ISSUES & FIXES

### Issue: "npm: command not found"
**Fix:** Install Node.js from https://nodejs.org

### Issue: "Cannot find module 'supabase'"
**Fix:** Run `npm install` in project directory

### Issue: "VITE_SUPABASE_URL is not defined"
**Fix:** Create `.env.local` file with contents from `.env.example`

### Issue: "Database connection failed"
**Fix:** 
1. Check `.env.local` has correct Supabase URL and anon key
2. Verify database schema was run in Supabase SQL editor
3. Check Supabase project URL is accessible

### Issue: "Game shows but no resources"
**Fix:**
1. Check Supabase database has tables (SQL Editor → browse data)
2. Check `inventory` table has a record
3. Try refreshing page

### Issue: "Game builds locally but Vercel deployment fails"
**Fix:**
1. Check GitHub repo has all files (.git push succeeds)
2. Check environment variables in Vercel project settings
3. Check build log in Vercel dashboard for errors

---

## WHAT TO DO NEXT

Once the prototype is running:

### Test the Game Loop
1. Build a mining facility
2. Upgrade it to level 2
3. Build a crystal extraction facility
4. Click "End Turn" 10 times
5. Watch resources accumulate
6. Verify foe HP increases

### Try Exploration
1. Switch to Exploration view
2. Explore a few locations
3. Collect bonuses
4. Return to Planet view

### Build a Ship
1. Accumulate enough resources
2. Click "Build Ship"
3. Name it
4. Confirm build

### Observe Full Loop
1. Build facilities
2. Explore for resources
3. Upgrade facilities
4. Build ships
5. Watch foe HP grow
6. Continue until game state changes

---

## FILE CHECKLIST

Before proceeding, verify these files are in your GitHub repo:

```
✅ 01_database_schema.sql
✅ .env.example
✅ .gitignore
✅ README.md
✅ SETUP_GUIDE.md (this file)
✅ index.html
✅ package.json
✅ postcss.config.js
✅ tailwind.config.js
✅ tsconfig.json
✅ vite.config.ts
✅ vercel.json
✅ src/App.css
✅ src/App.tsx
✅ src/index.css
✅ src/main.tsx
✅ src/components/ActionBar.tsx
✅ src/components/ExplorationView.tsx
✅ src/components/GameLog.tsx
✅ src/components/Header.tsx
✅ src/components/InventoryPanel.tsx
✅ src/components/PlanetView.tsx
✅ src/lib/supabase.ts
✅ src/store/gameStore.ts
```

**Total: 24 files**

---

## YOU'RE READY! 🚀

Your Intergalactic Resistance prototype should now be:
- ✅ Running locally (npm run dev)
- ✅ Connected to Supabase
- ✅ Persisting game state
- ✅ Playable from start to finish

**Next phase:** Add more planets, crew cards, combat, and multiplayer support.

---

## SUPPORT

If something doesn't work:

1. **Check error messages** in terminal or browser console (F12)
2. **Verify all files** are in the right places
3. **Check Supabase** - is database schema applied?
4. **Check environment** - is `.env.local` correct?
5. **Restart everything** - close terminal and start fresh

---

**Enjoy your game! 🎮**
