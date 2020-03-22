import Route from "./Route";
import BasicComponent from "../components/BasicComponent";

class Router {
    private static __instance: Router;
    private _globalParentElement : HTMLElement;
    private _routes : Array<Route> = new Array<Route>();
    private _keyWords : Array<string> = new Array<string>();
    constructor(parent : HTMLElement) {
        if (Router.__instance) {
            return Router.__instance;
        }
        Router.__instance = this;
        this._globalParentElement = parent;
    }

    register(route : Route) {
        this._routes.push(route);
        this._keyWords.push(route.keyWord);
    };

    return() {
        window.history.back();
    }

    create(route : Route, identities : Array<RouteArgument>) {
        let path : string = route.createPath(identities);
        if (window.location.pathname !== path) {
            window.history.pushState(
                {'id':identities},
                '',
                path,
            );
        };
        const component : BasicComponent =  new route.componentName({}, this._globalParentElement);
        component.create(identities);
    }

    go(routeName : string, ...identities : Array<RouteArgument>) {
        for (let route of this._routes) {
            if (route.check(routeName)) {
                this.create(route, identities);
                return;
            }
        }

        console.log(`couldn\'t open route : ${routeName}`);
    }

    open(keyWords : Array<string>, identities : Array<string>, path : string) {
        console.log(keyWords, identities);
        for (let route of this._routes) {
            if (route.compare(keyWords)) {
                const component : BasicComponent =  new route.componentName({}, this._globalParentElement);
                component.create();
                return;
            }
        }
        console.log(`couldn\'t open page : ${path}`);
    }

    parsePath(path : string) {
        const pathSplitted = path.split(/\/|\?=/);
        const keyWords : Array<string> = new Array<string>();
        const args  : Array<string> = new Array<string>();
        pathSplitted.slice(1, pathSplitted.length).forEach((argument) => {
          //  if (argument != "") {  //TODO: check this
                if (this._keyWords.includes(argument)) {
                    keyWords.push(argument);
                } else {
                    args.push(argument);
                }
          //  }
        });
        return {
            keyWords : keyWords,
            args: args,
        };
    }

    start() {
        window.onpopstate = function () {
            const currentPath = window.location.pathname;
            const pathArgs = this.parsePath(currentPath);
            this.open(pathArgs.keyWords, pathArgs.args);
        }.bind(this);

        const currentPath = window.location.pathname;
        const pathArgs = this.parsePath(currentPath);
        this.open(pathArgs.keyWords, pathArgs.args, currentPath);
    };

}

export default Router;