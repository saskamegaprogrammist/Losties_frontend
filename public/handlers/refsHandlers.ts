import Handler from "../utils/Handler";
import {router} from "../main";
import SelectorString from "../utils/SelectorString";
import HeaderElemsComponent from "@components/PrimitiveComponent/Header/HeaderElems/HeaderElemsComponent";

const refHandler: Handler = function (component: HeaderElemsComponent, selector: SelectorString) {
    document.querySelectorAll(selector.selector).forEach((ref: HTMLElement) =>
        ref.addEventListener('click', (event) => router.go((event.target as HTMLElement).dataset.name)));
};

export {refHandler};