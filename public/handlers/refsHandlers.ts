import Handler from "../utils/Handler";
import {router} from "../main";
import SelectorString from "../utils/SelectorString";

const refHandler: Handler = function (selector: SelectorString) {
    document.querySelectorAll(selector.selector).forEach((ref: HTMLElement) =>
        ref.addEventListener('click', (event) => router.go((event.target as HTMLElement).dataset.name)));
};
export {refHandler};