import BasicComponent from "../BasicComponent";
const mainPageTemplate = require('./mainPage.pug');
import SelectorString from "../../utils/SelectorString";
import AdColumnComponent from "./AdColumn/AdColumnComponent"
import PrimitiveComponent from "../PrimitiveComponent/PrimitiveComponent";

class MainPageComponent extends BasicComponent {

    private _headSelector: SelectorString =  new SelectorString(".main-container");
    private _adColumnSelector: SelectorString =  new SelectorString(".ad-column");

    create(identities: Array<string> = null) {
        const primitiveComponent: PrimitiveComponent = new PrimitiveComponent({}, this.parent);
        primitiveComponent.render();
        this.renderTo(this._headSelector);
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