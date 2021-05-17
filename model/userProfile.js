const Connection = require('../model/connection');
const UserConnection = require('./userConnection');

class UserProfile {
    constructor(user, userConnections){
        this.user = user;
        this.userConnections = userConnections;
    }

    addConnection(connection, rsvp){
        let newConnection = new UserConnection(connection, rsvp);
        this.userConnections.push(newConnection);
    }
    removeConnection(connection){
        for(let i = 0; i < this.userConnections.length; i++){
            if(this.userConnections[i].connection.id == connection.id){
                console.log('about to splice')
                this.userConnections.splice(i,1)
                break;
            }
        }
    }
    getConnections(){
        return this.userConnections
    }
    updateConnection(connection, rsvp){
        for(let i = 0; i < this.userConnections.length; i++){
            if(this.userConnections[i].connection.id == connection.id){
                console.log('updating')
                this.userConnections[i].rsvp = rsvp
            }
        }
    }
}

module.exports = UserProfile;