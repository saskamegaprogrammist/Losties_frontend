import {Handler} from "@utils/Handler";
import {data, router} from "../main";
import SelectorString from "../utils/SelectorString";
import HeaderElemsComponent from "@components/PrimitiveComponent/Header/HeaderElems/HeaderElemsComponent";
import UserInfoComponent from "@components/PrimitiveComponent/Header/UserInfo/UserInfoComponent";
import {ArgTypes, RouteArgument} from "@utils/RouteArgument";
import AdComponent from "@components/AdComponent/AdComponent";
import {logout} from "@queries/user";

const refHandler: Handler = function (component: HeaderElemsComponent, selector: SelectorString) {
    document.querySelectorAll(selector.selector).forEach((ref: HTMLElement) =>
        ref.addEventListener('click', async (event) => {
            const link = (event.target as HTMLElement).dataset.name;
            if (link === "logout") {
                await logout();
                data.page = "logout";
                router.go("main-page");
            } else  {
                router.go(link);
            }
        }));
};

const userRefHandler: Handler = function (component: UserInfoComponent, selector: SelectorString) {
    document.querySelector(selector.selector).addEventListener('click', (event) =>
        router.go("user-page", new RouteArgument(String(data.user.id), ArgTypes.id)));
};

const adRefHandler: Handler = function (component: AdComponent, selector: SelectorString) {
    document.querySelectorAll(selector.selector).forEach(link=> link.addEventListener('click', (event) => {
        const id = (event.target as HTMLElement).parentElement.parentElement.parentElement.id.split("_")[1];
        data.chosenAdId = Number.parseInt(id);
        console.log(data.chosenAdId);
        router.go("ad-page", new RouteArgument(id, ArgTypes.id))
    }));
};

export {refHandler, userRefHandler, adRefHandler};