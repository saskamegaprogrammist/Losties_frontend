import BasicComponent from "../../BasicComponent";
const headerTemplate = require('./header.pug');
import UserInfoComponent from "./UserInfo/UserInfoComponent";
import SelectorString from "../../../utils/SelectorString";
import './header.scss'
import HeaderElemsComponent from "./HeaderElems/HeaderElemsComponent";

class HeaderComponent extends BasicComponent {

    private _headSelector: SelectorString =  new SelectorString(".header");
    private _userInfoBlockSelector: SelectorString =  new SelectorString(".user-info");
    private _headerElemsBlockSelector: SelectorString =  new SelectorString(".header-elems");

    private _headerElemsComponent: HeaderElemsComponent;
    private _userInfoComponent: UserInfoComponent;

    createHandlers(){
        this._headerElemsComponent.createHandlers();
    }

    render() {
    	return `${headerTemplate(this.data)}`;
    }

    renderUserInfo() {
    	this._userInfoComponent = new UserInfoComponent({}, this.parent.querySelector(this._headSelector.selector));
        this._userInfoComponent.renderTo(this._userInfoBlockSelector);
    }

    renderHeaderElems() {
        this._headerElemsComponent = new HeaderElemsComponent(this.data, this.parent.querySelector(this._headSelector.selector));
        this._headerElemsComponent.renderTo(this._headerElemsBlockSelector);
    }

    renderTo(selectorString: SelectorString) {
    	this.parent.querySelector(selectorString.selector).innerHTML = this.render();
    	this.renderUserInfo();
        this.renderHeaderElems();
    }
}

export default HeaderComponent;