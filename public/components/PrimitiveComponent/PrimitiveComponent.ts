import BasicComponent from "../BasicComponent";
import HeaderComponent from "./Header/HeaderComponent";
import SelectorString from "../../utils/SelectorString";
import './primitive.scss';
import MainContainerComponent from "./MainContainer/MainContainerComponent";

class PrimitiveComponent extends BasicComponent {

	private _headSelector: SelectorString =  new SelectorString(".primitive");

	render() {
		const baseBlock = document.createElement('div');
		baseBlock.className = 'primitive primitive_size';
		this.parent.appendChild(baseBlock);
		const headerComponent = new HeaderComponent(this.data, this.parent);
		headerComponent.renderTo(this._headSelector);
		const containerComponent = new MainContainerComponent(this.data, this.parent);
		containerComponent.renderTo(this._headSelector);
	}
}

export default PrimitiveComponent;