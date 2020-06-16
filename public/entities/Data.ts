import User from "@entities/User";
import {Ad, AdType} from "@entities/Ad";
import {adsSortOptions} from "@utils/constants";

class Data {
    private static __instance: Data;
    private _user: User = null;
    private _currentAdType: AdType = AdType.lost;
    private _currentSortType: string = null;
    private _currentSearchString: string = null;
    private _page: string = null;
    private _prevPage: string = null;
    private _ads: Ad[] = null;
    private _coordsChosen: any[] = null;
    private _chosenAdId: number = null;
    private _userAds: number = null;
    constructor() {
        if (Data.__instance) {
            return Data.__instance;
        }
        Data.__instance = this;
    }

    setCurrentAdType (adType: string) {
        if (adType === "lost") {
            this._currentAdType = AdType.lost;
        } else {
            this._currentAdType = AdType.found;
        }
    }

    get currentAdType() {
        return this._currentAdType;
    }

    set currentSortType (sort: string) {
        this._currentSortType = sort;
    }

    get currentSortType() {
        return this._currentSortType;
    }

    set currentSearchString (search: string) {
        this._currentSearchString = search;
    }

    get currentSearchString() {
        return this._currentSearchString;
    }

    set user (user: User) {
        this._user = user;
    }

    get user() {
        return this._user;
    }

    set ads (ads: Ad[]) {
        this._ads = ads;
    }

    get ads() {
        return this._ads;
    }

    set page (page: string) {
        this._prevPage = this._page;
        this._page = page;
    }

    get page() {
        return this._page;
    }

    set prevPage (page: string) {
        this._prevPage = page;
    }

    get prevPage() {
        return this._prevPage;
    }

    set coordsChosen(coords: any[]) {
        this._coordsChosen = coords;
    }

    get coordsChosen() {
        return this._coordsChosen;
    }


    set chosenAdId (ad: number) {
        this._chosenAdId = ad;
    }

    get chosenAdId() {
        return this._chosenAdId;
    }

    set userAds (ads: number) {
        this._userAds = ads;
    }

    get userAds() {
        return this._userAds;
    }
}

export default Data;