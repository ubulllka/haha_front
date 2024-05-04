const baseUrl = "http://localhost:8080/api/user/"

export async function getInfo(token) {
    const result = await fetch(`${baseUrl}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })
    return result.json()
}

export async function updateInfo(user, token) { //name, email, telegram, password, status
    const result = await fetch(`${baseUrl}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(user),
    })
    return result.json()
}
