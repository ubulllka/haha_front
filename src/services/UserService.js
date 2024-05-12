import {checkAuth} from "./helper";

const baseUrl = "http://localhost:8080/api/user/"

export async function getInfo(token) {
    const url = baseUrl
    const result = await fetch(`${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
    })
    return checkAuth(result) ? result.json() : null
}

export async function updateInfo(user, token) { //name, email, telegram, password, status
    const result = await fetch(`${baseUrl}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
        body: JSON.stringify(user),
    })
    return checkAuth(result) ? result.json() : null
}

export async function getUser(id) {
    const url = baseUrl + id
    const result = await fetch(`${url}`)
    return result.json()
}

export async function isUser(id, token) {
    const url = baseUrl + id +"/is"
    const result = await fetch(`${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
    })
    return checkAuth(result) ? result.json() : null
}

export async function getList(token) {
    const url = baseUrl + "list"
    const result = await fetch(`${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
    })
    return checkAuth(result) ? result.json() : null
}

export async function getListPag(id,page) {
    const url = baseUrl + id + "/listpag?page=" + page
    const result = await fetch(`${url}`)
    return checkAuth(result) ? result.json() : null
}

export async function getMyListPag(token, page) {
    const url = baseUrl + "listmypag?page=" + page
    const result = await fetch(`${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
    })
    return checkAuth(result) ? result.json() : null
}

