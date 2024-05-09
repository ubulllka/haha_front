import {checkAuth} from "./helper";

const baseUrl = "http://localhost:8080/api/empl/"

export async function getEmplAllVacancies(token) {
    const result = await fetch(`${baseUrl}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })
    return checkAuth(result) ? result.json() : null
}