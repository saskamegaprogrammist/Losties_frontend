enum ArgTypes {
    undefined,
    id,
    search
};

class RouteArgument {
    private _argument : number;
    private _type: number;
    constructor(argument : number = null, type : keyof typeof ArgTypes) {
        if (argument === null || argument === undefined) {
            this._argument = -1;
            this._type = ArgTypes["undefined"];
        } else {
            this._argument = argument;
            this._type = ArgTypes[type];
        }
    }
    getPath() {
        if (this._argument === -1) {
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