import $api from '../http';

export default class RespondService {
    static async getMyAllResponds(token, page, filter) {
        return $api.send(`/respond/my?page=${page}&filter=${filter.join(",")}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        })
    }

    static async getOtherAllResponds(token, page, filter) {
        return $api.send(`/respond/other?page=${page}&filter=${filter.join(",")}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        })
    }

    static async createRespond(respond, token) {
        return $api.send(`/respond/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(respond),
        })
    }

    static async updateRespond(respond, token) {
        return $api.send(`/respond/${respond.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify({
                status: respond.status
            }),
        })
    }

    static async deleteMyRespond(id, token) {
        return $api.send(`/respond/${id}/my`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        })
    }

    static async deleteOtherRespond(id, token) {
        return $api.send(`/respond/${id}/other`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        })
    }
}
