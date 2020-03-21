import BasicComponent from "../BasicComponent";
import HeaderComponent from "./Header/HeaderComponent";

class PrimitiveComponent extends BasicComponent {

	headSelector = "main";

	render() {
		const baseBlock = document.createElement('div');
		baseBlock.className = 'main';
		return baseBlock;
	}

	renderTo(selector) {
		this._parent.querySelector(selector).appendChild(this.render());
		const headerComponent = new HeaderComponent({}, this._parent);
		headerComponent.renderTo(`.${this.headSelector}`);
	}
}

export default PrimitiveComponent;