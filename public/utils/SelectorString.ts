class SelectorString {
    private _selector: string;
    constructor(selector: string) {
        if (selector.charAt(0) !== '.' &&
            selector.charAt(0) !== '#' )
            throw new Error("Selector string is not valid");
        this._selector = selector;
    }
    get selector() {
        return this._selector;
    }
}

export default SelectorString;