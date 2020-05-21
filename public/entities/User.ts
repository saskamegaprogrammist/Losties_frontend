class User {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    nickname: string;
    password: string;
    email: string;


    constructor(email: string, password: string, firstname?: string, lastname?: string, phone?: string, nickname?: string, id?: number) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.phone = phone;
    }

}

export default User;