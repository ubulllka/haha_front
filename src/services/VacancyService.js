import {checkAuth} from "./helper";

const baseUrl = "http://localhost:8080/api/vac/"
const baseUrlAnon = "http://localhost:8080/api/vaca/"

// export async function getAllVacancies() {
//     const result = await fetch(`${baseUrl}`)
//     return result.json()
// }

export async function searchVacanciesAnon(page, q) {
    const url = baseUrlAnon + `search?page=${page}&q=${q}`
    const result = await fetch(`${url}`)
    return result.json()
}

export async function getVacancyAnon(id) {
    const url = baseUrlAnon + id
    const result = await fetch(`${url}`)
    return result.json()
}
export async function searchVacancies(page, q, token) {
    const url = baseUrl + `search?page=${page}&q=${q}`
    const result = await fetch(`${url}`,{headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },})
    return result.json()
}

export async function getVacancy(id, token) {
    const url = baseUrl + id
    const result = await fetch(`${url}`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
    })
    return result.json()
}

export async function createVacancy(vacancy, token) { //post, description
    const result = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
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
            'Authorization': "Bearer " + token,
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
            'Authorization': "Bearer " + token,
        },
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}


