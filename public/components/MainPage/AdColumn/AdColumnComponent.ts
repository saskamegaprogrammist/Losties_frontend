import BasicComponent from "../../BasicComponent";
const adColumnTemplate = require('./adColumn.pug');
import './ad-column.scss';
import SelectorString from "../../../utils/SelectorString";

class AdColumnComponent extends BasicComponent {

    render() {
        return `${adColumnTemplate(this.data)}`;
    }

    renderTo(selectorString:SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML = this.render();
    }
}

export default AdColumnComponent;