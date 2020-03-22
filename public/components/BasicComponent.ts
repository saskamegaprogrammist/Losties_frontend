import SelectorString from "../utils/SelectorString";

class BasicComponent {
	private _data : object;
	private _parent : HTMLElement;

	constructor(data:object, parent:HTMLElement) {
		this._data = data;
		this._parent = parent;

	}
	get data() {
		return this._data;
	}

	set data(dataToSet:object) {
		this._data = {...dataToSet};
	}

	get parent() {
		return this._parent;
	}

	set parent(parent:HTMLElement) {
		this._parent = parent;
	}

	create() {

	}

	render() {
	}

	renderTo(selector:SelectorString) {

	}
}

export default BasicComponent;