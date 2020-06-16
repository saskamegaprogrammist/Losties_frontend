import BasicComponent from "../BasicComponent";
import SelectorString from "../../utils/SelectorString";
import PrimitiveComponent from "../PrimitiveComponent/PrimitiveComponent";
import './ad-page.scss';
import {data, router} from "../../main";
import {getAd} from "@queries/ad";
import {getAdPet} from "@queries/pet";
import DateParser from "@utils/DateParser";
import {getUser} from "@queries/user";
import {getAdPic, getUserPicHeader} from "@handlers/picLoad";
import {getUserAdsNumber} from "@queries/ad_user";
import MapComponent from "@components/MapComponent/MapComponent";
import {getAdCoords} from "@queries/coords";
import AdComponent from "@components/AdComponent/AdComponent";
import {adRefHandler} from "@handlers/refsHandlers";
import CommentComponent from "@components/CommentComponent/CommentComponent";
import {getAdComments} from "@queries/comments";
import {commentInputHandler} from "@handlers/adPageHandlers";


const adPageTemplate = require('./adPage.pug');

class AdPageComponent extends BasicComponent {

    private _headSelector: SelectorString =  new SelectorString(".main-container");
    private _dateParser: DateParser = new DateParser();
    private _primitiveComponent: PrimitiveComponent;
    private _userImageSelector: SelectorString =  new SelectorString(".ad-page__sidebar__user-row__image");
    private _commentSelector: SelectorString =  new SelectorString(".ad-page__comments");
    private _pageType: string;
    private _mapComponent: MapComponent;
    private _commentTextArea: SelectorString =  new SelectorString(".ad-page__textarea");
    private _commentSubmit: SelectorString =  new SelectorString(".ad-page__sett-button");

    async create(identities: Array<string> = null, type: string = null) {
        this._pageType = type;
        await this.authorize();
        if (data.chosenAdId === null) {
            data.chosenAdId = Number.parseInt(identities[0]);
        }
        await this.getAllData();
        if (!this._primitiveComponent) {
            this._primitiveComponent = new PrimitiveComponent(this.data, this.parent);
            await this._primitiveComponent.render();
        }
        await this.renderTo(this._headSelector);
        await this.renderMap();
        await this.renderComments();
        this.createHandlers();
        getUserPicHeader(this, data.user.id, this._userImageSelector);
    }

    async getAllData() {
        this.data.ad = await getAd(data.chosenAdId);
        this.data.user = await getUser(this.data.ad.userid);
        const result = await getUserAdsNumber(this.data.user.id);
        this.data.userAds = Number.parseInt(result.message);
        this.data.ad.date = this._dateParser.parse(this.data.ad.date);
        this.data.pet = await getAdPet(this.data.ad.id);
        this.data.coords = await getAdCoords(this.data.ad.id);
        this.data.comments = await getAdComments(this.data.ad.id);
        this.data.me = data.user;
    }

    renderMap() {
        this.data.mapType = "ad";
        this._mapComponent = new MapComponent(this.data, this.parent.querySelector(this._headSelector.selector));
        this._mapComponent.renderTo(this._headSelector);
    }

    async renderComments() {
        const comments = this.data.comments;
        for (const comment of comments) {
            comment.date = this._dateParser.parse(comment.date);
            const commentUser = await getUser(comment.userid);
            const commentComponent = new CommentComponent({user: commentUser, comment: comment}, this.parent);
            commentComponent.renderTo(this._commentSelector);

        }
    }

    createHandlers() {
        this._primitiveComponent.createHandlers();
        commentInputHandler(this, this.data.ad.id, this._commentSubmit, this._commentTextArea);
        //this.__innerComponent.createHandlers();
    }

    render() {
        return `${adPageTemplate(this.data)}`;
    }

    async renderTo(selectorString: SelectorString) {
        this.parent.querySelector(selectorString.selector).innerHTML += this.render();
    }


}

export default AdPageComponent;