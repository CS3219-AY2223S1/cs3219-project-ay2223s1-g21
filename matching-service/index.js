const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const routes = require('./routes');
const responseStatus = require('./utilities/constants/ResponseStatus');
const clientErrors = require('./utilities/errors/ClientError');

var port = 3000;

app.listen(port, async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/match-mongodb');
        console.log('Connected to MongoDB');
        console.log(`Match microservice listening on port ${port}`);
    } catch (err) {
        console.log(err)
    }
});

app.use(cors()) 
app.options('*', cors())

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