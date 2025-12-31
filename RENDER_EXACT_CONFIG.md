# 🎯 EXACT Render Configuration Guide - Every Single Detail

This guide shows you **EXACTLY** what to click, what to type, and what to select in Render. Follow this step-by-step.

---

## ⚠️ CRITICAL: Service Type Selection

### ❌ **NOT a Static Site**
Do **NOT** choose "Static Site" - this won't work for your server!

### ✅ **YES - Web Service**
You **MUST** choose **"Web Service"** because:
- Your server runs Node.js code
- It needs to stay running to handle connections
- It uses WebSockets (Socket.IO)
- Static sites only serve HTML files - they can't run servers

---

## 📋 Complete Render Configuration

### Step 1: Create New Service

1. **Log into Render Dashboard**: https://dashboard.render.com
2. **Click the "New +" button** (top right corner)
3. **Select "Web Service"** from the dropdown
   - ❌ NOT "Static Site"
   - ❌ NOT "Private Service"
   - ❌ NOT "Background Worker"
   - ✅ **YES "Web Service"**

---

### Step 2: Connect Repository

You'll see a screen titled **"Create a new Web Service"**

**Option A: If you see your repository**
- Find `zahicraft-multiplayer` (or your repo name)
- Click **"Connect"** button next to it

**Option B: If you don't see your repository**
- Click **"+ Connect account"** or **"Configure account"**
- Select **GitHub**
- Authorize Render to access your repositories
- Select which repositories to grant access (select your repo)
- Click **"Install"** or **"Save"**
- Return to Render and refresh - you should now see your repo
- Click **"Connect"**

---

### Step 3: Configure Your Web Service

Now you'll see a **long configuration form**. Here's EXACTLY what to enter in each field:

---

#### 🔷 **Section 1: Basic Information**

**Name** (Required)
- **What to enter**: `zahicraft-server` (or any name you want)
- **What it does**: This becomes part of your URL
- **Example**: If you enter `zahicraft-server`, your URL will be `https://zahicraft-server.onrender.com`
- **Rules**: 
  - Lowercase letters, numbers, hyphens only
  - No spaces
  - Must be unique across all Render

**Region** (Required)
- **What to select**: Choose the closest region to you
- **Options**:
  - `Oregon (US West)` - West Coast USA
  - `Ohio (US East)` - East Coast USA
  - `Frankfurt (EU Central)` - Europe
  - `Singapore` - Asia
- **Recommendation**: Choose closest to where most players will be
- **Default**: Oregon (US West)

**Branch** (Required)
- **What to enter**: `main`
- **What it does**: Which Git branch to deploy
- **Note**: Should be auto-filled with `main`
- **Don't change unless**: You're using a different branch name

