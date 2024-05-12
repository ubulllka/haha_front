import {checkAuth} from "./helper";

const baseUrl = "http://localhost:8080/api/res/"
const baseUrlAnon = "http://localhost:8080/api/resa/"

// export async function getAllResumes() {
//     const result = await fetch(`${baseUrl}`)
//     return result.json()
// }

export async function searchResumesAnon(page, q) {
    const url = baseUrlAnon + `search?page=${page}&q=${q}`
    const result = await fetch(`${url}`)
    return result.json()
}

export async function getResumeAnon(id) {
    const url = baseUrlAnon + id
    const result = await fetch(`${url}`)
    return result.json()
}
export async function searchResumes(page, q, token) {
    const url = baseUrl + `search?page=${page}&q=${q}`
    const result = await fetch(`${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
    })
    return result.json()
}

export async function getResume(id, token) {
    const url = baseUrl + id
    const result = await fetch(`${url}`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
    })
    return result.json()
}

export async function createResume(resume, token) { //big gg
    const result = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
        body: JSON.stringify(resume),
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}

export async function updateResume(id, resume, token) { //post, description
    const url = baseUrl + id
    const result = await fetch(`${url}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
        },
        body: JSON.stringify(resume),
    })
    if (result.status !== 200) return null
    return checkAuth(result) ? result.json() : null
}

export async function deleteResume(id, token) {
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


