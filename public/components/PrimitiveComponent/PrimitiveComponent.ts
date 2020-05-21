import BasicComponent from "../BasicComponent";
import HeaderComponent from "./Header/HeaderComponent";
import SelectorString from "../../utils/SelectorString";
import './primitive.scss';
import MainContainerComponent from "./MainContainer/MainContainerComponent";
import EditableObject from "../../utils/EditableObject";
import {data} from "../../main";

class PrimitiveComponent extends BasicComponent {

	private _headSelector: SelectorString =  new SelectorString(".primitive");
	private _headerComponent: HeaderComponent;
	private _containerComponent: MainContainerComponent;
	private static __instance: PrimitiveComponent;

	constructor(data: EditableObject, parent: HTMLElement) {
		super(data, parent);
		if (PrimitiveComponent.__instance) {
			PrimitiveComponent.__instance.data = data;
			PrimitiveComponent.__instance.parent = parent;
			return PrimitiveComponent.__instance;
		}
		PrimitiveComponent.__instance = this;
	}

	createHandlers() {
		this._headerComponent.createHandlers();
	}

	rerender() {
		console.log(this.data);
		this._headerComponent.data = this.data;
		this._containerComponent.data = this.data;
		this._headerComponent.renderTo(this._headSelector);
		this._containerComponent.renderTo(this._headSelector);
	}

	render() {
		this.data.user = data.user;
		if (this._headerComponent) {
			this.rerender();
		} else {
			const baseBlock = document.createElement('div');
			baseBlock.className = 'primitive primitive_size';
			this.parent.appendChild(baseBlock);
			this._headerComponent = new HeaderComponent(this.data, this.parent);
			this._headerComponent.renderTo(this._headSelector);
			this._containerComponent = new MainContainerComponent(this.data, this.parent);
			this._containerComponent.renderTo(this._headSelector);
		}
	}
}

export default PrimitiveComponent;