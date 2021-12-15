export class SSH {

    host;
    user;
    password;    

    constructor(host, user, password){
        this.host = host;
        this.password = password;
    }

    run() {
        console.log(this.host, this.password);
    }
}