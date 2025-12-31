const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// Lobby storage: { lobbyName: { players: {}, worldSeed: number, blocks: [] } }
const lobbies = {};

// Create default quickplay lobby
lobbies['quickplay'] = {
    players: {},
    worldSeed: Math.floor(Math.random() * 1000000),
    blocks: []
};

app.use(cors());
app.use(express.static('.')); // Serve static files from current directory

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);

    let currentLobby = null;
    let playerName = `Player${Math.floor(Math.random() * 1000)}`;

    // Create a new lobby
    socket.on('create-lobby', (data) => {
        const { lobbyName } = data;

        if (!lobbyName || lobbyName.trim() === '') {
            socket.emit('error', { message: 'Lobby name cannot be empty' });
            return;
        }

        if (lobbies[lobbyName]) {
            socket.emit('error', { message: 'Lobby already exists' });
            return;
        }

        // Create new lobby
        const worldSeed = Math.floor(Math.random() * 1000000);
        lobbies[lobbyName] = {
            players: {},
            worldSeed: worldSeed,
            blocks: []
        };

        currentLobby = lobbyName;
        lobbies[lobbyName].players[socket.id] = {
            id: socket.id,
            name: playerName,
            position: { x: 0, y: 20, z: 0 },
            rotation: { x: 0, y: 0 }
        };

        socket.join(lobbyName);

        console.log(`Lobby created: ${lobbyName} by ${socket.id}`);

        socket.emit('lobby-created', {
            lobbyName: lobbyName,
            worldSeed: worldSeed,
            players: lobbies[lobbyName].players,
            blocks: lobbies[lobbyName].blocks
        });
    });

    // Join existing lobby
    socket.on('join-lobby', (data) => {
        let { lobbyName } = data;

        // Empty or null means quickplay
        if (!lobbyName || lobbyName.trim() === '') {
            lobbyName = 'quickplay';
        }

        if (!lobbies[lobbyName]) {
            socket.emit('error', { message: 'Lobby not found' });
            return;
        }

        currentLobby = lobbyName;
        lobbies[lobbyName].players[socket.id] = {
            id: socket.id,
            name: playerName,
            position: { x: 0, y: 20, z: 0 },
            rotation: { x: 0, y: 0 }
        };

        socket.join(lobbyName);

        console.log(`Player ${socket.id} joined lobby: ${lobbyName}`);

        // Send lobby info to joining player
        socket.emit('lobby-joined', {
            lobbyName: lobbyName,
            worldSeed: lobbies[lobbyName].worldSeed,
            players: lobbies[lobbyName].players,
            blocks: lobbies[lobbyName].blocks
        });

        // Notify other players
        socket.to(lobbyName).emit('player-joined', {
            playerId: socket.id,
            playerName: playerName,
            position: { x: 0, y: 20, z: 0 },
            rotation: { x: 0, y: 0 }
        });
    });

    // Update player position
    socket.on('update-position', (data) => {
        if (!currentLobby || !lobbies[currentLobby]) return;

        const { x, y, z, rotX, rotY } = data;

        if (lobbies[currentLobby].players[socket.id]) {
            lobbies[currentLobby].players[socket.id].position = { x, y, z };
            lobbies[currentLobby].players[socket.id].rotation = { x: rotX, y: rotY };
        }

        // Broadcast to other players in lobby
        socket.to(currentLobby).emit('player-moved', {
            playerId: socket.id,
            position: { x, y, z },
            rotation: { x: rotX, y: rotY }
        });
    });

    // Place block
    socket.on('place-block', (data) => {
        if (!currentLobby || !lobbies[currentLobby]) return;

        const { x, y, z, type } = data;

        // Add to lobby's block history
        lobbies[currentLobby].blocks.push({ x, y, z, type, action: 'place' });

        // Broadcast to all players in lobby (including sender for confirmation)
        io.to(currentLobby).emit('block-placed', { x, y, z, type });
    });

    // Remove block
    socket.on('remove-block', (data) => {
        if (!currentLobby || !lobbies[currentLobby]) return;

        const { x, y, z } = data;

        // Add to lobby's block history
        lobbies[currentLobby].blocks.push({ x, y, z, action: 'remove' });

        // Broadcast to all players in lobby (including sender for confirmation)
        io.to(currentLobby).emit('block-removed', { x, y, z });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`);

        if (currentLobby && lobbies[currentLobby]) {
            delete lobbies[currentLobby].players[socket.id];

            // Notify other players
            socket.to(currentLobby).emit('player-left', {
                playerId: socket.id
            });

            // Clean up empty lobbies (except quickplay)
            if (currentLobby !== 'quickplay' && Object.keys(lobbies[currentLobby].players).length === 0) {
                delete lobbies[currentLobby];
                console.log(`Lobby deleted: ${currentLobby}`);
            }
        }
    });
});

server.listen(PORT, () => {
    console.log(`ZahiCraft multiplayer server running on port ${PORT}`);
    console.log(`Server ready for connections!`);
});
