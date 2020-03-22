import BasicComponent from "../../../BasicComponent";
const headerElemsTemplate = require('./headerElemsNoUser.pug');
import './header-elems.scss'
import SelectorString from "../../../../utils/SelectorString";

class HeaderElemsComponent extends BasicComponent {

    render() {
        return `${headerElemsTemplate(this.data)}`;
    }

    renderTo(selectorString:SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML = this.render();
    }
}

export default HeaderElemsComponent;