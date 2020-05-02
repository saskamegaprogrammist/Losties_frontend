import SelectorString from "@utils/SelectorString";

interface Handler {
    (...selector: SelectorString[]): void;
}

export default Handler;