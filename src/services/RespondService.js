import {checkAuth} from "./helper";

const baseUrl = "http://localhost:8080/api/respond/"

export async function getMyAllResponds(token, page, filter) {
    const url = baseUrl + `my?page=${page}&filter=${filter.join(",")}`
    const result = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}

export async function getOtherAllResponds(token, page, filter) {
    const url = baseUrl + `other?page=${page}&filter=${filter.join(",")}`
    const result = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}

export async function createRespond(respond, token) {
    const result = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
        body: JSON.stringify(respond),
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}

export async function updateRespond(respond, token) {
    const url = baseUrl + respond.id
    const result = await fetch(`${url}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
        body: JSON.stringify({
            status: respond.status
        }),
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}

export async function getMyRespond(id, token) {
    const url = baseUrl + id + "/my"
    const result = await fetch(`${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}

export async function getOtherRespond(id, token) {
    const url = baseUrl + id + "/other"
    const result = await fetch(`${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}

export async function deleteMyRespond(id, token) {
    const url = baseUrl + id + "/my"
    console.log(url)
    const result = await fetch(`${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}

export async function deleteOtherRespond(id, token) {
    const url = baseUrl + id + "/other"
    const result = await fetch(`${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}