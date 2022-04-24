var Connection = require('../model/connection')
const mongoose = require('mongoose');
const User = require('../model/user');
const UserProfile = require('../model/userProfile')
const UserConnection = require('../model/userConnection');
const ConnectionDB = require('./connectionDB');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// || 'mongodb://localhost:27017/sportskings'

const userConnectionSchema = new mongoose.Schema({
  //define the schema - this can take place of the model
  userID: Number,
  connectionID: Number,
  rsvp: String,
}, { collection: 'userConnections' });


const userConnection = mongoose.model("userConnection", userConnectionSchema);


class UserProfileDB {
  constructor() { }

  getUserProfile(userID) {
    console.log('getting user profile');
    let userProfile = userConnection.find({ userID: userID }).then(async (doc) => {


      return doc
    })
    return userProfile;
  }

  updateRSVP(connectionID, userID, rsvp) {
    let newrsvp = userConnection.findOneAndUpdate({ $and: [{ userID: userID }, { connectionID: connectionID }] },
      { $set: { rsvp: rsvp } },
      { new: true, upsert: true }).then((doc) => {
        return doc
      });
    console.log(newrsvp)
    console.log(connectionID)
  }


  removeRSVP(connectionID, userID) {
    userConnection.find({ $and: [{ userID: userID }, { connectionID: connectionID }] }).remove().exec();
  }

}
module.exports = UserProfileDB;