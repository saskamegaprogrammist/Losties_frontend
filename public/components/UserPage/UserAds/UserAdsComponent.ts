import BasicComponent from "../../BasicComponent";
const userAdsTemplate = require('./userAds.pug');
import './user-ads.scss';
import SelectorString from "../../../utils/SelectorString";
import {Ad} from "@entities/Ad";
import AdComponent from "@components/AdComponent/AdComponent";
import Pet from "@entities/Pet";
import {adsNavigate, userNavigate} from "@handlers/userPageHandlers";
import {getUserAds} from "@queries/ad_user";
import {data} from "../../../main";
import DateParser from "@utils/DateParser";
import {getAdPet} from "@queries/pet";
import {getAdPic} from "@handlers/picLoad";
import {adRefHandler} from "@handlers/refsHandlers";

class UserAdsComponent extends BasicComponent {

    private _addAdSelector: SelectorString =  new SelectorString(".ads__row");
    private _newAdButtonSelector: SelectorString =  new SelectorString(".ads__button");
    private _headerSelector: SelectorString = new SelectorString(".ads__header__names");
    private _dateParser: DateParser = new DateParser();
    private _adSelector: SelectorString = new SelectorString("#ad_");
    private _adPhotoSelector: SelectorString = new SelectorString(".ad__img");
    private _viewAdRef: SelectorString =  new SelectorString(".ad__link");


    createHandlers() {
        userNavigate(this, this._newAdButtonSelector);
        adsNavigate(this, this._headerSelector);
    }

    render() {
        return `${userAdsTemplate(this.data)}`;
    }

    async renderAds() {
        const ads = this.data.ads;
        for (const ad of ads) {
            ad.date = this._dateParser.parse(ad.date);
            const pet = await getAdPet(ad.id);
            const adComponent = new AdComponent({ad:ad, pet:pet}, this.parent);
            adComponent.renderTo(this. _addAdSelector);
            getAdPic(this, ad.id, this._adSelector, this._adPhotoSelector);

        }
        adRefHandler(this, this._viewAdRef);
    }


    renderTo(selectorString: SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML = this.render();
        this.renderAds();
    }

}

export default UserAdsComponent;