**Root Directory** (Optional)
- **What to enter**: Leave **BLANK** (empty)
- **Why**: Your server files are in the root of your repository
- **Only fill if**: Your server.js is in a subdirectory (it's not)

---

#### 🔷 **Section 2: Build & Deploy**

**Runtime** (Auto-detected)
- **Should show**: `Node`
- **If it shows something else**: 
  - Click the dropdown
  - Select **"Node"**
- **Why**: Your server is written in Node.js

**Build Command** (Required)
- **EXACTLY type**: `npm install`
- **Copy this**: `npm install`
- **What it does**: Installs your dependencies (express, socket.io, cors)
- **Case sensitive**: Use lowercase
- **Don't add anything else**: Just `npm install`

**Start Command** (Required)
- **EXACTLY type**: `npm start`
- **Copy this**: `npm start`
- **What it does**: Runs your server using the script in package.json
- **Alternative**: You could use `node server.js` but `npm start` is better
- **Don't change**: Use exactly `npm start`

---

#### 🔷 **Section 3: Instance Type**

**Plan** (Required)
- **Select**: `Free`
- **Options you'll see**:
  - ✅ **Free** - $0/month
    - 750 hours/month
    - Sleeps after 15 min inactivity
    - 512 MB RAM
    - 0.1 CPU
    - **Choose this one!**
  - Starter - $7/month
    - Always on
    - 512 MB RAM
    - 0.5 CPU
  - Standard - $25/month
    - More resources
- **Recommendation**: Start with Free, upgrade later if needed

---

#### 🔷 **Section 4: Advanced Settings** (Expand this section)

Click **"Advanced"** to expand these options:

**Auto-Deploy**
- **Select**: `Yes` (should be default)
- **What it does**: Automatically redeploys when you push to GitHub
- **Keep it**: Yes

**Environment Variables** (Optional)
- **What to enter**: Leave **EMPTY** (you don't need any)
- **Why**: Your server doesn't use environment variables yet
- **Don't add**: PORT (Render sets this automatically)

**Docker Command** (Optional)
- **What to enter**: Leave **EMPTY**
- **Why**: You're not using Docker

**Pre-Deploy Command** (Optional)
- **What to enter**: Leave **EMPTY**
- **Why**: You don't need any pre-deploy steps

**Health Check Path** (Optional)
- **What to enter**: Leave **EMPTY** or enter `/`
- **Why**: Your server doesn't have a health endpoint (it's okay)

---

#### 🔷 **Section 5: Final Settings**

**Add Environment Variable** (Button)
- **Don't click this**: You don't need environment variables

**Add Secret File** (Button)
- **Don't click this**: You don't need secret files

---

### Step 4: Create the Service

**At the bottom of the page:**

1. **Review your settings** - Make sure:
   - ✅ Name is set
   - ✅ Build Command: `npm install`
   - ✅ Start Command: `npm start`
   - ✅ Instance Type: Free

2. **Click the big blue button**: **"Create Web Service"**

---

## 📊 What Happens Next

### Deployment Process (2-3 minutes)

You'll see a **deployment log** with these stages:

**Stage 1: Building** (30 seconds)
```
==> Cloning from https://github.com/YOUR_USERNAME/zahicraft-multiplayer...
==> Checking out commit abc123...
==> Running build command 'npm install'...
```

**Stage 2: Installing Dependencies** (1 minute)
```
npm notice created a lockfile as package-lock.json
added 89 packages from 123 contributors
```

**Stage 3: Starting Service** (30 seconds)
```
==> Starting service with 'npm start'...
> zahicraft-server@1.0.0 start
> node server.js

ZahiCraft multiplayer server running on port 3000
Server ready for connections!
```

**Stage 4: Live!** ✅
```
==> Your service is live 🎉
https://zahicraft-server.onrender.com
```

---

## 🎯 Your Server URL

**At the top of the page**, you'll see:

```
https://zahicraft-server.onrender.com
```

**This is your server URL!**

- **Copy this URL** - you'll need it
- **Format**: `https://YOUR-SERVICE-NAME.onrender.com`
- **Always HTTPS**: Never HTTP
- **No trailing slash**: Don't add `/` at the end

---

## ✅ Verification Checklist

After deployment, verify these:

- [ ] Status shows **"Live"** (green dot)
- [ ] Logs show "Server ready for connections!"
- [ ] URL is visible at the top
- [ ] No error messages in logs

---

## 🔧 If Something Goes Wrong

### ❌ Build Failed

**Error**: `npm install failed`

**Check**:
1. Build Command is exactly: `npm install`
2. Your package.json is in the repository root
3. package.json has valid JSON syntax

**Fix**: Check logs for specific error

---

### ❌ Start Failed

**Error**: `npm start failed`

**Check**:
1. Start Command is exactly: `npm start`
2. Your server.js is in the repository root
3. package.json has `"start": "node server.js"` in scripts

**Fix**: Check logs for specific error

---

### ❌ Service Keeps Restarting

**Error**: Service starts then crashes

**Check**:
1. Logs for error messages
2. server.js has no syntax errors
3. All dependencies are in package.json

**Fix**: Look at crash logs for details

---

## 📝 Complete Configuration Summary

Here's a **copy-paste ready** summary of all settings:

```
Service Type: Web Service
Name: zahicraft-server
Region: Oregon (US West)
Branch: main
Root Directory: [EMPTY]
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
Auto-Deploy: Yes
Environment Variables: [NONE]
```

---

## 🔄 After Deployment: Update Your Game

**File**: `c:\Users\user\Desktop\Zahicraft\index.html`

**Find line ~495**:
```javascript
const SERVER_URL = 'http://localhost:3000';
```

**Replace with** (use YOUR actual URL):
```javascript
const SERVER_URL = 'https://zahicraft-server.onrender.com';
```

**Important**:
- ✅ Use `https://` (not `http://`)
- ✅ Use your actual service name
- ✅ No trailing slash
- ✅ Save the file

---

## 🎮 Testing

1. **Open** `index.html` in browser
2. **Click** "Multiplayer"
3. **Click** "Quick Play"
4. **Wait** 30 seconds (first connection - server waking up)
5. **Should see** "Connected!" and game starts

---

## 📸 Visual Reference

**What you'll see in Render:**

1. **Service Type Selection**:
   - Big buttons for different service types
   - Click "Web Service" (has a server icon)

2. **Repository Connection**:
   - List of your GitHub repos
   - "Connect" button next to each

3. **Configuration Form**:
   - Long form with many fields
   - Most important: Name, Build Command, Start Command

4. **Deployment Logs**:
   - Black terminal-style window
   - Green text for success
   - Red text for errors

5. **Live Service**:
   - Green "Live" badge
   - Your URL at the top
   - Logs tab, Metrics tab, Settings tab

---

## ✨ You're Done!

Your server is now:
- ✅ Deployed to Render
- ✅ Accessible worldwide
- ✅ Running 24/7 (wakes on connection)
- ✅ Auto-deploys on Git push
- ✅ Has HTTPS enabled
- ✅ Ready for multiplayer!

**Your URL**: `https://your-service-name.onrender.com`

**Share with friends and play! 🎮**
