import BasicComponent from "../../../BasicComponent";
const userInfoTemplate = require('./userInfo.pug');
import './user-info.scss';
import SelectorString from "../../../../utils/SelectorString";

class UserInfoComponent extends BasicComponent {

	render() {
		return `${userInfoTemplate(this.data)}`;
	}

	renderTo(selectorString: SelectorString) {
		this.parent.querySelector(selectorString.selector).innerHTML = this.render();
	}
}

export default UserInfoComponent;