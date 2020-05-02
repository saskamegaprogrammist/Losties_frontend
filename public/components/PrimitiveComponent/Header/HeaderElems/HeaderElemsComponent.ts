import BasicComponent from "@components/BasicComponent";
const headerElemsTemplate = require('./headerElems.pug');
import './header-elems.scss'
import SelectorString from "@utils/SelectorString";
import {refHandler} from "@handlers/refsHandlers";

class HeaderElemsComponent extends BasicComponent {

    private _headerRef: SelectorString =  new SelectorString(".header-elems__ref");
    private _logo: SelectorString =  new SelectorString(".header-elems__name");

    createHandlers() {
        refHandler(this._headerRef);
        refHandler(this._logo);
    }

    render() {
        return `${headerElemsTemplate(this.data)}`;
    }

    renderTo(selectorString: SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML = this.render();
    }
}

export default HeaderElemsComponent;