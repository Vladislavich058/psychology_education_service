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
}
