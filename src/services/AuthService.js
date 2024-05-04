const baseUrl = "http://localhost:8080/auth/"

export async function singIn(user) { //name, password
    const url = baseUrl + "sign-in"
    const result = await fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    if (result.status !== 200) return null
    return result.json()
}

export async function singUp(user) { //name, email, telegram, password, role
    const url = baseUrl + "sign-up"
    const result = await fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    if (result.status !== 200) return null
    return result.json()
}