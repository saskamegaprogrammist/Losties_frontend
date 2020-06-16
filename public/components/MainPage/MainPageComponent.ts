import BasicComponent from "../BasicComponent";
const mainPageTemplate = require('./mainPage.pug');
import SelectorString from "../../utils/SelectorString";
import AdColumnComponent from "./AdColumn/AdColumnComponent"
import PrimitiveComponent from "../PrimitiveComponent/PrimitiveComponent";
import './main-page.scss';
import {data} from "../../main";
import {saveUser} from "@handlers/basicActions";
import {getUserAds} from "@queries/ad_user";
import UserAdsComponent from "@components/UserPage/UserAds/UserAdsComponent";
import {Ad, AdType} from "@entities/Ad";
import {getAllAds, getAllAdsSorted, searchAds} from "@queries/ad";
import EditableObject from "@utils/EditableObject";
import MapComponent from "@components/MapComponent/MapComponent";
import {getAllCoords} from "@queries/coords";
class MainPageComponent extends BasicComponent {

    private _headSelector: SelectorString =  new SelectorString(".main-container");
    private _adColumnSelector: SelectorString =  new SelectorString(".ad-column");
    private _primitiveComponent: PrimitiveComponent;
    private _adColumnComponent: AdColumnComponent = null;
    private static __instance: MainPageComponent;
    private _mapComponent: MapComponent;


    constructor(data: EditableObject, parent: HTMLElement) {
        super(data, parent);
        if (MainPageComponent.__instance) {
            MainPageComponent.__instance.data = data;
            MainPageComponent.__instance.parent = parent;
            return MainPageComponent.__instance;
        }
        MainPageComponent.__instance = this;
    }


    async create(identities: Array<string> = null) {
        await this.authorize();
        this.data.user = data.user;
        console.log(data.prevPage);
        if (!this._primitiveComponent || data.prevPage === "login" || data.prevPage === "logout" || data.prevPage === "signup") {
            this._primitiveComponent = new PrimitiveComponent(this.data, this.parent);
            await this._primitiveComponent.render();
            this.createHandlers();
        }
        this.renderTo(this._headSelector);
    }

    createHandlers() {
        this._primitiveComponent.createHandlers();
    }

    render() {
        return `${mainPageTemplate(this.data)}`;
    }

    async renderMap() {
        this.data.coords = await getAllCoords();
        this.data.mapType = "allAds";
        this._mapComponent = new MapComponent(this.data, this.parent.querySelector(this._headSelector.selector));
        this._mapComponent.renderTo(this._headSelector);
    }

    async getAds() {
        console.log(data);
        if (data.currentSearchString != null) {
            data.ads = await searchAds(data.currentSearchString);
            data.currentSearchString = null;
        } else if (data.currentSortType != null) {
            console.log(data.currentSortType);
            data.ads = await getAllAdsSorted(data.currentAdType, data.currentSortType);
            data.currentSortType = null;
        } else {
            data.ads = await getAllAds(data.currentAdType);
        }
    }

    async renderAdsColumn() {
        await this.getAds();
        this.data.ads = data.ads;

        this._adColumnComponent = new AdColumnComponent(this.data, this.parent.querySelector(this._headSelector.selector));
        this._adColumnComponent.renderTo(this._adColumnSelector);
    }

    async renderTo(selectorString: SelectorString) {
        if (data.prevPage !== "") {
            this.parent.querySelector(selectorString.selector).innerHTML = this.render();
            await this.renderMap();
        }
        await this.renderAdsColumn();
    }
}

export default MainPageComponent;