import BasicComponent from "../../BasicComponent";
const headerTemplate = require('./header.pug');
import UserInfoComponent from "./UserInfo/UserInfoComponent";

class HeaderComponent extends BasicComponent {

    headSelector = "header";
    userInfoBlockSelector = "user-info";

    render() {
    	return `${headerTemplate(this._data)}`;
    }

    renderUserInfo() {
    	const userInfoComponent = new UserInfoComponent({}, this._parent.querySelector(`.${this.headSelector}`));
    	userInfoComponent.renderTo(`.${this.userInfoBlockSelector}`);
    }

    renderTo(selector) {
    	console.log(selector, this._parent);
    	this._parent.querySelector(selector).innerHTML = this.render();
    	this.renderUserInfo();
    }
}

export default HeaderComponent;