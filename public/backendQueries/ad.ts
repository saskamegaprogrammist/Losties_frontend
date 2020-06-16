import {AdType} from "@entities/Ad";
import {fetch} from "../main";
import {API, responseStatuses} from "@utils/constants";

async function getAllAds(adType: AdType) {
    const response = await fetch.get({
        path: API.allAds(adType),
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

async function getAd(id: number) {
    const response = await fetch.get({
        path: API.ad(id),
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


async function getAllAdsSorted(adType: AdType, sort: string) {
    const response = await fetch.get({
        path: API.allAdsSorted(adType, sort),
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


async function searchAds(search: string) {
    const response = await fetch.get({
        path: API.searchAds(search),
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

export {getAllAds, searchAds, getAllAdsSorted, getAd};