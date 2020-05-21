import BasicComponent from "../BasicComponent";
const userPageTemplate = require('./userPage.pug');
import SelectorString from "../../utils/SelectorString";
import PrimitiveComponent from "../PrimitiveComponent/PrimitiveComponent";
import './user-page.scss';
import {data, router} from "../../main";
import UserListComponent from "@components/UserPage/UserList/UserListComponent";
import UserFormComponent from "@components/UserPage/UserForm/UserFormComponent";

class UserPageComponent extends BasicComponent {

    private _headSelector: SelectorString =  new SelectorString(".main-container");
    private _userPageSelector: SelectorString =  new SelectorString(".user-page__main");
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
            this._primitiveComponent.render();
        }
        this.renderTo(this._headSelector);
        this.createHandlers();
    }

    createHandlers() {
        this._primitiveComponent.createHandlers();
        this.__innerComponent.createHandlers();
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

    render() {
        return `${userPageTemplate(this.data)}`;
    }

    renderTo(selectorString: SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML += this.render();
        if (this._pageType == "user") this.renderUserList();
        if (this._pageType == "settings") this.renderUserForm();
    }
}

export default UserPageComponent;