# Complete Render Deployment Guide for ZahiCraft Multiplayer

This guide will walk you through deploying your ZahiCraft multiplayer server to Render.com, step by step.

## Prerequisites

- A GitHub account (free)
- A Render account (free - we'll create this)
- Your ZahiCraft project files

---

## Step 1: Prepare Your Project for Deployment

### 1.1 Verify Required Files

Make sure you have these files in your `Zahicraft` folder:
- ✅ `server.js` - Your multiplayer server
- ✅ `package.json` - Dependencies configuration
- ✅ `.gitignore` - Excludes node_modules from Git

### 1.2 Create a GitHub Repository

1. **Go to GitHub**: Open https://github.com in your browser
2. **Sign in** to your GitHub account (or create one if needed)
3. **Create new repository**:
   - Click the **"+"** icon in the top right
   - Select **"New repository"**
   - Repository name: `zahicraft-multiplayer` (or any name you prefer)
   - Description: "Multiplayer server for ZahiCraft game"
   - Select **Public** (required for free Render deployment)
   - **DO NOT** check "Add a README file"
   - Click **"Create repository"**

### 1.3 Push Your Code to GitHub

Open a terminal in your `Zahicraft` folder and run these commands:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial commit - ZahiCraft multiplayer server"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/zahicraft-multiplayer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note**: If you already have a Git repository, just commit and push:
```bash
git add .
git commit -m "Add multiplayer server"
git push
```

---

## Step 2: Create a Render Account

1. **Go to Render**: Open https://render.com in your browser
2. **Sign up**:
   - Click **"Get Started"** or **"Sign Up"**
   - Choose **"Sign up with GitHub"** (recommended - easier integration)
   - Authorize Render to access your GitHub account
   - Complete the signup process

---

## Step 3: Deploy Your Server on Render

### 3.1 Create a New Web Service

1. **From Render Dashboard**:
   - Click **"New +"** button in the top right
   - Select **"Web Service"**

### 3.2 Connect Your GitHub Repository

1. **Connect Repository**:
   - You'll see a list of your GitHub repositories
   - Find `zahicraft-multiplayer` (or whatever you named it)
   - Click **"Connect"**
   
   **If you don't see your repository**:
   - Click **"Configure account"** 
   - Grant Render access to your repositories
   - Return and refresh the page

### 3.3 Configure Your Web Service

Fill in the following settings:

**Basic Settings**:
- **Name**: `zahicraft-server` (or any name you prefer)
  - This will be part of your URL: `zahicraft-server.onrender.com`
- **Region**: Choose the closest to you (e.g., "Oregon (US West)" or "Frankfurt (EU)")
- **Branch**: `main` (should be auto-selected)
- **Root Directory**: Leave blank (or enter `.` if required)
- **Runtime**: **Node** (should be auto-detected)

**Build & Deploy Settings**:
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type**:
- Select **"Free"** (this is perfect for your game server)
  - Note: Free instances spin down after 15 minutes of inactivity
  - They automatically wake up when someone connects (takes ~30 seconds)

**Advanced Settings** (scroll down):
- **Auto-Deploy**: Keep **"Yes"** enabled
  - This means every time you push to GitHub, Render will automatically redeploy

### 3.4 Create the Web Service

1. Scroll to the bottom
2. Click **"Create Web Service"**
3. Render will now:
   - Clone your repository
   - Run `npm install`
   - Start your server with `npm start`

### 3.5 Wait for Deployment

- You'll see a deployment log showing the progress
- Wait for the status to change to **"Live"** (usually takes 2-3 minutes)
- Look for these messages in the log:
  ```
  ==> Building...
  ==> Running 'npm install'
  ==> Starting service with 'npm start'
  ZahiCraft multiplayer server running on port 3000
  Server ready for connections!
  ```

---

## Step 4: Get Your Server URL

1. **Find Your URL**:
   - At the top of the page, you'll see your service URL
   - It will look like: `https://zahicraft-server.onrender.com`
   - **Copy this URL** - you'll need it for the next step

2. **Test Your Server** (optional):
   - Click on the URL to open it in a browser
   - You might see a "Cannot GET /" message - **this is normal!**
   - Your server is running, it just doesn't have a homepage
   - The WebSocket connections will work fine

---

## Step 5: Update Your Game Client

Now you need to tell your game where to find the server:

### 5.1 Open index.html

1. Open `c:\Users\user\Desktop\Zahicraft\index.html` in your code editor
2. Find line **~495** (search for `SERVER_URL`)
3. You'll see:
   ```javascript
   const SERVER_URL = 'http://localhost:3000';
   ```

### 5.2 Update the Server URL

Replace it with your Render URL:
```javascript
const SERVER_URL = 'https://zahicraft-server.onrender.com';
```

**Important**: 
- Use `https://` (not `http://`)
- Don't add `/` at the end
- Replace `zahicraft-server` with your actual service name

### 5.3 Save the File

Save `index.html` after making this change.

---

## Step 6: Test Your Multiplayer Game

### 6.1 Open the Game

1. Open `index.html` in your browser
2. Click **"Multiplayer"**
3. Click **"Quick Play"**

### 6.2 What to Expect

**First Connection (Cold Start)**:
- If the server was sleeping, it will take **20-30 seconds** to wake up
- You'll see "Connecting to server..." during this time
- **This is normal for free Render instances!**
- After the first connection, it stays awake for 15 minutes

**Successful Connection**:
- Status will change to "Connected!"
- Loading screen will appear
- Game will start

### 6.3 Test with Multiple Players

**Option 1: Multiple Browser Windows**
1. Open the game in two different browser windows
2. Both click "Quick Play"
3. You should see each other as Minecraft-style characters!

**Option 2: Share with Friends**
1. Upload your `index.html` to a web host (GitHub Pages, Netlify, etc.)
2. Share the link with friends
3. Everyone joins the same lobby

---

## Step 7: Share Your Game

### Option A: GitHub Pages (Recommended)

1. **Create gh-pages branch**:
   ```bash
   git checkout -b gh-pages
   git push origin gh-pages
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Source: Select `gh-pages` branch
   - Click **Save**

3. **Your game URL**:
   - Will be: `https://YOUR_USERNAME.github.io/zahicraft-multiplayer/`
   - Share this with friends!

### Option B: Netlify Drop

1. Go to https://app.netlify.com/drop
2. Drag your `Zahicraft` folder onto the page
3. Get instant URL to share

---

## Troubleshooting

### "Failed to connect. Is the server running?"

**Cause**: Server is waking up from sleep (free tier)
**Solution**: Wait 30 seconds and try again

### "Lobby not found"

**Cause**: Server restarted (lobbies are in-memory)
**Solution**: Create a new lobby

### Players not appearing

**Check**:
1. Both players are in the same lobby name
2. Browser console for errors (F12)
3. Server logs on Render dashboard

### Server keeps sleeping

**Free Tier Limitation**: 
- Free instances sleep after 15 minutes of inactivity
- Upgrade to paid tier ($7/month) for always-on server

---

## Monitoring Your Server

### View Logs

1. Go to Render Dashboard
2. Click on your service
3. Click **"Logs"** tab
4. See real-time server activity:
   - Player connections
   - Lobby creations
   - Errors (if any)

### Check Status

- **Live** = Server is running
- **Building** = Deploying new version
- **Failed** = Check logs for errors

---

## Updating Your Server

Whenever you make changes to `server.js`:

```bash
# Commit changes
git add server.js
git commit -m "Update server"

# Push to GitHub
git push

# Render will automatically redeploy!
```

---

## Cost Breakdown

### Free Tier (What You're Using)
- ✅ 750 hours/month of server time
- ✅ Automatic HTTPS
- ✅ Automatic deployments
- ⚠️ Sleeps after 15 min inactivity
- ⚠️ 30 second cold start

### Paid Tier ($7/month)
- ✅ Always-on (no sleeping)
- ✅ Instant connections
- ✅ More resources
- ✅ Better for active games

---

## Quick Reference

### Your URLs
- **Server URL**: `https://zahicraft-server.onrender.com` (replace with yours)
- **Render Dashboard**: https://dashboard.render.com
- **GitHub Repo**: `https://github.com/YOUR_USERNAME/zahicraft-multiplayer`

### Important Commands
```bash
# Update server
git add .
git commit -m "Update message"
git push

# View local server logs
npm start

# Install dependencies
npm install
```

---

## Next Steps

1. ✅ Share your game URL with friends
2. ✅ Test multiplayer with multiple players
3. ✅ Monitor server logs for issues
4. 💡 Consider upgrading to paid tier if you get popular
5. 💡 Add more features (chat, player skins, etc.)

---

## Support

- **Render Docs**: https://render.com/docs
- **Socket.IO Docs**: https://socket.io/docs/
- **Your Email**: zahi.najmal.14@gmail.com

---

**Congratulations! Your ZahiCraft multiplayer server is now live! 🎮🚀**
