import BasicComponent from "../../BasicComponent";
const userFormTemplate = require('./userForm.pug');
import './user-form.scss';
import SelectorString from "../../../utils/SelectorString";
import {formHandler, SignUpFormElements} from "@handlers/formsHandlers";
import {userFormHandler} from "@handlers/userPageHandlers";

class UserFormComponent extends BasicComponent {


    private _formSelector: SelectorString =  new SelectorString(".user-page__form");
    private _submitButtonSelector: SelectorString =  new SelectorString(".user-page__sett-button");
    private _errorFieldSelector: SelectorString =  new SelectorString(".form__error");

    createHandlers() {
        userFormHandler(this, this._formSelector, this._submitButtonSelector);
    }

    render() {
        return `${userFormTemplate(this.data)}`;
    }

    renderTo(selectorString: SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML = this.render();
        this.addInputData();
    }

    addInputData() {
        const form: HTMLFormElement =  document.querySelector(this._formSelector.selector);
        const elements: SignUpFormElements = form.elements as SignUpFormElements;
        this.showInputData(elements.firstname, this.data.user.firstname);
        this.showInputData(elements.lastname, this.data.user.lastname);
        this.showInputData(elements.nickname, this.data.user.nickname);
        this.showInputData(elements.email, this.data.user.email);
        this.showInputData(elements.password, this.data.user.password);
        this.showInputData(elements.phone, this.data.user.phone);

    }

    showInputData(input: HTMLInputElement, message: string) {
        input.value = message;
    }

    showBackendError(error: Error) {
        const errorField = this.parent.querySelector(this._errorFieldSelector.selector);
        errorField.innerHTML = error.message;
        errorField.className = `${errorField.className} alert alert-danger`;
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

export default UserFormComponent;