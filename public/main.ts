import 'bootstrap/dist/css/bootstrap.min.css';
import './components/main.scss'
import PrimitiveComponent from "./components/PrimitiveComponent/PrimitiveComponent";
const application = document.getElementById('application');
const BasicComponent = new PrimitiveComponent({}, application);
BasicComponent.render();