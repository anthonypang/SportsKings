var Connection = require('../model/connection')
const mongoose = require('mongoose');
const User = require('../model/user');
mongoose.connect('mongodb://localhost:27017/sportskings', {useNewUrlParser: true, useUnifiedTopology: true});


var userSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    firstname: {type: String, required: true},
    lastname: String,
    email: String
}, {collection: 'users'});


var user = mongoose.model('user', userSchema);


class UserDB{
    constructor(){}

    getUser(email){
            console.log('getting one connection')
            let oneUser = user.findOne({email: email}).then((doc) => {
                
                let userItem = new User();
            
                userItem.setId(doc.id);
                userItem.setFirstname(doc.firstname);
                userItem.setLastname(doc.lastname);
                userItem.setEmail(doc.email);

                return userItem
            })
            return oneUser
    }

}
module.exports = UserDB;