class Comment {
    id: number;
    adid: number;
    userid: number;
    text: string;
    date: Date;

    constructor(adid: number, userid: number,text: string, date: Date, id?: number) {
        this.id = id;
        this.date = date;
        this.userid = userid;
        this.adid = adid;
        this.text =  text;
    }

}

export default Comment;