const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.send('index.html');
})

let msg = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)

    socket.emit('msgAnterios', msg);

    socket.on('sendMsg', data => {
        msg.push(data);
        socket.broadcast.emit('valorRecebido', data);
    })
})

server.listen(8080)