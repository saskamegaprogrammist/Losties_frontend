import Handler from "../utils/Handler";
import {data, router} from "../main";
import SelectorString from "../utils/SelectorString";
import HeaderElemsComponent from "@components/PrimitiveComponent/Header/HeaderElems/HeaderElemsComponent";
import UserInfoComponent from "@components/PrimitiveComponent/Header/UserInfo/UserInfoComponent";
import {RouteArgument} from "@utils/RouteArgument";

const refHandler: Handler = function (component: HeaderElemsComponent, selector: SelectorString) {
    document.querySelectorAll(selector.selector).forEach((ref: HTMLElement) =>
        ref.addEventListener('click', (event) => router.go((event.target as HTMLElement).dataset.name)));
};

const userRefHandler: Handler = function (component: UserInfoComponent, selector: SelectorString) {
    document.querySelector(selector.selector).addEventListener('click', (event) =>
        router.go("user-page", new RouteArgument(String(data.user.id), "id")));
};

export {refHandler, userRefHandler};