const baseUrl = "http://localhost:8080/api/appl/"

export async function getApplAllResumes(token) {
    const result = await fetch(`${baseUrl}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })
    return result.json()
}