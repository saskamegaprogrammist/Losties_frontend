import BasicComponent from "../BasicComponent";
const formsPageTemplate = require('./formsPage.pug');
import SelectorString from "../../utils/SelectorString";
import PrimitiveComponent from "../PrimitiveComponent/PrimitiveComponent";
import './forms-page.scss'
import {formHandler, SignUpFormElements} from "@handlers/formsHandlers";
import {saveUser} from "@handlers/basicActions";

class FormsPageComponent extends BasicComponent {

    private _headSelector: SelectorString =  new SelectorString(".main-container");
    private _formSelector: SelectorString =  new SelectorString(".forms-page__form");
    private _submitSelector: SelectorString =  new SelectorString(".forms-page__button");
    private _errorFieldSelector: SelectorString =  new SelectorString(".form__error");
    private _primitiveComponent: PrimitiveComponent = null;

    createHandlers() {
        this._primitiveComponent.createHandlers();
        formHandler(this, this._formSelector, this._submitSelector);

    }

    async create(identities: Array<string> = null, type: string = null) {
        await this.authorize();
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

    showBackendError(error: Error) {
        const errorField = this.parent.querySelector(this._errorFieldSelector.selector);
        errorField.innerHTML = error.message;
        errorField.className = `${errorField.className} alert alert-danger`
    }

    hideBackendError() {
        const errorField = this.parent.querySelector(this._errorFieldSelector.selector);
        errorField.classList.remove('alert');
        errorField.classList.remove('alert-danger');
        errorField.innerHTML = "";
    }

    showFieldError(input: HTMLInputElement, message: string) {
        input.className = `${input.className} is-invalid`;
        const parentInput = input.parentElement;
        parentInput.querySelector(".invalid-feedback").innerHTML = message;

    }

    hideFieldError(input: HTMLInputElement) {
        input.classList.remove('is-invalid');
    }
}

export default FormsPageComponent;