import axios from "axios";
export const API_AUTH_URL = "http://localhost:8080/api/auth/";

class AuthService {
  async login(data) {
    const response = await axios.post(API_AUTH_URL + "signin", data);
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(data) {
    return axios.post(API_AUTH_URL + "signup", data);
  }
}

export default new AuthService();
