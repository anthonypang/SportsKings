class UserConnection {
    constructor(connection, rsvp) {
        this.connection = connection;
        this.rsvp = rsvp;
    }

    getConnection(){
        return this.connection;
    }

    setConnection(connection){
        this.connection = connection;
    }

    getRsvp(){
        return this.rsvp;
    }

    setRsvp(rsvp){
        this.rsvp = rsvp;
    }
    
}

module.exports = UserConnection;