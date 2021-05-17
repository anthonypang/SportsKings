class User {
    constructor(id,firstname,lastname,email) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getFirstname(){
        return this.firstname;
    }

    setFirstname(firstname){
        this.firstname = firstname;
    }
    getLastname(){
        return this.lastname;
    }

    setLastname(lastname){
        this.lastname = lastname;
    }
    getEmail(){
        return this.email;
    }

    setEmail(email){
        this.email = email;
    }
}

module.exports = User;