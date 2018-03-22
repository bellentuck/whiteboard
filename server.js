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

io.on('connection', function (socket) {
    /* This function receives the newly connected socket.
       This function will be called for EACH browser that connects to our server. */
    console.log('A new client has connected!');
    console.log(socket.id);
    socket.on('disconnect', () => {
        console.log('disconnected from client');
    });
    socket.on('draw', (payload) => {
        socket.broadcast.emit('updateDrawing', payload);
    });
});


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
