import SelectorString from "@utils/SelectorString";
import BasicComponent from "@components/BasicComponent";

interface Handler {
    (component: BasicComponent, ...selector: SelectorString[]): void;
}

export default Handler;