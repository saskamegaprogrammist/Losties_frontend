import 'bootstrap/dist/css/bootstrap.min.css';
import './components/main.scss'
import PrimitiveComponent from "./components/PrimitiveComponent/PrimitiveComponent";
import Router from "./utils/Router";
import Route from "./utils/Route";
import MainPageComponent from "./components/MainPage/MainPageComponent";
import FormsPageComponent from "./components/FormsPage/FormsPageComponent";
const application = document.getElementById('application');

const router = new Router(application);
router.register(new Route(null, "main-page", "", MainPageComponent));
router.register(new Route(null, "signup", "signup", FormsPageComponent));
router.register(new Route(null, "login", "login", FormsPageComponent));
router.start();

export {router};