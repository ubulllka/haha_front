
const baseApiUrl = process.env.REACT_APP_BASE_API_URL + '/api/v1'
const baseClientUrl = process.env.REACT_APP_URL
export default class $api {
    static async send(url, hed) {
        const result = await fetch(`${baseApiUrl + url}`, hed)
        if (result.status !== 200) return null
        return checkAuth(result) ? result.json() : null
    }
}

const checkAuth = (result) => {
    if (result.status !== 401) return true
    localStorage.setItem("token", "")
    localStorage.setItem("role", "ANON")
    window.location = baseClientUrl + "/log"
    alert("Ваши данные для входа устарели, войдите еще раз!")
}


