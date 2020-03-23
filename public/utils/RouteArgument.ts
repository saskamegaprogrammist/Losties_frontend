enum ArgTypes {
    undefined,
    id,
    search
}

const emptyArg = "";

class RouteArgument {
    private _argument: string;
    private _type: number;
    constructor(argument: string = null, type: keyof typeof ArgTypes) {
        if (argument === null || argument === undefined) {
            this._argument = emptyArg;
            this._type = ArgTypes["undefined"];
        } else {
            this._argument = argument;
            this._type = ArgTypes[type];
        }
    }
    getPath() {
        if (this._argument === emptyArg) {
            return "";
        } else {
            switch (this._type) {
                case 1:
                    return `/${this._argument}`;
                case 2:
                    return `?=${this._argument}`;

            }

        }
    }
    get argument() {
        return this._argument;
    }
}

export {emptyArg, RouteArgument};