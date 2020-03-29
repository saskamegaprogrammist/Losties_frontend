import BasicComponent from "../BasicComponent";
import HeaderComponent from "./Header/HeaderComponent";
import SelectorString from "../../utils/SelectorString";
import './primitive.scss';
import MainContainerComponent from "./MainContainer/MainContainerComponent";
import EditableObject from "../../utils/EditableObject";

class PrimitiveComponent extends BasicComponent {

	private _headSelector: SelectorString =  new SelectorString(".primitive");
	private _headerComponent: HeaderComponent;
	private _containerComponent: MainContainerComponent;

	createHandlers() {
		this._headerComponent.createHandlers();
	}

	rerender(data: EditableObject) {
		this.data = data;
		this._headerComponent.data = this.data;
		this._containerComponent.data = this.data;
		this._headerComponent.renderTo(this._headSelector);
		this._containerComponent.renderTo(this._headSelector);
	}

	render() {
		const baseBlock = document.createElement('div');
		baseBlock.className = 'primitive primitive_size';
		this.parent.appendChild(baseBlock);
		this._headerComponent = new HeaderComponent(this.data, this.parent);
		this._headerComponent.renderTo(this._headSelector);
		this._containerComponent = new MainContainerComponent(this.data, this.parent);
		this._containerComponent.renderTo(this._headSelector);
	}
}

export default PrimitiveComponent;