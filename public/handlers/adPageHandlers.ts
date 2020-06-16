import UserNewAdComponent from "@components/UserPage/UserNewAd/UserNewAdComponent";

import {data, router} from "../main";

import {ArgTypes, RouteArgument} from "@utils/RouteArgument";
import {Handler, HandlerPhoto} from "@utils/Handler";
import SelectorString from "@utils/SelectorString";
import {adComment} from "@queries/comments";
import Comment from "@entities/Comment";



const commentInputHandler: HandlerPhoto = function (component: UserNewAdComponent, id: number, selectorButton: SelectorString, selectorInput: SelectorString) {
    document.querySelector(selectorButton.selector).addEventListener('click', async (event) => {
        const input = document.querySelector(selectorInput.selector);
        const comment = (input as HTMLInputElement).value;
        if (comment !== "") {
            (input as HTMLInputElement).value = "";
            await adComment(new Comment(id, data.user.id, comment, new Date()));
            router.go("ad-page", new RouteArgument(String(id), ArgTypes.id))
        }
    } );
};

export {commentInputHandler};