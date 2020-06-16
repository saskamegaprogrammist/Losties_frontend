import BasicComponent from "../../BasicComponent";
const headerTemplate = require('./header.pug');
import UserInfoComponent from "./UserInfo/UserInfoComponent";
import SelectorString from "../../../utils/SelectorString";
import './header.scss'
import HeaderElemsComponent from "./HeaderElems/HeaderElemsComponent";
import {data} from "../../../main";
import {getUserAdsNumber} from "@queries/ad_user";

class HeaderComponent extends BasicComponent {

    private _headSelector: SelectorString =  new SelectorString(".header");
    private _userInfoBlockSelector: SelectorString =  new SelectorString(".user-info");
    private _headerElemsBlockSelector: SelectorString =  new SelectorString(".header-elems");

    private _headerElemsComponent: HeaderElemsComponent;
    private _userInfoComponent: UserInfoComponent;

    createHandlers(){
        this._headerElemsComponent.createHandlers();
        if (this.data.user != null) this._userInfoComponent.createHandlers();
    }

    render() {
    	return `${headerTemplate(this.data)}`;
    }

    async renderUserInfo() {
        if (data.userAds == null) {
            const result = await getUserAdsNumber(this.data.user.id);
            console.log(result);
            data.userAds = Number.parseInt(result.message);
        }
        this.data.userAds = data.userAds;
    	this._userInfoComponent = new UserInfoComponent(this.data, this.parent.querySelector(this._headSelector.selector));
        this._userInfoComponent.renderTo(this._userInfoBlockSelector);
    }

    renderHeaderElems() {
        this._headerElemsComponent = new HeaderElemsComponent(this.data, this.parent.querySelector(this._headSelector.selector));
        this._headerElemsComponent.renderTo(this._headerElemsBlockSelector);
    }

    async renderTo(selectorString: SelectorString) {
    	this.parent.querySelector(selectorString.selector).innerHTML = this.render();
    	if (this.data.user != null) await this.renderUserInfo();
        this.renderHeaderElems();
    }
}

export default HeaderComponent;