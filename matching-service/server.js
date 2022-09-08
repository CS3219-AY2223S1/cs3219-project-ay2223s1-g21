const express = require('express');
const socket = require('socket.io')
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const responseStatus = require('./utilities/constants/ResponseStatus');
const clientErrors = require('./utilities/errors/ClientError');
const { serviceHealthCheck } = require('./controllers/MatchingController');
const { searchMatch } = require('./controllers/MatchingController');
const { response } = require('express');

const PORT = 3000 || process.env.PORT; 
app.use(cors()) 
app.options('*', cors())

const server = app.listen(PORT, function () {
    try {
        mongoose.connect('mongodb://localhost:27017/match-mongodb');
        console.log('Connected to MongoDB');
        console.log(`Match microservice listening on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    } catch (err) {
        console.log(err)
    }
});

const io = socket(server); // Socket.io server instance



io.on('connection', function (socket) {
    console.log("User connected: " + socket.id);
    io.emit('message', "welcome to the backend")

    socket.on('checkHealth', () => {
        socket.emit('healthStatus', serviceHealthCheck())
    })

    //listens to 'findMatch' event, emits 'matchSuccess' or 'matchFailed' event
    socket.on('findMatch', async (data, callback) => { 
        var data = JSON.parse(data);
        console.log(data.email)
        console.log(data.difficulty)
        console.log('Finding match now..')
        
        var res = await searchMatch(data.email, data.difficulty);

        
        //if found match
        socket.emit('matchSuccess', res);

        //else time out
        socket.emit('matchFailed', "Failed to match");
    }); 

    // When a client disconnects (leaves room)
    socket.on('disconnect', () => {
        
    })
});

app.use('/api/matching', routes);

app.use((req, res) => {
    res.status(404).json({
        status: responseStatus.FAILED,
        data: {
            message: clientErrors.INVALID_API_ENDPOINT
        }
    });

});

module.exports = app;