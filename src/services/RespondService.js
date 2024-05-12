import {checkAuth} from "./helper";

const baseUrl = "http://localhost:8080/api/respond/"

export async function getMyRespond(token, page, filter) {
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

export async function getOtherRespond(token, page, filter) {
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