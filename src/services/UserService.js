import $api from "../http";


export default class UserService {
    static async getInfo(token) {
        return $api.send(`/user/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        })
    }

    static async updateInfo(user, token) {
        return $api.send(`/user/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(user),
        })
    }

    static async getUser(id) {
        return $api.send(`/user/${id}`, {})
    }

    static async isUser(id, token) {
        return $api.send(`/user/${id}/is`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        })
    }

    static async getList(token) {
        return $api.send(`/user/list`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        })
    }

    static async getListPag(id, page) {
        return $api.send(`/user/${id}/listpag?page=${page}`, {})
    }

    static async getMyListPag(token, page) {
        return $api.send(`/user/listmypag?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        })
    }
}


