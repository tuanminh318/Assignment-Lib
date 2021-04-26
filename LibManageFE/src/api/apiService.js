import axios from 'axios';

let API_URL = "https://localhost:44342/api";

export function callApi(endpoint, method = 'GET', body) {
    return axios({
        method,
        url: `${API_URL}/${endpoint}`,
        data: body,
    }).catch(e => {
        console.log(e)
    })
}

export function GET_ALL_BOOKS(endpoint) {
    return callApi(endpoint, "GET");
}

export function GET_BOOK_ID(endpoint, id) {
    return callApi(endpoint + "/" + id, "GET");
}

export function POST_ADD_BOOK(endpoint, data) {
    return callApi(endpoint, "POST", data);
}

export function PUT_EDIT_BOOK(endpoint, data) {
    return callApi(endpoint, "PUT", data);
}

export function DELETE_BOOK_ID(endpoint) {
    return callApi(endpoint, "DELETE");
}

export function GET_ALL_CATEGORIES(endpoint) {
    return callApi(endpoint, "GET");
}
export function GET_CATEGORY_ID(endpoint, id) {
    return callApi(endpoint + "/" + id, "GET");
}
export function PUT_EDIT_CATEGORY(endpoint, data) {
    return callApi(endpoint, "PUT", data);
}
export function POST_ADD_CATEGORY(endpoint, data) {
    return callApi(endpoint, "POST", data);
}

export function DELETE_CATEGORY_ID(endpoint) {
    return callApi(endpoint, "DELETE");
}