class FetchData {
    private _ct: string;
    private _method: string;
    private _body: object;
    private _credentials: string;
    private _mode: string;

    constructor(ct = 'text/plain', method = 'GET', body: object = {}, credentials = 'include', mode = 'cors') {
        this._ct = ct;
        this._method= method;
        this._body = body;
        this._credentials = credentials;
        this._mode = mode;
    }

    set method(method: string){
        this._method = method;
    }

    set credentials(credentials: string){
        this._credentials = credentials;
    }

    set ct(ct: string){
        this._ct = ct;
    }

    set mode(mode: string) {
        this._mode = mode;
    }

    set body(body: object ){
        this._body = body;
    }

    getObject(): object {
        let body: any = null;
        if (this._ct !== "multipart/form-data" && Object.keys(this._body).length !== 0) {
            body = JSON.stringify(this._body);
        }
        if (this._ct === "multipart/form-data") {
            body = this._body;
        }
            return {
            method: this._method,
            mode: this._mode,
            credentials: this._credentials,
            body: body
        }
    }

}

class Fetch {

    private _url: string;
    private _baseData: FetchData;
    constructor(url = '/') {
        this._url = url;
        this._baseData = new FetchData();
    }

    async createFetch({path = '/', data = {}, contentType = '', method  = 'GET' } = {}) {
        this._baseData.body = data;
        this._baseData.ct = contentType;
        console.log(contentType);
        this._baseData.method = method;
        try {
            const obj: any =  this._baseData.getObject();
            console.log(obj);
            const response = await fetch(encodeURI(`${this._url}${path}`),obj);
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    post(params = {}) {
        return this.createFetch({...params, method : 'POST'});
    }

    get(params = {}) {
        return this.createFetch({...params, method : 'GET'});
    }

    put(params = {}) {
        return this.createFetch({...params, method : 'PUT'});
    }

    delete(params = {}) {
        return this.createFetch({...params, method : 'DELETE'});
    }

}

export default Fetch;