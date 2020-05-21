import BasicComponent from "../../BasicComponent";
const userFormTemplate = require('./userList.pug');
import './user-list.scss';
import SelectorString from "../../../utils/SelectorString";
import {changeProfileHandler} from "@handlers/userPageHandlers";

class UserListComponent extends BasicComponent {

    private _userSettingsButtonSelector: SelectorString =  new SelectorString(".user-page__list-button");

    createHandlers() {
        changeProfileHandler(this, this._userSettingsButtonSelector);
    }


    render() {
        return `${userFormTemplate(this.data)}`;
    }

    renderTo(selectorString: SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML = this.render();
    }
}

export default UserListComponent;