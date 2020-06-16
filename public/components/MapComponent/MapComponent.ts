import BasicComponent from "@components/BasicComponent";
import SelectorString from "@utils/SelectorString";
import './map.scss';
// @ts-ignore
import ymaps from "ymaps";
import {data, router} from "../../main";
import {getAd} from "@queries/ad";
import {Ad} from "@entities/Ad";
import {ArgTypes, RouteArgument} from "@utils/RouteArgument";

class MapComponent extends BasicComponent {

    initMapSelect(maps: any) {
        const map = new maps.Map('map', {
            center: [55.76, 37.64],
            zoom: 7,
        }, {
            balloonMaxWidth: 200,
            searchControlProvider: 'yandex#search'
        });

        map.events.add('click', (event: any) => {
            if (!map.balloon.isOpen()) {
                const coords  = event.get('coords');
                data.coordsChosen = coords;
                map.balloon.open(coords, {
                    contentBody: `<div class="map__section map__section_style"> event happened here </div>`
                });
            } else {
                event.balloon.close();
            }
        });

    }

    initMapAd(maps: any) {
        const map = new maps.Map('map', {
            center: [55.76, 37.64],
            zoom: 7,
        }, {
            balloonMaxWidth: 200,
            searchControlProvider: 'yandex#search'
        });
        map.geoObjects.add(new maps.Placemark([this.data.coords.x, this.data.coords.y], this.renderBaloon(), {
            preset: 'islands#oliveDotIcon'
        }));
    }

    async initMapAllAds(maps: any) {
        const map = new maps.Map('map', {
            center: [55.76, 37.64],
            zoom: 7,
        }, {
            balloonMaxWidth: 200,
            searchControlProvider: 'yandex#search'
        });

        const clusterer = new maps.Clusterer({
            preset: 'islands#invertedOliveClusterIcons',
            groupByCoordinates: false,
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
        });
        const getPointOptions = function () {
            return {
                balloonPanelMaxMapArea: 0,
                draggable: "true",
                openEmptyBalloon: true,
                preset: 'islands#oliveDotIcon'
            };
        };
        const geoObjects: any = [];
        for (let i = 0; i < this.data.coords.length; i++) {
           const placemark = new maps.Placemark([this.data.coords[i].x, this.data.coords[i].y], {hintContent: "Click for more"}, getPointOptions());
            placemark.events.add('balloonopen', async () => {
                placemark.properties.set('balloonContent', `<div class="map__section map__section_style"> Wait...</div>`);
                const ad = await getAd(this.data.coords[i].adid);
                placemark.properties.set('balloonContent', `<div class="map__title map__title_style">${ad.title}</div>\n<div class="map__section map__section_style">${ad.text}</div>`);
                }
            );
            placemark.balloon.events.add('click', () => {
                data.chosenAdId = Number.parseInt(this.data.coords[i].adid);
                console.log(data.chosenAdId);
                router.go("ad-page", new RouteArgument(this.data.coords[i].adid, ArgTypes.id))
            });
            geoObjects[i] = placemark;
        }

        clusterer.add(geoObjects);
        map.geoObjects.add(clusterer);
        map.setBounds(clusterer.getBounds(), {
            checkZoomRange: true
        });
    }


    async renderMap() {
        try {
            const maps = await ymaps.load("https://api-maps.yandex.ru/2.1/?apikey=9710ef2c-031a-40e9-b749-51beae7de907&lang=en_US");
            if (this.data.mapType === "select") {
                this.initMapSelect(maps);
            }
            if (this.data.mapType === "ad") {
                this.initMapAd(maps);
            }
            if (this.data.mapType === "allAds") {
                this.initMapAllAds(maps);
            }
        } catch (error) {
            console.log('Failed to load Yandex Maps', error);
        }
    }



    renderBaloon() {
        return {
            balloonContentHeader: `<div class="map__title map__title_style">${this.data.ad.title}</div>`,
            balloonContentBody: `<div class="map__section map__section_style">${this.data.ad.text}</div>`
        }
    }


    renderTo(selectorString: SelectorString) {
        this.renderMap();
        this.createHandlers();
    }
}

export default MapComponent;