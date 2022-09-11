const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const responseStatus = require('./utilities/constants/ResponseStatus');
const clientErrors = require('./utilities/errors/ClientError');
const fns = require('./controllers/MatchingController');

function wait_for(promise) {
    let ret, done;
    if (typeof promise === 'object' && promise !== null && 'then' in promise) {
        promise.then(r => {ret = r, done = true});
    }
    while (!done) {}
    return ret;
};

const PORT = 3000; 
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

const io = require('socket.io')(server, {cors: {origin: "*"}})

io.on('connection', function (socket) {
    console.log("User connected: " + socket.id);
    io.emit('connectionSuccess', "welcome to the backend");

    socket.on('checkHealth', () => {
        console.log('Health is ok')
        socket.emit('healthStatus', fns.serviceHealthCheck())
    });

    //listens to 'findMatch' event, emits 'matchSuccess' or 'matchFailed' event
    socket.on('findMatch', async (data) => { 
                console.log(data.email)
                console.log(data.difficulty)
                console.log('Finding match now..')
                var res;
                
                //var res = await searchMatch(data.email, data.difficulty);
                try {
                    res = await fns.searchMatch(socket, io, data.email, data.difficulty);
                } catch(error) {
                    console.error('server err', error);
                }

                // exists = await new Promise(resolve => socket.emit('check', name, data => resolve(data.result)))
                //if found match
                //socket.emit('matchSuccess', res);

                //else time out
                //socket.emit('matchFailed', "Failed to match");
            }
    ); 

    // When a client disconnects (leaves room)
    socket.on('disconnect', (data) => {
        console.log("Disconnected");
        var data = JSON.parse(data);
        console.log(data.email)
        fns.endInterview(data.email);
    })
});
