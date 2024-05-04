const baseUrl = "http://localhost:8080/api/empl/"

export async function getEmplAllVacancies(token) {
    const result = await fetch(`${baseUrl}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })
    return result.json()
}