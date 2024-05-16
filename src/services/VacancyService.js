import $api from "../http";


export default class VacancyService {
    static async searchVacanciesAnon(page, q) {
        return $api.send(`/vaca/search?page=${page}&q=${q}`, {})
    }

    static async getVacancyAnon(id) {
        return $api.send(`/vaca/${id}`, {})
    }

    static async searchVacancies(page, q, token) {
        return $api.send(`/vac/search?page=${page}&q=${q}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        })
    }

    static async getVacancy(id, token) {
        return $api.send(`/vac/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        })
    }

    static async createVacancy(vacancy, token) {
        return $api.send(`/vac/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(vacancy),
        })
    }

    static async updateVacancy(id, vacancy, token) {
        return $api.send(`/vac/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(vacancy),
        })
    }

    static async deleteVacancy(id, token) {
        return $api.send(`/vac/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        })
    }

}



