import BasicComponent from "../BasicComponent";
const formsPageTemplate = require('./formsPage.pug');
import SelectorString from "../../utils/SelectorString";
import PrimitiveComponent from "../PrimitiveComponent/PrimitiveComponent";
import './forms-page.scss'
import {formHandler} from "@handlers/formsHandlers";

class FormsPageComponent extends BasicComponent {

    private _headSelector: SelectorString =  new SelectorString(".main-container");
    private _formSelector: SelectorString =  new SelectorString(".forms-page__form");
    private _submitSelector: SelectorString =  new SelectorString(".forms-page__button");
    private _primitiveComponent: PrimitiveComponent = null;

    createHandlers() {
        this._primitiveComponent.createHandlers();
        formHandler(this._formSelector, this._submitSelector);

    }

    create(identities: Array<string> = null, type: string = null) {
        this.data.formType = type;
        this._primitiveComponent = new PrimitiveComponent(this.data, this.parent);
        this._primitiveComponent.render();
        this.renderTo(this._headSelector);
        this.createHandlers();
    }

    render() {
        return `${formsPageTemplate(this.data)}`;
    }

    renderTo(selectorString: SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML = this.render();
    }
}

export default FormsPageComponent;