import SelectorString from "@utils/SelectorString";
import BasicComponent from "@components/BasicComponent";

interface Handler {
    (component: BasicComponent, ...selector: SelectorString[]): void;
}

interface HandlerPhoto {
    (component: BasicComponent, id:number,  ...selector: SelectorString[]): void;
}

interface HandlerAd {
    (component: BasicComponent, id:string,  ...selector: SelectorString[]): void;
}

export {Handler, HandlerPhoto}