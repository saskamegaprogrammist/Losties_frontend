class Route {
    private _parentRoute: Route;
    private _name: string;
    private _keyWord: string;
    private _level: number;

    constructor(parentRoute: Route = null, name: string = null, keyword: string) {
        this._parentRoute = parentRoute;
        this._name = name;
        this._keyWord = keyword;
    }

    createPath(args: Array<RouteArgument> = null): string {
        const argument: RouteArgument = args.pop();
        return `${this._parentRoute.createPath(args)}/${this._keyWord}${argument.getPath()}`;
    }
}