import BasicComponent from "../BasicComponent";
const mainPageTemplate = require('./mainPage.pug');
import SelectorString from "../../utils/SelectorString";
import AdColumnComponent from "./AdColumn/AdColumnComponent"
import PrimitiveComponent from "../PrimitiveComponent/PrimitiveComponent";
import './main-page.scss';
import {data} from "../../main";
import {saveUser} from "@handlers/basicActions";
class MainPageComponent extends BasicComponent {

    private _headSelector: SelectorString =  new SelectorString(".main-container");
    private _adColumnSelector: SelectorString =  new SelectorString(".ad-column");
    private _primitiveComponent: PrimitiveComponent;

    async create(identities: Array<string> = null) {
        await this.authorize();
        this.data.user = data.user;
        if (!this._primitiveComponent) {
            this._primitiveComponent = new PrimitiveComponent(this.data, this.parent);
            this._primitiveComponent.render();
        }
        this.renderTo(this._headSelector);
        this.createHandlers();
    }

    createHandlers() {
        this._primitiveComponent.createHandlers();
    }

    render() {
        return `${mainPageTemplate(this.data)}`;
    }

    renderAdsColumn() {
        const adColumnComponent = new AdColumnComponent({}, this.parent.querySelector(this._headSelector.selector));
        adColumnComponent.renderTo(this._adColumnSelector);
    }

    renderTo(selectorString: SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML += this.render();
        this.renderAdsColumn();
    }
}

export default MainPageComponent;