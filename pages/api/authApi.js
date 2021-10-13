import axios from "axios";
export const API_AUTH_URL = "http://localhost:8080/api/auth/";

class AuthService {
  async login(data) {
    const response = await axios.post(API_AUTH_URL + "signin", data, {
      withCredentials: true
    });

    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  }

  async logout() {
    localStorage.removeItem("user");
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }

  async register(data) {
    const response = await axios.post(API_AUTH_URL + "signup", data);
    return response.data
  }
}

export default new AuthService();
