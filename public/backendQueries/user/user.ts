import {API, responseStatuses} from "@utils/constants";
import {fetch} from "../../main";

class SignUpArguments {
    firstname: string;
    lastname: string;
    phone: string;
    nickname: string;
    password: string;
    email: string;

    constructor(email: string, firstname: string, lastname: string, phone: string, nickname: string, password: string) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.phone = phone;
    }
}

async function signup(params: SignUpArguments) {
    try {
        const response = await fetch.post({path: API.signup,
            data: params,
            contentType : 'application/json;charset=utf-8'});
        const reponseString: string = responseStatuses[response.status];
        switch (reponseString) {
            case "Conflict":
                return response.json();
            case "Created":
                console.log("created");
                return null;
            default:
                return new Error(
                    `Couldn't register`
                );
        }
    } catch (error) {
        console.error(error);
    }

}

export {signup, SignUpArguments}