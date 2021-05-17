var express = require('express');

var router = express.Router();

router.get('/', function (req,res){
    if(req.session.userProfile){
        res.render('index', {user:req.session.userProfile.user})
    } else{
        res.render('index')
    }
   
});

router.get('/about', function (req,res){
    if(req.session.userProfile){
        res.render('about', {user:req.session.userProfile.user})
    } else{
        res.render('about')
    }
});

router.get('/contact', function (req,res){
    if(req.session.userProfile){
        res.render('contact', {user:req.session.userProfile.user})
    } else{
        res.render('contact')
    }
});

router.get('/newConnection', function(req, res){
    if(req.session.userProfile){
        res.render('newConnection', {user:req.session.userProfile.user})
    } else{
        res.render('newConnection')
    }
});


module.exports = router;