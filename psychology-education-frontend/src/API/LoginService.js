import axios from "axios";
import getAuthHeader from "Utils/getAuthHeader";

const API_URL = "http://localhost:8080/api/";

export default class LoginService {
  static async login({ user }) {
    const response = await axios.post(API_URL + "login", user);
    return response;
  }

  static async getCurrentUser() {
    const response = await axios.get(API_URL + "current-user", {
      headers: getAuthHeader(),
    });
    return response;
  }

  static async updateCurrentUser(formData) {
    const response = await axios.patch(API_URL + "current-user", formData, {
      headers: getAuthHeader(),
    });
    return response;
  }
}
