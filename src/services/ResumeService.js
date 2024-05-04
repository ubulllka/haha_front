const baseUrl = "http://localhost:8080/api/res/"

export async function getAllResumes(token) {
    const result = await fetch(`${baseUrl}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
    return result.json()
}

export async function searchResumes(q, token) {
    const url = baseUrl + `search?q=${q}`
    const result = await fetch(`${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
    return result.json()
}

export async function getResume(id, token) {
    const url = baseUrl + id
    const result = await fetch(`${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
    return result.json()
}

export async function createResume(resume, token) { //big gg
    const result = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(resume),
    })
    if (result.status !== 200) return null
    return result.json()
}

export async function updateResume(id, resume, token) { //post, description
    const url = baseUrl + id
    const result = await fetch(`${url}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(resume),
    })
    if (result.status !== 200) return null
    return result.json()
}

export async function deleteResume(id, token) {
    const url = baseUrl + id
    const result = await fetch(`${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })
    if (result.status !== 200) return null
    return result.json()
}


