import BasicComponent from "../../../BasicComponent";
const userInfoTemplate = require('./userInfo.pug');
import './user-info.scss';
import SelectorString from "../../../../utils/SelectorString";
import {refHandler, userRefHandler} from "@handlers/refsHandlers";
import {getUserPicHeader} from "@handlers/picLoad";
import {getUserAdsNumber} from "@queries/ad_user";
import {data} from "../../../../main";

class UserInfoComponent extends BasicComponent {

	private _userInfoRef: SelectorString =  new SelectorString(".user-info");
	private _userInfoImage: SelectorString =  new SelectorString(".user-info__image");


	createHandlers() {
		userRefHandler(this, this._userInfoRef);
	}

	render() {
		return `${userInfoTemplate(this.data)}`;
	}

	async renderTo(selectorString: SelectorString) {
		this.parent.querySelector(selectorString.selector).innerHTML = this.render();
		getUserPicHeader(this, data.user.id, this._userInfoImage);
	}
}

export default UserInfoComponent;