# GETTING STARTED - 5 MINUTE QUICKSTART

**TL;DR:** Copy files → Set up database → Play

---

## THE SUPER QUICK WAY (5 minutes)

### 1️⃣ Copy Files to GitHub (2 min)
Download all files from this chat and upload to:
https://github.com/NeverTouchABlackMansRadio/intergalactic-resistance

Drag & drop into GitHub's file upload. Done!

### 2️⃣ Set Up Database (2 min)
1. Go to: https://supabase.com/dashboard/project/feckhrgbhbgnhzppzzuu
2. Click "SQL Editor"
3. Create new query
4. Copy/paste `01_database_schema.sql`
5. Run it ✅

### 3️⃣ Run the Game (1 min)
```bash
git clone https://github.com/NeverTouchABlackMansRadio/intergalactic-resistance.git
cd intergalactic-resistance
npm install
npm run dev
```

**GAME OPENS AT:** http://localhost:3000

---

## THAT'S IT! You're Playing!

---

## First 5 Turns Guide

1. **Turn 1:** Game creates. You have 500 ore + 200 credits.
2. **Turn 2:** Click "Build Facility" → Choose Mining
3. **Turn 3:** Mining built! Produces 20 ore/turn
4. **Turn 4:** Click "Build Ship" → Name it → Confirm
5. **Turn 5:** You have your first ship!

Click "End Turn" repeatedly and watch resources grow.

---

## Want to Deploy Immediately?

Push to GitHub and Vercel auto-deploys:

```bash
git add .
git commit -m "First deploy"
git push
```

Visit https://vercel.com → Import repo → Done! 🚀

---

## Want More Detail?

Read:
- `README.md` - Full documentation
- `SETUP_GUIDE.md` - Detailed instructions
- `FILES_SUMMARY.md` - What's included

---

## Having Issues?

**"npm: command not found"**
→ Install Node.js: https://nodejs.org

**"Database connection failed"**
→ Make sure `.env.local` exists with Supabase credentials

**"Game won't start"**
→ Delete `node_modules/` and run `npm install` again

---

**That's all! Enjoy Intergalactic Resistance! 🎮**
