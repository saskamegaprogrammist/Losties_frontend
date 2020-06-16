import {fetch} from "../main";
import {API, responseStatuses} from "@utils/constants";
import Pet from "@entities/Pet";

async function newPet(params: Pet) {
    const response = await fetch.post({
        path: API.adPet(params.adid),
        data: params,
        contentType: 'application/json;charset=utf-8'
    });
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

async function getAdPet(adId: number) {
    const response = await fetch.get({
        path: API.adPet(adId),
    });
    const reponseString: string = responseStatuses[response.status];
    switch (reponseString) {
        case "Bad Request":
            throw new Error(
                `Sorry, bad request`
            );
        case "OK":
            return response.json();
        default:
            throw new Error(
                `Sorry, there is an internal server error`
            );
    }
}

export {getAdPet, newPet};