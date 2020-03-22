import BasicComponent from "../../BasicComponent";
const containerTemplate = require('./main-container.pug');
import SelectorString from "../../../utils/SelectorString";
import './main-container.scss'
import AdColumnComponent from "./AdColumn/AdColumnComponent"

class MainContainerComponent extends BasicComponent {

    private _headSelector : SelectorString =  new SelectorString(".main-container");
    private _adColumnSelector : SelectorString =  new SelectorString(".ad-column");

    render() {
        return `${containerTemplate(this.data)}`;
    }

    renderAdsColumn() {
        const adColumnComponent = new AdColumnComponent({}, this.parent.querySelector(this._headSelector.selector));
        adColumnComponent.renderTo(this._adColumnSelector);
    }


    renderTo(selectorString:SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML += this.render();
        this.renderAdsColumn();
    }
}

export default MainContainerComponent;