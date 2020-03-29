import SelectorString from "./SelectorString";

interface Handler {
    (selector: SelectorString): void;
}

export default Handler;