import {Handler} from "@utils/Handler";
import SelectorString from "@utils/SelectorString";
import {data, router} from "../main";
import {ArgTypes, RouteArgument} from "@utils/RouteArgument";
import UserNewAdComponent from "@components/UserPage/UserNewAd/UserNewAdComponent";
import {getUserAds, getUserAdsNumber, newAd} from "@queries/ad_user";
import {Ad, AdType} from "@entities/Ad";
import {newPet} from "@queries/pet";
import Pet from "@entities/Pet";
import {adPhotoPost} from "@queries/pic";
import BasicComponent from "@components/BasicComponent";
import {adCoords} from "@queries/coords";
import Coords from "@entities/Coords";


interface AdFormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    type: HTMLSelectElement;
    text: HTMLTextAreaElement;
    time: HTMLInputElement;
    contacts: HTMLInputElement;
    petName: HTMLInputElement;
    petSpecies: HTMLInputElement;
    petBreed: HTMLInputElement;
    petColor: HTMLInputElement;
    adPic: HTMLInputElement;
}

const textAreaHandler: Handler = function (component: UserNewAdComponent, selectorTextarea: SelectorString) {
    const textArea = document.querySelector(selectorTextarea.selector);
    textArea.addEventListener('input', (event) => {
        (textArea as HTMLElement).style.height = (textArea as HTMLElement).style.minHeight;
        (textArea as HTMLElement).style.height = String((textArea as HTMLElement).scrollHeight) + "px";
    } );
};

const validateInputs = function (component: UserNewAdComponent, elements: AdFormElements): boolean {
    let valid = true;
    component.hideBackendError();
    if (elements.type.value == "") {
        component.showFieldError(elements.type, "Please, select ad type");
        valid = false;
    }
    if (elements.text.value == "") {
        component.showFieldError(elements.text, "Please, fill this field");
        valid = false;
    }
    return valid;
};

const hideInputErrors = function (component: UserNewAdComponent, elements: AdFormElements){
    component.hideFieldError(elements.type);
    component.hideFieldError(elements.text);
};



const sendForm = async function (component: UserNewAdComponent, event: Event, form: HTMLFormElement) {
    event.preventDefault();
    event.target.removeEventListener('click', this);
    const elements: AdFormElements = form.elements as AdFormElements;
    let adType;
    if (elements.type.options.selectedIndex == 0) {
        adType = AdType.lost;
    } else {
        adType = AdType.found;
    }
    if (validateInputs(component, elements)) {
        hideInputErrors(component, elements);
        try {
            const response= await newAd(new Ad(adType, new Date(), 0, data.user.id, elements.title.value, elements.text.value, elements.contacts.value,
                elements.time.value));
            await newPet(new Pet(elements.petName.value, elements.petSpecies.value, elements.petBreed.value, elements.petColor.value, response.id));
            if (data.coordsChosen !== null) {
                await adCoords(new Coords(data.coordsChosen[0], data.coordsChosen[1], response.id));
            }
            if (elements.adPic.files[0] !== undefined) {
                const formData = new FormData();
                formData.append(`adpic`, elements.adPic.files[0]);
                const result = await adPhotoPost(formData, response);
            }
            data.ads = await getUserAds(data.user.id, adType);
            const result = await getUserAdsNumber(data.user.id);
            data.userAds = Number.parseInt(result.message);
            router.go("user-ads", new RouteArgument(String(data.user.id), ArgTypes.id));
        } catch (error) {
            component.showBackendError(error);
        }
    }
};

const adFormHandler: Handler = function (component: UserNewAdComponent, selectorForm: SelectorString, selectorSubmit: SelectorString) {
    const form: HTMLFormElement =  document.querySelector(selectorForm.selector);
    form.querySelector(selectorSubmit.selector).addEventListener('click', (event) => sendForm(component, event,form) );
};

const fileLabelHandler: Handler = function (component: BasicComponent, selectorFileInput: SelectorString, selectorLabel: SelectorString) {
    const fileInput: HTMLInputElement =  document.querySelector(selectorFileInput.selector);
    fileInput.addEventListener('change', (event) => {
        document.querySelector(selectorLabel.selector).innerHTML = fileInput.files[0].name;
    } );
};


export {textAreaHandler, AdFormElements, adFormHandler, fileLabelHandler}