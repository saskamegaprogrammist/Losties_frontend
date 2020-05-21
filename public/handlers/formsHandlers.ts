import Handler from "../utils/Handler";
import SelectorString from "../utils/SelectorString";
import {login, signup} from "@queries/user/user";
import User from "@entities/User";
import BasicComponent from "@components/BasicComponent";
import FormsPageComponent from "@components/FormsPage/FormsPageComponent";
import Validation from "@utils/Validation";
import {data, router} from "../main";
import Data from "@entities/Data";

interface SignUpFormElements extends HTMLFormControlsCollection {
    firstname: HTMLInputElement;
    lastname: HTMLInputElement;
    phone: HTMLInputElement;
    password: HTMLInputElement;
    email: HTMLInputElement;
    nickname: HTMLInputElement;
}

interface LogInFormElements extends HTMLFormControlsCollection {
    password: HTMLInputElement;
    email: HTMLInputElement;
}

const validateInputsSignUp = function (component: FormsPageComponent, elements: SignUpFormElements): boolean {
    let valid = true;
    const validation = new Validation();
    component.hideBackendError();
    if (elements.firstname.value == "") {
        component.showFieldError(elements.firstname, "Please, fill this field");
        valid = false;
    }
    if (elements.lastname.value == "") {
        component.showFieldError(elements.lastname, "Please, fill this field");
        valid = false;
    }
    if (elements.password.value == "") {
        component.showFieldError(elements.password, "Please, fill this field");
        valid = false;
    }
    if (elements.email.value == "") {
        component.showFieldError(elements.email, "Please, fill this field");
        valid = false;
    }
    if (elements.nickname.value == "") {
        component.showFieldError(elements.nickname, "Please, fill this field");
        valid = false;
    }
    if (!validation.validateEmail(elements.email.value)) {
        component.showFieldError(elements.email, "Please, enter valid email");
        valid = false;
    }
    if (elements.phone.value != "" && !validation.validatePhone(elements.phone.value)) {
        component.showFieldError(elements.phone, "Please, enter valid phone");
        valid = false;
    }
    return valid;
};

const hideInputErrorsSignUp = function (component: FormsPageComponent, elements: SignUpFormElements){
    component.hideFieldError(elements.firstname);
    component.hideFieldError(elements.lastname);
    component.hideFieldError(elements.nickname);
    component.hideFieldError(elements.email);
    component.hideFieldError(elements.phone);
    component.hideFieldError(elements.password);
};

const validateInputsLogIn = function (component: FormsPageComponent, elements: LogInFormElements): boolean {
    let valid = true;
    const validation = new Validation();
    component.hideBackendError();
    if (elements.password.value == "") {
        component.showFieldError(elements.password, "Please, fill this field");
        valid = false;
    }
    if (elements.email.value == "") {
        component.showFieldError(elements.email, "Please, fill this field");
        valid = false;
    }
    if (!validation.validateEmail(elements.email.value)) {
        component.showFieldError(elements.email, "Please, enter valid email");
        valid = false;
    }
    return valid;
};

const hideInputErrorsLogIn = function (component: FormsPageComponent, elements: LogInFormElements){
    component.hideFieldError(elements.email);
    component.hideFieldError(elements.password);
};


const sendFormSignUp = async function (component: FormsPageComponent, form: HTMLFormElement) {
    const elements: SignUpFormElements = form.elements as SignUpFormElements;
    if (validateInputsSignUp(component, elements)) {
        hideInputErrorsSignUp(component, elements);
        try {
            const responseSignUp = await signup(new User(elements.email.value, elements.password.value,  elements.firstname.value,
                elements.lastname.value, elements.phone.value,
                elements.nickname.value));
            const responseLogIn = await login(new User(elements.email.value, elements.password.value));
            data.user = responseLogIn;
            router.go("main-page");
        } catch (error) {
            component.showBackendError(error);
        }
    }
};

const sendFormLogIn = async function (component: FormsPageComponent, form: HTMLFormElement) {
    const elements: LogInFormElements = form.elements as LogInFormElements;
    if (validateInputsLogIn(component, elements)) {
        hideInputErrorsLogIn(component, elements);
        try {
            const response = await login(new User(elements.email.value, elements.password.value));
            data.user = response;
            router.go("main-page");
        } catch (error) {
            component.showBackendError(error);
        }
    }
};

const sendForm = async function (component: FormsPageComponent, event: Event, form: HTMLFormElement) {
    event.preventDefault();
   if (data.page == "signup") await sendFormSignUp(component, form);
   if (data.page == "login") await sendFormLogIn(component, form);
};

const formHandler: Handler = function (component: FormsPageComponent, selectorForm: SelectorString, selectorSubmit: SelectorString) {
    const form: HTMLFormElement =  document.querySelector(selectorForm.selector);
    form.querySelector(selectorSubmit.selector).addEventListener('click', (event) => sendForm(component, event,form) );
};


export {formHandler, SignUpFormElements};