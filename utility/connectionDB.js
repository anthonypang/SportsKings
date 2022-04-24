var Connection = require('../model/connection')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sportskings', { useNewUrlParser: true, useUnifiedTopology: true });

var connectionSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    topic: String,
    details: String,
    creator: String,
    date: String,
    time: String,
    location: String
}, { collection: 'connections' });


var connection = mongoose.model('connection', connectionSchema);


class ConnectionDB {
    constructor() { }

    getConnections() {
        console.log('getting all connections')
        let connectionDatabase = connection.find().then((doc) => {
            let dbconnections = [];
            doc.forEach((connection) => {
                let connectionItem = new Connection();

                connectionItem.setId(connection.id);
                connectionItem.setName(connection.name);
                connectionItem.setTopic(connection.topic);
                connectionItem.setDetails(connection.details);
                connectionItem.setCreator(connection.creator);
                connectionItem.setDate(connection.date);
                connectionItem.setTime(connection.time);
                connectionItem.setLocation(connection.location);

                dbconnections.push(connectionItem);
            });

            return dbconnections
        });
        console.log(connectionDatabase)
        return connectionDatabase
    }

    getConnection(id) {
        console.log('getting one connection')
        let oneConnection = connection.findOne({ id: id }).then((doc) => {

            let connectionItem = new Connection();

            connectionItem.setId(doc.id);
            connectionItem.setName(doc.name);
            connectionItem.setTopic(doc.topic);
            connectionItem.setDetails(doc.details);
            connectionItem.setCreator(doc.creator);
            connectionItem.setDate(doc.date);
            connectionItem.setTime(doc.time);
            connectionItem.setLocation(doc.location);

            return connectionItem
        })
        console.log(oneConnection)
        return oneConnection
    }

    getTopics() {
        let topics = connection.find().then((doc) => {
            let dbTopics = [];
            doc.forEach((connection) => {
                if (!dbTopics.includes(connection.topic)) {
                    dbTopics.push(connection.topic);
                }
            });
            return dbTopics
        });
        console.log(topics)
        return topics
    }

    addConnection(name, topic, details, creator, date, time, location) {
        connection.findOne().sort('-id').exec((err, doc) => {
            let connectionModel = new connection({
                id: doc.id + 1,
                name: name,
                topic: topic,
                details: details,
                creator: creator,
                date: date,
                time: time,
                location: location
            })

            connectionModel.save().then((doc) => {
                let newConnection = new Connection()

                newConnection.setId(doc.id);
                newConnection.setName(doc.name);
                newConnection.setTopic(doc.topic);
                newConnection.setDetails(doc.details);
                newConnection.setCreator(doc.creator);
                newConnection.setDate(doc.date);
                newConnection.setTime(doc.time);
                newConnection.setLocation(doc.location);
            })
        })
    }

}
module.exports = ConnectionDB;