import {fetch} from "../main";
import {API, responseStatuses} from "@utils/constants";
import Coords from "@entities/Coords";
import {AdType} from "@entities/Ad";

async function adCoords(coords: Coords) {
    const response = await fetch.post({
        path: API.adCoords(coords.adid),
        data: coords,
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

async function getAdCoords(adId: number) {
    const response = await fetch.get({
        path: API.adCoords(adId),
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

async function getAllCoords() {
    const response = await fetch.get({
        path: API.allCoords,
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

export {adCoords, getAllCoords, getAdCoords}