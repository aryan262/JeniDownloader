const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const http = require('http');
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server,{
    cors: {
        origin: '*',
        credentials: true
    }
})

const routes = require('../routes/routes')

const corsOption = {
    origin: '*',
    credentials: true
}

app.use(cors(corsOption))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', routes)

app.set('io', io);

io.on('connection', (socket) => {

    console.log('a user connected',socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected',socket.id);
    });

    socket.on('message', (msg) => {
        io.emit('message', msg);
    });
});


const PORT = 4000 || process.env.PORT
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
