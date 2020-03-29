import BasicComponent from "../../../BasicComponent";
const headerElemsTemplate = require('./headerElems.pug');
import './header-elems.scss'
import SelectorString from "../../../../utils/SelectorString";
import {refHandler} from "../../../../handlers/refsHandlers";

class HeaderElemsComponent extends BasicComponent {

    private _headerRef: SelectorString =  new SelectorString(".header-elems__ref");

    createHandlers() {
        refHandler(this._headerRef);
    }

    render() {
        return `${headerElemsTemplate(this.data)}`;
    }

    renderTo(selectorString: SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML = this.render();
    }
}

export default HeaderElemsComponent;