const path = require('path');
const express = require('express');
const app = express();
const socketio = require('socket.io');

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
const server = app.listen(1337, function () {
    console.log(`Listening on http://localhost:${server.address().port}`);
});

let io = socketio(server);

const inMemoryDrawHistory = [];

io.on('connection', function (socket) {
    /* This function receives the newly connected socket.
       This function will be called for EACH browser that connects to our server. */
    console.log('A new client has connected!');
    console.log(socket.id);

    if (inMemoryDrawHistory.length) {
        console.log('loading', inMemoryDrawHistory);
        socket.emit('load', inMemoryDrawHistory);
    }

    socket.on('draw', (...payload) => {
        [ start, end, color ] = payload;
        inMemoryDrawHistory.push({start, end, color});
        //socket.broadcast.emit('updateDrawing', payload);
        socket.broadcast.emit('draw', ...payload);
    });

    socket.on('disconnect', () => {
        console.log('disconnected from client');
    });
});

io.on('disconnect', () => {
   console.log('game over for now');
});

// ensures no partial compilaiton
//app.use(require('./webpack-middleware'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
