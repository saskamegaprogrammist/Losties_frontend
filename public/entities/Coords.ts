class Coords {
    id: number;
    adid: number;
    x: number;
    y: number;

    constructor(x: number, y: number, adid: number, id?: number) {
        this.id = id;
        this.adid = adid;
        this.x = x;
        this.y = y;
    }

}

export default Coords;