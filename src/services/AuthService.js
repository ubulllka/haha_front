import $api from '../http';
export default class AuthService {
    static async singIn(user) {
        return $api.send(`/auth/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
    }
    static async singUp(user) {
        return $api.send(`/auth/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
    }
}

