import BasicComponent from "./../../../BasicComponent";
const userInfoTemplate = require('./userInfo.pug');
import './user-info.scss';

class UserInfoComponent extends BasicComponent {

	render() {
		return `${userInfoTemplate(this._data)}`;
	}

	renderTo(selector) {
	    console.log(this._parent.querySelector(selector));
		this._parent.querySelector(selector).innerHTML = this.render();
	}
}

export default UserInfoComponent;