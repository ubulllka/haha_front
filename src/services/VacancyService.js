import {checkAuth} from "./helper";

const baseUrl = "http://localhost:8080/api/vac/"

export async function getAllVacancies() {
    const result = await fetch(`${baseUrl}`)
    return result.json()
}

export async function searchVacancies(q) {
    const url = baseUrl + `search?q=${q}`
    const result = await fetch(`${url}`)
    return result.json()
}

export async function getVacancy(id) {
    const url = baseUrl + id
    const result = await fetch(`${url}`)
    return result.json()
}

export async function createVacancy(vacancy, token) { //post, description
    const result = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(vacancy),
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}

export async function updateVacancy(id, vacancy, token) { //post, description
    const url = baseUrl + id
    const result = await fetch(`${url}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(vacancy),
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}

export async function deleteVacancy(id, token) {
    const url = baseUrl + id
    const result = await fetch(`${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}


