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
    user: (id: number) => {
        return `/user/${id}`;
    },
};



export {API, responseStatuses}