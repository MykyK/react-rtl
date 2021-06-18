import axios from "axios";
export const API_USERS_URL = "http://localhost:8080/api/";

class UserService {
  async getUsers() {
    const response = await axios.get(API_USERS_URL + "users");
    return response.data;
  }

  async getUser(userId) {
    const response = await axios.get(API_USERS_URL + "user/" + userId);
    return response.data;
  }
  async deleteUser(userId) {
    const response = await axios.delete(API_USERS_URL + "delete/" + userId);
    return response.data;
  }

  async updateUser(userId, data) {
    const response = await axios.put(API_USERS_URL + "update/" + userId, data);
    return response.data;
  }
}

export default new UserService();
