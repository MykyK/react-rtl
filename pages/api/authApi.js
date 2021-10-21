import axios from "axios";
export const API_AUTH_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(data) {
    return axios.post(API_AUTH_URL + "signin", data, {
      withCredentials: true
    });
  }

  logout() {
    localStorage.removeItem("user");
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }

  register(data) {
    return axios.post(API_AUTH_URL + "signup", data);
  }
}

export default new AuthService();
