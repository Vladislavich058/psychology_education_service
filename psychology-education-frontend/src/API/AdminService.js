import axios from "axios";
import getAuthHeader from "Utils/getAuthHeader";

const API_URL = "http://localhost:8080/api/admin/";

export default class AdminService {
    static async getPsychologists() {
        const response = await axios.get(API_URL + "psychologists", {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async getCourses() {
        const response = await axios.get(API_URL + "courses", {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async getRecords() {
        const response = await axios.get(API_URL + "records", {
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

    static async activateRecords(id) {
        const response = await axios.get(API_URL + `records/activate/${id}`, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async blockRecords(id) {
        const response = await axios.get(API_URL + `records/block/${id}`, {
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

    static async getPsychologistAnalitic(id) {
        const response = await axios.get(API_URL + `analitics/psychologist/${id}`, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async getCoursesRating() {
        const response = await axios.get(API_URL + `analitics/courses`, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async deletePsychologist(id) {
        const response = await axios.delete(API_URL + `psychologists/${id}`, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async deleteCourse(id) {
        const response = await axios.delete(API_URL + `courses/${id}`, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async deleteTopic(id) {
        const response = await axios.delete(API_URL + `topics/${id}`, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async addPsychologist(formData) {
        const response = await axios.post(API_URL + "psychologists", formData, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async addCourse(formData) {
        const response = await axios.post(API_URL + "courses", formData, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async addTopic({topic}, id) {
        const response = await axios.put(API_URL + `topics/${id}`, topic, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async updateCourse(formData) {
        const response = await axios.patch(API_URL + "courses", formData, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async updateTopic({topic}, id) {
        const response = await axios.patch(API_URL + `topics/${id}`, topic, {
            headers: getAuthHeader(),
        });
        return response;
    }

    static async getProgressReport(id) {
        const response = await axios.get(API_URL + `report/${id}`, {
            headers: getAuthHeader(),
            responseType: 'arraybuffer'
        });
        return response;
    }
}
