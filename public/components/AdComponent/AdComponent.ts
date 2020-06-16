import BasicComponent from "../BasicComponent";
const adTemplate = require('./ad.pug');
import './ad.scss';
import SelectorString from "../../utils/SelectorString";

class AdComponent extends BasicComponent {

    private _contentSelector: SelectorString =  new SelectorString(".ad__main");


    render() {
        return `${adTemplate(this.data)}`;
    }

    renderTo(selectorString: SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML += this.render();
    }
}

export default AdComponent;