import BasicComponent from "../../BasicComponent";
const containerTemplate = require('./mainContainer.pug');
import SelectorString from "../../../utils/SelectorString";
import './main-container.scss'
import AdColumnComponent from "../../MainPage/AdColumn/AdColumnComponent"

class MainContainerComponent extends BasicComponent {

    private _headSelector : SelectorString =  new SelectorString(".main-container");

    render() {
        return `${containerTemplate(this.data)}`;
    }

    renderTo(selectorString:SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML += this.render();
    }
}

export default MainContainerComponent;