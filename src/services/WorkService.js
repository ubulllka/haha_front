import {checkAuth} from "./helper";

const baseUrl = "http://localhost:8080/api/res/"

export async function createWork(id, work, token) {//post, description, start_time, end_time (01-02-2006)
    const url = baseUrl + id + "/work"
    const result = await fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(work),
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}

export async function updateWork(id, work, token) {//post, description, start_time, end_time (01-02-2006)
    const url = baseUrl + "work/" + id
    const result = await fetch(`${url}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
        body: JSON.stringify(work),
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}

export async function deleteWork(id, token) {
    const url = baseUrl + "work/" + id
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
