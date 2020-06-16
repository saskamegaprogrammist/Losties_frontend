import {fetch} from "../main";
import {API, responseStatuses} from "@utils/constants";
import {Ad} from "@entities/Ad";
import User from "@entities/User";

async function adPhotoPost (pic: FormData, ad: Ad) {
    const response = await fetch.post({path: API.adPic(ad.id),
        data: pic,
        contentType:'multipart/form-data'});
    const reponseString: string = responseStatuses[response.status];
    switch (reponseString) {
        case "Created":
            return response.json();
        case "Bad Request":
            throw new Error(
                `Sorry, this ad doesn't exist`
            );
        default:
            throw new Error(
                `Sorry, there is an internal server error`
            );
    }
}


async function adPhotoGet(id: number) {
    const response = await fetch.get(
        {path: API.adPic(id)}
    );
    const reponseString: string = responseStatuses[response.status];
    switch (reponseString) {
        case "OK":
            return response.blob();
        case "Bad Request":
            throw new Error(
                `Sorry, this ad doesn't exist`
            );
        default:
            throw new Error(
                `Sorry, there is an internal server error`
            );
    }
}

async function userPhotoPost (pic: FormData, user: User) {
    const response = await fetch.post({path: API.userPic(user.id),
        data: pic,
        contentType:'multipart/form-data'});
    const reponseString: string = responseStatuses[response.status];
    switch (reponseString) {
        case "Created":
            return response.json();
        case "Bad Request":
            throw new Error(
                `Sorry, this user doesn't exist`
            );
        default:
            throw new Error(
                `Sorry, there is an internal server error`
            );
    }
}


async function userPhotoGet(id: number) {
    const response = await fetch.get(
        {path: API.userPic(id)}
    );
    const reponseString: string = responseStatuses[response.status];
    switch (reponseString) {
        case "OK":
            return response.blob();
        case "Bad Request":
            throw new Error(
                `Sorry, this user doesn't exist`
            );
        default:
            throw new Error(
                `Sorry, there is an internal server error`
            );
    }
}

export {adPhotoPost, adPhotoGet, userPhotoGet, userPhotoPost}