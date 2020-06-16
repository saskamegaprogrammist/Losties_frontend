class DateParser {

    private _rawDate: string;
    private _date: string;
    private _time: string;

    parse(rawDate: string): string {
        if (rawDate.includes("T")) {
            this._rawDate = rawDate;
            const dateArray = rawDate.split("T");
            const dayArray = dateArray[0].split("-");
            const timeArray = dateArray[1].split(":");
            this._date = dayArray[2] + "." + dayArray[1] + "." + dayArray[0];
            this._time = timeArray[0] + " : " + timeArray[1];
            return this.getFormattedDate();
        } else return rawDate;
    }

    get date() {
        return this._date;
    }

    get time() {
        return this._time;
    }

    getFormattedDate(): string {
        return this._date + " " + this._time;
    }

}

export default DateParser;