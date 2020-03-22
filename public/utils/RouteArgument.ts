class RouteArgument {
    private _argument : number;
    constructor(argument : number = null) {
        if (argument === null || argument === undefined) {
            this._argument = -1;
        } else {
            this._argument = argument;
        }
    }
    getPath() {
        if (this._argument === -1) {
            return "";
        } else {
            return `/${this._argument}`;
        }
    }
    get argument() {
        return this._argument;
    }
}