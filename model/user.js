class User {
    constructor(id,firstname,lastname,email,password) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password
        
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
    getPassword(){
        return this.email;
    }

    setPassword(password){
        this.password = password;
    }
}

module.exports = User;