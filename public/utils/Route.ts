import {strict} from "assert";
import {RouteArgument} from "./RouteArgument";

class Route {
    private _parentRoute: Route;
    private _name: string;
    private _keyWord: string;
    private _level: number;
    private _componentName: any;

    constructor(parentRoute: Route = null, name: string = null, keyword: string, component: any) {
        this._parentRoute = parentRoute;
        this._name = name;
        this._keyWord = keyword;
        this._componentName = component;
    }

    createPath(args: Array<RouteArgument> = null): string {
        const argument: RouteArgument = args.pop();
        if (this._parentRoute === null) {
            return `/${this._keyWord}${argument.getPath()}`;
        } else {
            return `${this._parentRoute.createPath(args)}/${this._keyWord}${argument.getPath()}`;
        }
    }

    compare(keywords: Array<string>): boolean{
        const keyWord: string = keywords.pop();
        if (keyWord !== this._keyWord) return false;
        if (this._parentRoute === null) {
            return true;
        } else {
            return this._parentRoute.compare(keywords);
        }
    }

    check (routeName: string) {
        return (this._name === routeName);
    }

    get componentName() {
        return this._componentName;
    }

    get keyWord() {
        return this._keyWord;
    }
}

export default Route;