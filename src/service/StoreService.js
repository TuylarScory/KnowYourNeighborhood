export const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';

const request = (options) => {

    const headers = new Headers({

        'Content-Type': 'application/json',

    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {

        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))

    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 

        response.json().then(json => {

            if(!response.ok) {

                return Promise.reject(json);

            }

            return json;

        })
    );
};

//Get Current User Profile - Private Route
export function getCurrentUser() {

    if(!localStorage.getItem(ACCESS_TOKEN)) {

        return Promise.reject("No access token set.");

    }

    return request({

        url: API_BASE_URL + "/kyn/user/me",
        method: 'GET'

    });
}

//View Store  - Private Route
export function viewStores() {

    console.log("View Store");
    if(!localStorage.getItem(ACCESS_TOKEN)) {

        return Promise.reject("No access token set.");

    }

    return request({

        url: API_BASE_URL + "/kyn/view-store",
        method: 'GET'

    });
}

//Search Store  - Private Route
export function searchStoreByKey(key) {
    
    console.log("Search Store");
    if(!localStorage.getItem(ACCESS_TOKEN)) {

        return Promise.reject("No access token set.");

    }

    console.log("Search Selected Store from Service" + key);
    return request({

        url: API_BASE_URL + "/kyn/store/search/" + key, 
        method: "GET",
        data: JSON.stringify(key)

    });
    
}

//Get Store by Id - Private Route
export function getStoreById(sid) {

    console.log("Get Store by ID");
    if(!localStorage.getItem(ACCESS_TOKEN)) {

        return Promise.reject("No access token set.");

    }

    console.log("Get Store from Service" + sid);
    return request({
        
        url: API_BASE_URL + "/kyn/store/" + sid,
        method: "GET",
        data: JSON.stringify(sid)

    });
}

//Post Login User - Public Route
export function login(loginRequest) {

    return request({

        url: API_BASE_URL + "/kyn/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)

    });
}

//Post Register User - Public Route
export function signup(signupRequest) {

    return request({

        url: API_BASE_URL + "/kyn/register",
        method: 'POST',
        body: JSON.stringify(signupRequest)
        
    });
}




