import 'bootstrap/dist/css/bootstrap.min.css';
import '@components/main.scss'
import Router from "@utils/Router";
import Route from "@utils/Route";
import MainPageComponent from "@components/MainPage/MainPageComponent";
import FormsPageComponent from "@components/FormsPage/FormsPageComponent";
import Fetch from "@utils/Fetch";
import Data from "@entities/Data";
import UserPageComponent from "@components/UserPage/UserPageComponent";
import AdPageComponent from "@components/AdPage/AdPageComponent";


const fetch = new Fetch("http://localhost:5000");

const application = document.getElementById('application');
const data = new Data();
const router = new Router(application);
router.register(new Route(null, "main-page", "", MainPageComponent));
router.register(new Route(null, "signup", "signup", FormsPageComponent));
router.register(new Route(null, "login", "login", FormsPageComponent));
router.register(new Route(null, "user-page", "user", UserPageComponent));
router.register(new Route(router.find("user-page"), "user-settings", "settings", UserPageComponent));
router.register(new Route(router.find("user-page"), "user-ads", "ads", UserPageComponent));
router.register(new Route(router.find("user-page"), "user-new-ad", "new-ad", UserPageComponent));
router.register(new Route(null, "ad-page", "ad", AdPageComponent));

router.start();

export {router, fetch, data};