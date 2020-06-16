enum AdType {
    lost,
    found,
}

class Ad {
    id: number;
    type: AdType;
    date: Date;
    comments: number;
    userid: number;
    title: string;
    text: string;
    contacts: string;
    time: string;


    constructor(type: AdType, date: Date, comments: 0, userid: number, title: string, text: string, contacts: string, time: string, id?: number) {
        this.id = id;
        this.type = type;
        this.date = date;
        this.comments = comments;
        this.userid = userid;
        this.title = title;
        this.text =  text;
        this.contacts =  contacts;
        this.time = time;
    }

}

export {Ad, AdType};