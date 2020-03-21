import 'bootstrap/dist/css/bootstrap.min.css';
import PrimitiveComponent from "./components/PrimitiveComponent/PrimitiveComponent";

const application = document.getElementById('application');
const BasicComponent = new PrimitiveComponent({}, document);
BasicComponent.renderTo("#application");