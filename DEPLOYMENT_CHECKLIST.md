# 🚀 Quick Deployment Checklist

Use this checklist while following the detailed guide in `RENDER_DEPLOYMENT_GUIDE.md`

## Pre-Deployment
- [ ] Verify you have `server.js`, `package.json`, and `.gitignore`
- [ ] Create GitHub account (if needed)
- [ ] Create Render account (if needed)

## GitHub Setup
- [ ] Create new repository on GitHub
- [ ] Name it (e.g., `zahicraft-multiplayer`)
- [ ] Set to **Public**
- [ ] Run: `git init` (if needed)
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Initial commit"`
- [ ] Run: `git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git`
- [ ] Run: `git push -u origin main`

## Render Deployment
- [ ] Sign up at https://render.com
- [ ] Click **"New +"** → **"Web Service"**
- [ ] Connect your GitHub repository
- [ ] Configure settings:
  - [ ] Name: `zahicraft-server`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
  - [ ] Instance Type: **Free**
- [ ] Click **"Create Web Service"**
- [ ] Wait for "Live" status (2-3 minutes)
- [ ] Copy your server URL (e.g., `https://zahicraft-server.onrender.com`)

## Update Game Client
- [ ] Open `index.html` in code editor
- [ ] Find line ~495: `const SERVER_URL = 'http://localhost:3000';`
- [ ] Replace with: `const SERVER_URL = 'https://YOUR-SERVICE.onrender.com';`
- [ ] Save the file

## Testing
- [ ] Open `index.html` in browser
- [ ] Click "Multiplayer"
- [ ] Click "Quick Play"
- [ ] Wait 30 seconds (first connection - server waking up)
- [ ] Should see "Connected!" and game starts
- [ ] Test with second browser window
- [ ] Verify you see other player as Minecraft character

## Share Your Game (Optional)
- [ ] Upload to GitHub Pages, Netlify, or similar
- [ ] Share URL with friends
- [ ] Everyone can play together!

---

## Important URLs

**Your Server**: `https://YOUR-SERVICE.onrender.com` (replace with actual URL)

**Render Dashboard**: https://dashboard.render.com

**GitHub Repo**: `https://github.com/YOUR_USERNAME/zahicraft-multiplayer`

---

## Quick Commands

```bash
# Update server after changes
git add .
git commit -m "Your update message"
git push

# Render will auto-deploy!
```

---

## Troubleshooting

❌ **"Failed to connect"** → Wait 30 seconds (server waking up)

❌ **"Lobby not found"** → Create new lobby (server restarted)

❌ **Players not appearing** → Check both in same lobby name

---

**Need help?** See `RENDER_DEPLOYMENT_GUIDE.md` for detailed instructions!
