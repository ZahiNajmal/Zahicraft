# ZahiCraft Multiplayer Setup Guide

## Overview

ZahiCraft now supports real-time multiplayer! Players can create private lobbies or join the quick-play lobby to play with others. Other players appear as Minecraft-style characters with name tags.

## Quick Start

### 1. Install Dependencies

First, install the required Node.js packages:

```bash
cd Zahicraft
npm install
```

### 2. Start the Server

Run the multiplayer server:

```bash
npm start
```

The server will start on port 3000 by default. You should see:
```
ZahiCraft multiplayer server running on port 3000
Server ready for connections!
```

### 3. Play the Game

1. Open `index.html` in your browser (or use a local web server)
2. Click "Multiplayer" on the main menu
3. Choose one of the options:
   - **Create Lobby**: Enter a custom lobby name to create a private lobby
   - **Join Lobby**: Enter an existing lobby name to join it
   - **Quick Play**: Instantly join the public lobby with other players

## Deployment Options

### Option 1: Local Testing

For testing with friends on the same network:

1. Run the server on your machine
2. Find your local IP address (e.g., `192.168.1.100`)
3. Update `SERVER_URL` in `index.html` (line ~495):
   ```javascript
   const SERVER_URL = 'http://192.168.1.100:3000';
   ```
4. Share your IP with friends so they can connect

### Option 2: Deploy to Render (Recommended)

[Render](https://render.com) offers free hosting for Node.js apps:

1. Create a free account on Render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository (or upload files)
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Deploy and copy your server URL (e.g., `https://zahicraft.onrender.com`)
6. Update `SERVER_URL` in `index.html`:
   ```javascript
   const SERVER_URL = 'https://zahicraft.onrender.com';
   ```

### Option 3: Deploy to Glitch

[Glitch](https://glitch.com) provides instant, free hosting:

1. Go to glitch.com and create a new project
2. Upload `server.js` and `package.json`
3. Glitch will auto-install dependencies and start the server
4. Copy your project URL (e.g., `https://your-project.glitch.me`)
5. Update `SERVER_URL` in `index.html`

### Option 4: Deploy to Railway

[Railway](https://railway.app) offers easy deployment with GitHub integration:

1. Sign up at railway.app
2. Create a new project from GitHub
3. Railway will auto-detect Node.js and deploy
4. Copy the generated URL
5. Update `SERVER_URL` in `index.html`

## Features

### Multiplayer Gameplay

- **Real-time synchronization**: See other players move in real-time
- **Block synchronization**: Blocks placed/removed by any player are instantly visible to all
- **Minecraft-style players**: Other players appear as colored block characters
- **Name tags**: Each player has a floating name tag above their head
- **Smooth animations**: Walking animations and smooth position interpolation

### Lobby System

- **Private lobbies**: Create custom lobbies with unique names
- **Quick Play**: Join the public lobby instantly
- **Persistent lobbies**: Lobbies stay active as long as players are connected
- **Auto-cleanup**: Empty private lobbies are automatically deleted

## Troubleshooting

### "Failed to connect. Is the server running?"

- Make sure the server is running (`npm start`)
- Check that the `SERVER_URL` in `index.html` matches your server address
- Verify your firewall isn't blocking the connection

### Players not appearing

- Check the browser console for errors (F12)
- Ensure all players are in the same lobby
- Try refreshing the page

### Blocks not synchronizing

- Verify the server is receiving events (check server console logs)
- Make sure you're connected to the lobby (check browser console)

## Technical Details

### Network Protocol

The game uses Socket.IO for WebSocket communication:

- **Position updates**: Sent 20 times per second
- **Block changes**: Sent immediately when placed/removed
- **Player events**: Join/leave notifications

### Server Architecture

- **Express**: Web server
- **Socket.IO**: WebSocket library for real-time communication
- **Lobby system**: In-memory storage (resets on server restart)

### Client Architecture

- **PlayerEntity class**: Renders Minecraft-style player models
- **Position interpolation**: Smooth movement between network updates
- **Event-driven**: Reacts to server events for synchronization

## Future Enhancements

Potential improvements for the multiplayer system:

- Persistent world storage (database)
- Player authentication
- Chat system
- More player customization options
- Voice chat integration
- Server-side world generation for consistency

## Support

For issues or questions, contact: zahi.najmal.14@gmail.com
