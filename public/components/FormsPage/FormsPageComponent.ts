import BasicComponent from "../BasicComponent";
const formsPageTemplate = require('./formsPage.pug');
import SelectorString from "../../utils/SelectorString";
import PrimitiveComponent from "../PrimitiveComponent/PrimitiveComponent";

class FormsPageComponent extends BasicComponent {

    private _headSelector : SelectorString =  new SelectorString(".main-container__row");

    create(identities: Array<string> = null, type : string = null) {
        this.data.formType = type;
        const primitiveComponent : PrimitiveComponent = new PrimitiveComponent({}, this.parent);
        primitiveComponent.render();
        this.renderTo(this._headSelector);
    }

    render() {
        return `${formsPageTemplate(this.data)}`;
    }

    renderTo(selectorString:SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML += this.render();
    }
}

export default FormsPageComponent;