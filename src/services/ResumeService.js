import $api from "../http";

export default class ResumeService {
    static async searchResumesAnon(page, q) {
        return $api.send(`/resa/search?page=${page}&q=${q}`, {})
    }

    static async getResumeAnon(id) {
        return $api.send(`/resa/${id}`, {})
    }

    static async getResumesWorkListAnon(id) {
        return $api.send(`/resa/${id}/work`, {})
    }

    static async searchResumes(page, q, token) {
        return $api.send(`/res/search?page=${page}&q=${q}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        })
    }

    static async getResume(id, token) {
        return $api.send(`/res/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        })
    }

    static async createResume(resume, token) {
        return $api.send(`/res/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(resume),
        })
    }

    static async updateResume(id, resume, token) {
        return $api.send(`/res/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(resume),
        })
    }

    static async deleteResume(id, token) {
        return $api.send(`/res/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
        })
    }
}


