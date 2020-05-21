import User from "@entities/User";

class Data {
    private static __instance: Data;
    private _user: User = null;
    private _page: string = null;
    constructor() {
        if (Data.__instance) {
            return Data.__instance;
        }
        Data.__instance = this;
    }

    set user (user: User) {
        console.log(this._user);
        this._user = user;
    }

    get user() {
        console.log(this._user);
        return this._user;
    }

    set page (page: string) {
        console.log(this._page);
        this._page = page;
    }

    get page() {
        console.log(this._page);
        return this._page;
    }
}

export default Data;