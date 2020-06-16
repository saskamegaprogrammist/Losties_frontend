import BasicComponent from "../BasicComponent";
import SelectorString from "../../utils/SelectorString";
import PrimitiveComponent from "../PrimitiveComponent/PrimitiveComponent";
import './user-page.scss';
import {data, router} from "../../main";
import UserListComponent from "@components/UserPage/UserList/UserListComponent";
import UserFormComponent from "@components/UserPage/UserForm/UserFormComponent";
import {userNavigate} from "@handlers/userPageHandlers";
import UserAdsComponent from "@components/UserPage/UserAds/UserAdsComponent";
import {Ad, AdType} from "@entities/Ad";
import UserNewAdComponent from "@components/UserPage/UserNewAd/UserNewAdComponent";
import {getUserAds} from "@queries/ad_user";

const userPageTemplate = require('./userPage.pug');

class UserPageComponent extends BasicComponent {

    private _headSelector: SelectorString =  new SelectorString(".main-container");
    private _userPageSelector: SelectorString =  new SelectorString(".user-page__main");
    private _navigateRefSelector: SelectorString = new SelectorString(".user-page__sidebar__list");
    private _primitiveComponent: PrimitiveComponent;
    private _pageType: string;
    private __innerComponent: BasicComponent;

    async create(identities: Array<string> = null, type: string = null) {
        if (type == "settings") {
            if (data.user == null) {
                router.go("main-page");
                return;
            }

        }
        this._pageType = type;
        await this.authorize();
        if (data.user == null) {
            router.go("main-page");
            return;
        }
        this.data.user = data.user;
        if (!this._primitiveComponent) {
            this._primitiveComponent = new PrimitiveComponent(this.data, this.parent);
            await this._primitiveComponent.render();
        }
        await this.renderTo(this._headSelector);
        this.createHandlers();
    }

    createHandlers() {
        this._primitiveComponent.createHandlers();
        this.__innerComponent.createHandlers();
        userNavigate(this, this._navigateRefSelector);
    }

    renderUserList() {
        const userListComponent = new UserListComponent(this.data, this.parent.querySelector(this._headSelector.selector));
        userListComponent.renderTo(this._userPageSelector);
        this.__innerComponent = userListComponent;
    }

    renderUserForm() {
        const userFormComponent = new UserFormComponent(this.data, this.parent.querySelector(this._headSelector.selector));
        userFormComponent.renderTo(this._userPageSelector);
        this.__innerComponent = userFormComponent;
    }

    renderUserNewAd() {
        const userNewAdComponent = new UserNewAdComponent(this.data, this.parent.querySelector(this._headSelector.selector));
        userNewAdComponent.renderTo(this._userPageSelector);
        this.__innerComponent = userNewAdComponent;
    }

    async renderUserAds() {
        data.ads = await getUserAds(data.user.id, data.currentAdType);
        this.data.ads = data.ads;
        const userAdsComponent = new UserAdsComponent(this.data, this.parent.querySelector(this._headSelector.selector));
        userAdsComponent.renderTo(this._userPageSelector);
        this.__innerComponent = userAdsComponent;
    }

    render() {
        return `${userPageTemplate(this.data)}`;
    }

    async renderTo(selectorString: SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML += this.render();
        if (this._pageType == "user") this.renderUserList();
        if (this._pageType == "settings") this.renderUserForm();
        if (this._pageType == "ads") await this.renderUserAds();
        if (this._pageType == "new-ad") this.renderUserNewAd();
    }

    hideNavColor(ref: HTMLElement) {
        if (ref.classList.contains(`user-page__sidebar-item_style_at`)){
            ref.classList.remove(`user-page__sidebar-item_style_at`);
        }
    }

    showNavColor(ref: HTMLElement) {
        if (!ref.classList.contains(`user-page__sidebar-item_style_at`)){
            ref.className = `${ref.className} user-page__sidebar-item_style_at`;
        }
        ref.parentElement.childNodes.forEach(node => {
            if ((node as HTMLElement) !== ref) {
                this.hideNavColor(node as HTMLElement);
            }
        });
    }
}

export default UserPageComponent;