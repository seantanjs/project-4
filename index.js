const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./db');


var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// ===================================================
// ROUTES
// ===================================================

// Import routes to match incoming requests
require('./routes')(app, db);

// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {
  response.send('home');
});

// Catch all unmatched requests and return 404 not found page
app.get('*', (request, response) => {
  response.send('Page not found');
});

app.get('/chat', function(request, response) {
    response.render('chat');
});

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    socket.on('disconnect', function(data) {

        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });

    socket.on('send message', function(data) {
        io.sockets.emit('new message', {msg: data, user: socket.username});
    });

    socket.on('new user', function(data, callback) {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });

    function updateUsernames() {
        io.sockets.emit('get users', users);
    }
});

// const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

server.listen(PORT, () => console.log('Server running la...'));