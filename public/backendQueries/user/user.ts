import {API, responseStatuses} from "@utils/constants";
import {data, fetch, router} from "../../main";
import User from "@entities/User";

async function auth() {
    const response = await fetch.get({
        path: API.auth,
    });
    const reponseString: string = responseStatuses[response.status];
    switch (reponseString) {
        case "Unauthorized":
            return null;
        case "OK":
            return response.json();
        default:
            throw new Error(
                `Sorry, there is an internal server error`
            );
    }
}

async function changeUser(params: User) {
    const response = await fetch.put({
        path: API.user(data.user.id),
        data: params,
        contentType: 'application/json;charset=utf-8'
    });
    const reponseString: string = responseStatuses[response.status];
    switch (reponseString) {
        case "OK":
            return response.json();
        case "Bad Request":
            throw new Error(
                `Sorry, this username or email is already taken`
            );
        default:
            throw new Error(
                `Sorry, there is an internal server error`
            );
    }
}



async function signup(params: User) {
    const response = await fetch.post({
        path: API.signup,
        data: params,
        contentType: 'application/json;charset=utf-8'
    });
    const reponseString: string = responseStatuses[response.status];
    switch (reponseString) {
        case "Created":
            return response.json();
        case "Conflict":
            throw new Error(
                `Sorry, this username or email is already taken`
            );
        default:
            throw new Error(
                `Sorry, there is an internal server error`
            );
    }
}

async function login(params: User) {
    const response = await fetch.post({path: API.login,
        data: params,
        contentType : 'application/json;charset=utf-8'});
    const reponseString: string = responseStatuses[response.status];
    switch (reponseString) {
        case "OK":
            return response.json();
        case "Bad Request":
            return new Error(
                `Sorry, wrong email or password`
            );
        default:
            return new Error(
                `Sorry, there is an internal server error`
            );
    }
}

export {signup, login, auth, changeUser}