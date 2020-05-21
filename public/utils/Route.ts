import {emptyArg, RouteArgument} from "./RouteArgument";

class Route {
    private _parentRoute: Route;
    private _name: string;
    private _keyWord: string;
    private _componentName: any;

    constructor(parentRoute: Route = null, name: string = null, keyword: string, component: any) {
        this._parentRoute = parentRoute;
        this._name = name;
        this._keyWord = keyword;
        this._componentName = component;
    }

    createPath(args: Array<RouteArgument> = null): string {
        let argument: RouteArgument = new RouteArgument(emptyArg, "undefined");
        if (this._parentRoute === null) {
            if (args.length !== 0) {
                argument = args.pop();
            }
            return `/${this._keyWord}${argument.getPath()}`;
        } else {
            const parRoute = this._parentRoute.createPath(args);
            if (args.length !== 0) {
                argument = args.pop();
            }
            return `${parRoute}/${this._keyWord}${argument.getPath()}`;
        }
    }

    compare(keywords: Array<string>): boolean {
        const keyWord: string = keywords.pop();
        if (keyWord !== this._keyWord) return false;
        if (this._parentRoute === null) {
            return true;
        } else {
            return this._parentRoute.compare(keywords);
        }
    }

    check (routeName: string): boolean {
        return (this._name === routeName);
    }

    get componentName() {
        return this._componentName;
    }

    get keyWord(): string {
        return this._keyWord;
    }

    get name(): string {
        return this._name;
    }
}

export default Route;