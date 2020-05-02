import Handler from "../utils/Handler";
import SelectorString from "../utils/SelectorString";
import {fetch} from "../main";
import {signup, SignUpArguments} from "@queries/user/user";

interface SignUpFormElements extends HTMLFormControlsCollection {
    firstname: HTMLInputElement;
    lastname: HTMLInputElement;
    phone: HTMLInputElement;
    password: HTMLInputElement;
    email: HTMLInputElement;
    nickname: HTMLInputElement;
}

const sendForm = async function (event: Event, form: HTMLFormElement) {
    event.preventDefault();
    const elements: SignUpFormElements = form.elements as SignUpFormElements;
    const response = await signup(new SignUpArguments(elements.email.value, elements.firstname.value,
        elements.lastname.value, elements.phone.value,
        elements.nickname.value, elements.password.value));
    console.log(response);

};

const formHandler: Handler = function (selectorForm: SelectorString, selectorSubmit: SelectorString) {
    const form: HTMLFormElement =  document.querySelector(selectorForm.selector);
    form.querySelector(selectorSubmit.selector).addEventListener('click', (event) => sendForm(event,form) );
};



export {formHandler};