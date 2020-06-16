import BasicComponent from "../../BasicComponent";
const adColumnTemplate = require('./adColumn.pug');
import './ad-column.scss';
import SelectorString from "../../../utils/SelectorString";
import {getAdPet} from "@queries/pet";
import AdComponent from "@components/AdComponent/AdComponent";
import DateParser from "@utils/DateParser";
import {adsNavigateMain, expand, sort, search} from "@handlers/mainPageActions";
import {getAdPic} from "@handlers/picLoad";
import EditableObject from "@utils/EditableObject";
import {data} from "../../../main";
import {adRefHandler} from "@handlers/refsHandlers";

class AdColumnComponent extends BasicComponent {

    private _headerSelector: SelectorString = new SelectorString(".ad-column__choose__names");
    private _addAdSelector: SelectorString =  new SelectorString(".ad-column__window");
    private _dropdownButton: SelectorString = new SelectorString(".ad-column__dropdown-button");
    private _dropdownContent: SelectorString = new SelectorString(".ad-column__dropdown-content");
    private _searchInputSelector: SelectorString = new SelectorString(".ad-column__input");
    private _adSelector: SelectorString = new SelectorString("#ad_");
    private _adPhotoSelector: SelectorString = new SelectorString(".ad__img");
    private _dateParser: DateParser = new DateParser();
    private _viewAdRef: SelectorString =  new SelectorString(".ad__link");
    private static __instance: AdColumnComponent;


    constructor(data: EditableObject, parent: HTMLElement) {
        super(data, parent);
        if (AdColumnComponent.__instance) {
            AdColumnComponent.__instance.data = data;
            AdColumnComponent.__instance.parent = parent;
            return AdColumnComponent.__instance;
        }
        AdColumnComponent.__instance = this;
    }

    createHandlers() {
        adsNavigateMain(this, this._headerSelector);
        expand(this, this._dropdownButton);
        sort(this, this._dropdownContent);
        search(this, this._searchInputSelector);

    }


    render() {
        return `${adColumnTemplate(this.data)}`;
    }

    async renderAds() {
        document.querySelector(this. _addAdSelector.selector).innerHTML = "";
        const ads = this.data.ads;
        for (const ad of ads) {
            ad.date = this._dateParser.parse(ad.date);
            const pet = await getAdPet(ad.id);
            const adComponent = new AdComponent({ad:ad, pet:pet}, this.parent);
            adComponent.renderTo(this. _addAdSelector);
            adComponent.createHandlers();
            getAdPic(this, ad.id, this._adSelector, this._adPhotoSelector);
        }
        adRefHandler(this, this._viewAdRef);
    }

    async renderTo(selectorString: SelectorString) {
        if (data.prevPage === "") {
            await this.renderAds();
        } else {
            this.parent.querySelector(selectorString.selector).innerHTML = this.render();
            await this.renderAds();
            this.createHandlers();
        }
    }

    showDropdownContent() {
        const dropdown = document.querySelector(this._dropdownContent.selector);
        if (!dropdown.classList.contains('ad-column__dropdown-content_clicked')) {
            dropdown.className = `${dropdown.className} ad-column__dropdown-content_clicked`;
        }
        else {
            dropdown.classList.remove('ad-column__dropdown-content_clicked');
        }
    }
}

export default AdColumnComponent;