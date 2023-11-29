import axios from "axios";

const API_URL = "http://localhost:8080/api/";

export default class LoginService {
  static async login({ user }) {
    const response = await axios.post(API_URL + "login", user);
    return response.data;
  }
}
