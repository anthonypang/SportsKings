var express = require('express');
const Connection = require('../model/connection');
const ConnectionDB = require('../utility/connectionDB');
const User = require('../model/user');
const UserProfile = require('../model/userProfile');
const UserConnection = require('../model/userConnection');
const UserDB = require('../utility/userDB');
const UserProfileDB = require('../utility/userProfileDB');


var router = express.Router();



router.post('/register', async function (req, res) {

    let userDB = new UserDB()
    let userProfileDB = new UserProfileDB()

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;


    if (userDB.createUser(firstname, lastname, email, password) == null) {
        console.log('user already exists')
        res.render('register')
    } else {
        console.log('registered')
        let user = await userDB.getUser(email);
        let dbconnections = [];

        req.session.user = user
        req.session.userProfile = new UserProfile(user, dbconnections)

        let data = {
            userProfile: req.session.userProfile
        }

        res.render('savedConnections', { user: data.userProfile.user, userConnections: data.userProfile.userConnections })
    }


})

router.post('/login', async function (req, res) {


    let userDB = new UserDB()
    let userProfileDB = new UserProfileDB()
    let email = req.body.email
    let password = req.body.password
    let user = await userDB.getUser(email, password);

    console.log(user)
    if (user === null) {
        return
    }

    let userProfile = await userProfileDB.getUserProfile(user.id);



    let dbconnections = [];
    for (let i = 0; i < userProfile.length; i++) {
        let connectionDB = new ConnectionDB();
        let foundConnection = await connectionDB.getConnection(userProfile[i].connectionID);
        let rsvp = userProfile[i].rsvp
        let userConnection = new UserConnection(foundConnection, rsvp);
        console.log('this is the user connection')
        console.log(userConnection)
        dbconnections.push(userConnection)
    }

    console.log('this is the db connections')
    console.log(dbconnections)
    req.session.user = user
    console.log(user.firstname)
    req.session.userProfile = new UserProfile(user, dbconnections)
    console.log('this is the user profile')
    console.log(req.session.userProfile)
    let data = {
        userProfile: req.session.userProfile
    }
    console.log(data)
    res.render('savedConnections', { user: data.userProfile.user, userConnections: data.userProfile.userConnections })
})

router.use('/', function (req, res, next) {
    if (!req.session.user) {
        console.log('no user found')
        res.render("login");
    } else {
        next();
    }

})

router.get('/', function (req, res) {

    let data = {
        userProfile: req.session.userProfile
    }
    res.render('savedConnections', { user: data.userProfile.user, userConnections: data.userProfile.userConnections })
})

router.post('/rsvp', async function (req, res) {
    if (req.session.user) {
        let rsvp = req.body.rsvp
        let userProfile = new UserProfile(req.session.userProfile.user, req.session.userProfile.userConnections)
        let connectionId = req.body.id
        let userID = req.session.userProfile.user.id
        let userProfileDB = new UserProfileDB()


        let connectionDB = new ConnectionDB();
        let connection = await connectionDB.getConnection(connectionId);
        let x = 0;
        let userConnections = req.session.userProfile.userConnections
        console.log(userConnections)
        for (let i = 0; i < userConnections.length; i++) {
            if (userConnections[i].connection.id == connectionId) {
                console.log('hello')
                x = 1;
                console.log(userProfile)
                userProfile.updateConnection(connection, rsvp);
                await userProfileDB.updateRSVP(connectionId, userID, rsvp)
                req.session.userProfile = userProfile;
                console.log(req.session.userProfile)
                let data = {
                    user: req.session.userProfile.user,
                    userConnections: req.session.userProfile.userConnections
                }
                res.render('savedConnections', { user: data.user, userConnections: data.userConnections })
                break;
            }
        }
        if (x == 0) {
            console.log('bye')

            userProfile.addConnection(connection, rsvp);
            await userProfileDB.updateRSVP(connectionId, userID, rsvp)
            req.session.userProfile = userProfile;
            let data = {
                user: req.session.userProfile.user,
                userConnections: req.session.userProfile.userConnections
            }
            res.render('savedConnections', { user: data.user, userConnections: data.userConnections })
        }

    } else {
        res.render('login')
    }
})

router.get('/logout', function (req, res) {
    req.session.destroy()
    res.redirect('/')

})


router.post('/delete', async function (req, res) {
    let connectionId = req.body.id
    let userId = req.session.userProfile.user.id
    let connectionDb = new ConnectionDB()
    let connection = await connectionDb.getConnection(connectionId);
    let userProfileDB = new UserProfileDB()
    let userProfile = new UserProfile(req.session.userProfile.user, req.session.userProfile.userConnections)
    console.log(userProfile)
    userProfile.removeConnection(connection)
    await userProfileDB.removeRSVP(connectionId, userId)
    req.session.userProfile = userProfile;
    let data = {
        user: req.session.userProfile.user,
        userConnections: req.session.userProfile.userConnections
    }
    res.render('savedConnections', { user: data.user, userConnections: data.userConnections })
})





module.exports = router;