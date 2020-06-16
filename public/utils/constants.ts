const responseStatuses: { [key: number]: string } = {
    200 : "OK" ,
    201 : "Created" ,
    304 : "Not Modified",
    400 : "Bad Request",
    401 : "Unauthorized",
    403 : "Forbidden",
    404 : "Not Found",
    409 : "Conflict",
    500 : "Internal Server Error",
};

const API = {
    auth: '/auth',
    logout: '/logout',
    login: '/login',
    signup : '/signup',
    allCoords : '/coords',
    user: (id: number) => {
        return `/user/${id}`;
    },
    newAd: (id: number) => {
        return `/user/${id}/ad`;
    },
    userAds: (id: number, type: number) => {
        return `/user/${id}/ads?type=${type}`;
    },
    userAdsNumberAndType: (id: number, type: number) => {
        return `/user/${id}/ads/number?type=${type}`;
    },
    userAdsNumber: (id: number) => {
        return `/user/${id}/ads/number`;
    },
    adPet: (id: number) => {
        return `/ad/${id}/pet`;
    },
    adCoords: (id: number) => {
        return `/ad/${id}/coords`;
    },
    adComments: (id: number) => {
        return `/ad/${id}/comments`;
    },
    newComment: (id: number) => {
        return `/ad/${id}/comment`;
    },
    ad: (id: number) => {
        return `/ad/${id}`;
    },
    allAds: (type: number) => {
        return `/ads?type=${type}`;
    },
    allAdsSorted: (type: number, sort: string) => {
        return `/ads?type=${type}&sort=${sort}`;
    },
    searchAds: (search: string) => {
        return `/ads?search=${search}`;
    },
    adPic: (id: number) => {
        return `/ad/${id}/pic`;
    },
    userPic: (id: number) => {
        return `/user/${id}/pic`;
    },
};

const adsSortOptions = ["comments", "date"];


export {API, responseStatuses, adsSortOptions}