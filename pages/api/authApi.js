import axios from "axios";
export const API_AUTH_URL = "http://localhost:8080/api/auth/";

class AuthService {
  async login(data) {
    const response = await axios.post(API_AUTH_URL + "signin", data, {
      withCredentials: true
    });
    if (response.data.emailAddress) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    console.log(response)
    return response.data;
  }

  async logout() {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }

  async register(data) {
    const response = await axios.post(API_AUTH_URL + "signup", data);
    return response
  }
}

export default new AuthService();
