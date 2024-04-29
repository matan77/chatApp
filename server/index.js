const express = require('express');
const http = require('http');
const Socket = require('socket.io');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const io = Socket(server, {
    cors: {
        origin: "*"
    }
});

const getTime = () => {
    const curr = new Date();
    const hours = curr.getHours().toString().padStart(2, '0');
    const minutes = curr.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

io.on('connection', (socket) => {

    socket.on("userConnected", ({ username }) => {
        socket.username = username;

        socket.broadcast.emit("userConnected", { username, timestamp: getTime() });
    });

    socket.on("message", message => {
        if (!socket.username) {
            return;
        }
        const res = {
            username: socket.username,
            ...message,
            timestamp: getTime()
        };
        io.sockets.emit("message", res);
    });

    socket.on("disconnect", (reason) => {
        if (socket.username) {
            socket.broadcast.emit("userDisconnected", { username: socket.username, timestamp: getTime() });
        }
    });
})


io.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})