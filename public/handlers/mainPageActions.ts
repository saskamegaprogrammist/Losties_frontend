import {Handler} from "@utils/Handler";
import SelectorString from "@utils/SelectorString";
import {data, router} from "../main";
import AdColumnComponent from "@components/MainPage/AdColumn/AdColumnComponent";

const adsNavigateMain: Handler = function (component: AdColumnComponent, selector: SelectorString) {
    document.querySelector(selector.selector).addEventListener('click', (event) => {
        data.setCurrentAdType((event.target as HTMLElement).dataset.section);
        router.go("main-page");
    })
};

const sort: Handler = function (component: AdColumnComponent, selector: SelectorString) {
    document.querySelector(selector.selector).addEventListener('click', (event) => {
        data.currentSortType = ((event.target as HTMLElement).dataset.section);
        router.go("main-page");
    })
};

const search: Handler = function (component: AdColumnComponent, selector: SelectorString) {
    document.querySelector(selector.selector).addEventListener('keypress', (event) => {
        if ((event as KeyboardEvent).key === "Enter") {
            data.currentSearchString = ((event.target as HTMLInputElement).value);
            router.go("main-page");
        }
    })
};

const expand: Handler = function (component: AdColumnComponent, selector: SelectorString) {
    document.querySelector(selector.selector).addEventListener('click', (event) => {
       component.showDropdownContent();
    })
};


export {adsNavigateMain, expand, sort, search}