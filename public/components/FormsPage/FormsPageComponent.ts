import BasicComponent from "../BasicComponent";
const formsPageTemplate = require('./formsPage.pug');
import SelectorString from "../../utils/SelectorString";
import PrimitiveComponent from "../PrimitiveComponent/PrimitiveComponent";
import './forms-page.scss'

class FormsPageComponent extends BasicComponent {

    private _headSelector: SelectorString =  new SelectorString(".main-container");

    private _primitiveComponent: PrimitiveComponent = null;

    createHandlers() {
        this._primitiveComponent.createHandlers();
    }

    create(identities: Array<string> = null, type: string = null) {
        this.data.formType = type;
        if (this._primitiveComponent === null) {
            this._primitiveComponent = new PrimitiveComponent(this.data, this.parent);
            this._primitiveComponent.render();
        } else {
            console.log('geg');
            this._primitiveComponent.rerender(this.data);
        }
        this.renderTo(this._headSelector);
        this.createHandlers();
    }

    render() {
        return `${formsPageTemplate(this.data)}`;
    }

    renderTo(selectorString: SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML = this.render();
    }
}

export default FormsPageComponent;