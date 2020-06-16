import Coords from "@entities/Coords";
import {fetch} from "../main";
import {API, responseStatuses} from "@utils/constants";
import Comment from "@entities/Comment";

async function adComment(comment: Comment) {
    const response = await fetch.post({
        path: API.newComment(comment.adid),
        data: comment,
        contentType: 'application/json;charset=utf-8'
    });
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

async function getAdComments(adId: number) {
    const response = await fetch.get({
        path: API.adComments(adId),
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


export {adComment, getAdComments}