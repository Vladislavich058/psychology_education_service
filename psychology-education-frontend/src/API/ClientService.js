import axios from "axios";
import getAuthHeader from "Utils/getAuthHeader";

const API_URL = "http://localhost:8080/api/client/";

export default class ClientService {
    static async getCourses() {
        const response = await axios.get(API_URL + "courses", {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async getCourseById(id) {
        const response = await axios.get(API_URL + `courses/${id}`, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async getStudiedTopics(id) {
        const response = await axios.get(API_URL + `courses/studiedTopics/${id}`, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async getTopicById(id) {
        const response = await axios.get(API_URL + `topics/${id}`, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async deleteFavouriteCourse(id) {
        const response = await axios.delete(API_URL + `courses/favourites/${id}`, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async addFavouriteCourse(id) {
        const response = await axios.get(API_URL + `courses/favourites/${id}`, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async addRecord(id) {
        const response = await axios.get(API_URL + `courses/records/${id}`, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async addProgress(id) {
        const response = await axios.get(API_URL + `courses/progress/${id}`, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async addReview(id, {review}) {
        const response = await axios.put(API_URL + `reviews/${id}`, review, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async getCertificate(id) {
        const response = await axios.get(API_URL + `courses/certificate/${id}`, {
            headers: getAuthHeader(),
            responseType: 'arraybuffer'
        });
        return response;
    }
}
