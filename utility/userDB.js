var Connection = require('../model/connection')
const mongoose = require('mongoose');
const User = require('../model/user');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sportskings', { useNewUrlParser: true, useUnifiedTopology: true });


var userSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    firstname: { type: String, required: true },
    lastname: String,
    email: String,
    password: String
}, { collection: 'users' });


var user = mongoose.model('user', userSchema);


class UserDB {
    constructor() { }


    getUser(email, password) {
        console.log('getting one connection')
        let oneUser = user.findOne({ email: email, password: password }).then((doc) => {

            let userItem = new User();

            if (doc === null) {
                userItem = null;
                return userItem;
            }

            userItem.setId(doc.id);
            userItem.setFirstname(doc.firstname);
            userItem.setLastname(doc.lastname);
            userItem.setEmail(doc.email);
            userItem.setPassword(doc.password)


            return userItem
        })
        return oneUser
    }

    createUser(firstname, lastname, email, password) {
        console.log('find')

        user.find({ email: email }, (err, docs) => {
            if (docs.length) {
                console.log('user exists')
                return 0;
            } else {
                console.log('registering')
                user.findOne().sort('-id').exec((err, doc) => {
                    let userModel = new user({
                        id: doc.id + 1,
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: password
                    })
                    console.log('save')
                    userModel.save().then((doc) => {
                        let userItem = new User();

                        userItem.setId(doc.id);
                        userItem.setFirstname(doc.firstname);
                        userItem.setLastname(doc.lastname);
                        userItem.setEmail(doc.email);
                        userItem.setPassword(doc.password)
                    })

                })
                return 1;
            }
        })


    }

}
module.exports = UserDB;