import BasicComponent from "../../../BasicComponent";
const userInfoTemplate = require('./userInfo.pug');
import './user-info.scss';
import SelectorString from "../../../../utils/SelectorString";
import {refHandler, userRefHandler} from "@handlers/refsHandlers";

class UserInfoComponent extends BasicComponent {

	private _userInfoRef: SelectorString =  new SelectorString(".user-info");


	createHandlers() {
		userRefHandler(this, this._userInfoRef);
	}

	render() {
		return `${userInfoTemplate(this.data)}`;
	}

	renderTo(selectorString: SelectorString) {
		this.parent.querySelector(selectorString.selector).innerHTML = this.render();
	}
}

export default UserInfoComponent;