class FetchData {
    private _headers: object;
    private _method: string;
    private _body: object;
    private _credentials: string;
    private _mode: string;

    constructor(headers: object = {}, method = 'GET', body: object = {}, credentials = 'include', mode = 'no-cors') {
        this._headers = headers;
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

    set headers(headers: object){
        this._headers = headers;
    }

    set mode(mode: string) {
        this._mode = mode;
    }

    set body(body: object ){
        this._body = body;
    }

    getObject(): object {
        return {
            method: this._method,
            mode: this._mode,
            credentials: this._credentials,
            body: JSON.stringify(this._body)
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

    createFetch({path = '/', method  = 'GET', data = {}, contentType = ''} = {}) {
        this._baseData.body = data;
        this._baseData.headers = {
            'Content-Type' : contentType
        };
        this._baseData.method = method;
        return fetch(encodeURI(`${this._url}${path}`), this._baseData.getObject());
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