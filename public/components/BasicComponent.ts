import SelectorString from "../utils/SelectorString";
import EditableObject from "../utils/EditableObject";

class BasicComponent {
	private _data: EditableObject;
	private _parent: HTMLElement;

	constructor(data: EditableObject, parent: HTMLElement) {
		this._data = data;
		this._parent = parent;

	}
	get data() {
		return this._data;
	}

	set data(dataToSet: EditableObject) {
		this._data = {...dataToSet};
	}

	get parent() {
		return this._parent;
	}

	set parent(parent: HTMLElement) {
		this._parent = parent;
	}

	create(identities: Array<string> = null, type: string = null) {

	}

	render() {
	}

	renderTo(selector: SelectorString) {

	}
}

export default BasicComponent;