const baseClientUrl = "http://localhost:3000"
export const checkAuth = (result) => {
    if (result.status !== 401) return true
    localStorage.setItem("token", "")
    localStorage.setItem("role", "ANON")
    alert("Ваши данные для входа устарели, войдите еще раз!")
    window.location = baseClientUrl + "/log"
}