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



io.on('connection', (socket) => {

    console.log(`A user connected ${socket.id}`);


    socket.on("userConnected", ({ username }) => {
        socket.username = username;
        console.log(socket.username);
        socket.broadcast.emit("userConnected", { username: username, timestamp: new Date().toISOString() });
    });

    socket.on("message", message => {
        if (!socket.username) {
            return;
        }
        const res = {
            ...message,
            timestamp: new Date().toISOString()
        };
        socket.emit("message", res);
    });

    socket.on("disconnect", (reason) => {
        if (socket.username) {
            socket.emit("userDisconnected", { username: socket.username });
        }
    });
})


io.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})