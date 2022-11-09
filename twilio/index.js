const accountSid = 'AC310d39b93ddbb9cacd04c5192e1724f9';
const authToken = '6ff7ec8a6d2529466ee3d19ad733cfb5';
const client = require('twilio')(accountSid, authToken);

client.tokens.create({ttl: 3600}).then(token => console.log(token));
client.usage.records.lastMonth
            .list({limit: 20}).then(console.log)
           