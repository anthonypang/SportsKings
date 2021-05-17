class Connection {
    constructor(id,name,topic,details,creator,date,time, location) {
        this.id = id;
        this.name = name;
        this.topic = topic;
        this.details = details;
        this.creator = creator;
        this.date = date;
        this.time = time;
        this.location = location
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }
    getTopic(){
        return this.topic;
    }

    setTopic(topic){
        this.topic = topic;
    }
    getDetails(){
        return this.details;
    }

    setDetails(details){
        this.details = details;
    }

    getCreator(){
        return this.creator;
    }

    setCreator(creator){
        this.creator = creator;
    }

    getDate(){
        return this.date;
    }

    setDate(date){
        this.date = date;
    }
    getTime(){
        return this.time;
    }

    setTime(time){
        this.time = time;
    }

    getLocation(){
        return this.location;
    }

    setLocation(location){
        this.location = location;
    }
}

module.exports = Connection;