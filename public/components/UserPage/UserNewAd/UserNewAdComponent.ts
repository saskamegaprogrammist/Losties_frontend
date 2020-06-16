import BasicComponent from "../../BasicComponent";
import './user-new-ad.scss';
import SelectorString from "../../../utils/SelectorString";
import {AdFormElements, adFormHandler, textAreaHandler, fileLabelHandler} from "@handlers/adFormHandlers";
import {AdType} from "@entities/Ad";
import MapComponent from "@components/MapComponent/MapComponent";

const userFormTemplate = require('./userNewAd.pug');

class UserNewAdComponent extends BasicComponent {


    private _textareaSelector: SelectorString = new SelectorString(".user-new-ad__textarea");
    private _formSelector: SelectorString =  new SelectorString(".user-new-ad__form");
    private _submitButtonSelector: SelectorString =  new SelectorString(".user-new-ad__sett-button");
    private _errorFieldSelector: SelectorString =  new SelectorString(".form__error");
    private _labelSelector: SelectorString = new SelectorString(".user-new-ad__label");
    private _fileInputSelector: SelectorString = new SelectorString(".custom-file-input");
    private _mapComponent: MapComponent;


    createHandlers() {
        adFormHandler(this, this._formSelector, this._submitButtonSelector);
        fileLabelHandler(this, this._fileInputSelector, this._labelSelector);
        textAreaHandler(this, this._textareaSelector);
    }

    render() {
        return `${userFormTemplate(this.data)}`;
    }

    renderTo(selectorString: SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML = this.render();
        this.renderMap();
    }

    renderMap() {
        this.data.mapType = "select";
        this._mapComponent = new MapComponent(this.data, this.parent.querySelector(this._formSelector.selector));
        this._mapComponent.renderTo(this._formSelector);
    }

    addInputData() {
        const form: HTMLFormElement =  document.querySelector(this._formSelector.selector);
        const elements: AdFormElements = form.elements as AdFormElements;
        this.showInputData(elements.title, this.data.ad.title);
        this.showTextAreaData(elements.text, this.data.ad.text);
        this.showSelectData(elements.type, this.data.ad.type);
        this.showInputData(elements.time, this.data.ad.time);
        this.showInputData(elements.contacts, this.data.ad.contacts);
        this.showInputData(elements.petName, this.data.pet.name);
        this.showInputData(elements.petSpecies, this.data.pet.species);
        this.showInputData(elements.petBreed, this.data.pet.breed);
        this.showInputData(elements.petColor, this.data.pet.color);
    }

    showInputData(input: HTMLInputElement, message: string) {
        input.value = message;
    }

    showTextAreaData(textArea: HTMLTextAreaElement, message: string) {
        textArea.value = message;
    }

    showSelectData(select: HTMLSelectElement, adType: AdType) {
        if (adType == AdType.lost) {
            select.value = "lost";
        }
        if (adType == AdType.found) {
            select.value = "found";
        }
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

    showFieldError(input: HTMLElement, message: string) {
        input.className = `${input.className} is-invalid`;
        const parentInput = input.parentElement;
        parentInput.querySelector(".invalid-feedback").innerHTML = message;

    }

    hideFieldError(input: HTMLElement) {
        input.classList.remove('is-invalid');
    }
}

export default UserNewAdComponent;