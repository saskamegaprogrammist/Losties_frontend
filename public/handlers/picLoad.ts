import {Handler, HandlerPhoto} from "@utils/Handler";
import AdColumnComponent from "@components/MainPage/AdColumn/AdColumnComponent";
import SelectorString from "@utils/SelectorString";
import {adPhotoGet, userPhotoGet} from "@queries/pic";
import {data} from "../main";
import BasicComponent from "@components/BasicComponent";

const getAdPic: HandlerPhoto = async function (component: AdColumnComponent, id: number, selector: SelectorString, selectorPhoto: SelectorString) {
    const reader = new FileReader();
    const photoBlob = await adPhotoGet(id);
    reader.readAsDataURL(photoBlob);
    reader.onload = function () {
        const result: string = reader.result as string;
        (document.querySelector(`${selector.selector}${id}`).querySelector(selectorPhoto.selector) as HTMLImageElement).src = result;
    }
};

const getUserPicHeader: HandlerPhoto = async function (component: BasicComponent, id: number, selector: SelectorString) {
    const reader = new FileReader();
    const photoBlob = await userPhotoGet(id);
    reader.readAsDataURL(photoBlob);
    reader.onload = function () {
        const result: string = reader.result as string;
        (document.querySelector(selector.selector) as HTMLImageElement).src = result;
    }
};
export {getAdPic, getUserPicHeader}