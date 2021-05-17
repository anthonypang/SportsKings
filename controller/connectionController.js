var express = require('express');
const Connection = require('../model/connection');
const ConnectionDB = require('../utility/connectionDB');

var router = express.Router();

router.get('/', async function(req,res){
    let connectionId = req.query.connectionId
    console.log('testing')
    if(validateId(connectionId)){
        console.log(connectionId)
        var connectionDB = new ConnectionDB();
        var connection = await connectionDB.getConnection(connectionId);
        let data = {
            'connection': connection
        }
        if(req.session.userProfile){
            res.render('connection', {user:req.session.userProfile.user, data: data})
        } else{
            res.render('connection', {data: data})
        }
    } else{
        console.log('else')
        var connectionDB = new ConnectionDB();
        var connections = await connectionDB.getConnections();
        var topics = await connectionDB.getTopics();
        
        let data = {
            'connections': connections,
            'topics': topics
        }
        
        if(req.session.userProfile){
            res.render('connections', {user:req.session.userProfile.user, data: data})
        } else{
            res.render('connections', {data: data})
        }
    }
});

router.get('/connection/:connectionId', function(req,res){
    let connectionId = req.params.connectionId
    let connection;
    console.log(connectionId)
    if(validateId(connectionId)){
        var connectionDB =new ConnectionDB();
        connection = connectionDB.getConnection(connectionId);
        connection = new Connection(connection.id, connection.name, connection.topic,connection.details, connection.creator, connection.date, connection.time)
        let data = {
            'connection': connection
        }
        console.log('data')
        res.render('connection', {data: data})
    } else{
        res.redirect('/connections')
    }
});



router.get('/newConnection', function (req, res){
    if(req.session.userProfile){
        res.render('newConnection', {user:req.session.userProfile.user})
    } else{
        res.render('newConnection')
    }
})

router.post('/new', (req, res) => {
    if(req.session.userProfile){
        let topic = req.body.topic
        let name = req.body.name
        let details = req.body.details
        let location = req.body.location
        let creator = req.body.creator
        let date = req.body.data
        let time = req.body.time
        let connection = new ConnectionDB();
        connection.addConnection(name,topic,details,creator,date,time,location)
        res.redirect('/connections')
    } else{
        res.redirect('/login')
    }
})

function validateId(id){
    if(id !== undefined){
        if(Number.isInteger(Number.parseInt(id))){
            return true;
        } else{
            return false
        }
    } else{
        return false
    }
}

module.exports = router;