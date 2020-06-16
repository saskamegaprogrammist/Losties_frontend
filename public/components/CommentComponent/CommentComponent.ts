import BasicComponent from "../BasicComponent";
import SelectorString from "../../utils/SelectorString";
import PrimitiveComponent from "../PrimitiveComponent/PrimitiveComponent";
import './comment.scss';

const commentTemplate = require('./comment.pug');

class CommentComponent extends BasicComponent {
    private _contentSelector: SelectorString =  new SelectorString(".ad__main");


    render() {
        return `${commentTemplate(this.data)}`;
    }

    renderTo(selectorString: SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML += this.render();
    }

}

export default CommentComponent;