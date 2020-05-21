import SelectorString from "../utils/SelectorString";
import EditableObject from "../utils/EditableObject";
import {saveUser} from "@handlers/basicActions";

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

	async authorize() {
		await saveUser();
	}

	async create(identities: Array<string> = null, type: string = null) {
		await this.authorize();
	}

	render() {
		// implement this
	}

	renderTo(selector: SelectorString) {
		// implement this
	}

    createHandlers() {
        //implement this
    }
}

export default BasicComponent;