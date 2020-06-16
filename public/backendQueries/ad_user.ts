import {API, responseStatuses} from "@utils/constants";
import {data, fetch, router} from "../main";
import {Ad, AdType} from "@entities/Ad";

async function newAd(params: Ad) {
    const response = await fetch.post({
        path: API.newAd(params.userid),
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
        case "Unauthorized":
            throw new Error(
                `Sorry, you are the wrong user`
            );
        default:
            throw new Error(
                `Sorry, there is an internal server error`
            );
    }
}

async function getUserAds(userId: number, adType: AdType) {
    const response = await fetch.get({
        path: API.userAds(userId, adType),
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

async function getUserAdsNumberAndType(userId: number, adType: AdType) {
    const response = await fetch.get({
        path: API.userAdsNumberAndType(userId, adType),
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


async function getUserAdsNumber(userId: number) {
    const response = await fetch.get({
        path: API.userAdsNumber(userId),
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

export {getUserAds, newAd, getUserAdsNumber, getUserAdsNumberAndType};