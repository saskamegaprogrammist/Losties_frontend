import {Handler} from "@utils/Handler";
import SelectorString from "@utils/SelectorString";
import {data, router} from "../main";
import UserPageComponent from "@components/UserPage/UserPageComponent";
import {ArgTypes, RouteArgument} from "@utils/RouteArgument";
import FormsPageComponent from "@components/FormsPage/FormsPageComponent";
import Validation from "@utils/Validation";
import {changeUser, login, signup} from "@queries/user";
import User from "@entities/User";
import {SignUpFormElements} from "@handlers/formsHandlers";
import UserFormComponent from "@components/UserPage/UserForm/UserFormComponent";
import BasicComponent from "@components/BasicComponent";
import UserAdsComponent from "@components/UserPage/UserAds/UserAdsComponent";
import {adPhotoPost, userPhotoPost} from "@queries/pic";

const userNavigate: Handler = function (component: BasicComponent, selector: SelectorString) {
    document.querySelector(selector.selector).addEventListener('click', (event) => {
        if (component instanceof UserPageComponent) {
            component.showNavColor((event.target as HTMLElement));
        }
        router.go((event.target as HTMLElement).dataset.section, new RouteArgument(String(data.user.id),ArgTypes.id));
    })
};

const adsNavigate: Handler = function (component: UserAdsComponent, selector: SelectorString) {
    document.querySelector(selector.selector).addEventListener('click', (event) => {
        data.setCurrentAdType((event.target as HTMLElement).dataset.section);
        router.go("user-ads", new RouteArgument(String(data.user.id), ArgTypes.id));
    })
};


const checkChanges = function (elements: UserFormElements): boolean {
    return elements.firstname.value == data.user.firstname &&
        elements.lastname.value == data.user.lastname &&
        elements.email.value == data.user.email &&
        elements.password.value == data.user.password &&
        elements.phone.value == data.user.phone &&
        elements.nickname.value == data.user.nickname ;
};


const validateInputs = function (component: UserFormComponent, elements: UserFormElements): boolean {
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
    if (checkChanges(elements) && elements.userPic.files === null) {
        component.showBackendError(new Error("Please, make some changes to your data"));
        valid = false;
    }
    return valid;
};

const hideInputErrors = function (component: UserFormComponent, elements: UserFormElements){
    component.hideFieldError(elements.firstname);
    component.hideFieldError(elements.lastname);
    component.hideFieldError(elements.nickname);
    component.hideFieldError(elements.email);
    component.hideFieldError(elements.phone);
    component.hideFieldError(elements.password);
};

interface UserFormElements extends SignUpFormElements {
    userPic: HTMLInputElement;
}


const sendForm = async function (component: UserFormComponent, event: Event, form: HTMLFormElement) {
    event.preventDefault();
    const elements: UserFormElements = form.elements as UserFormElements;
    if (validateInputs(component, elements)) {
        hideInputErrors(component, elements);
        try {
            const response= await changeUser(new User(elements.email.value, elements.password.value,  elements.firstname.value,
                elements.lastname.value, elements.phone.value,
                elements.nickname.value, data.user.id));
            data.user = response;
            if (elements.userPic.files !== null) {
                const formData = new FormData();
                formData.append(`userpic`, elements.userPic.files[0]);
                const result = await userPhotoPost(formData, response);
            }
            router.go("user-page", new RouteArgument(String(data.user.id), ArgTypes.id));
        } catch (error) {
            component.showBackendError(error);
        }
    }
};

const userFormHandler: Handler = function (component: UserFormComponent, selectorForm: SelectorString, selectorSubmit: SelectorString) {
    const form: HTMLFormElement =  document.querySelector(selectorForm.selector);
    form.querySelector(selectorSubmit.selector).addEventListener('click', (event) => sendForm(component, event,form) );
};


export {userNavigate, userFormHandler, adsNavigate}