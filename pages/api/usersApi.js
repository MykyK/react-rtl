import axios from "axios";
export const API_USERS_URL = "http://localhost:8080/api/users/";

class UserService {
  async getUsers(params = {
    size: 5,
    page: 0
  }) {
    const response = await axios.get(API_USERS_URL, {
      params,
      withCredentials: true
    });
    return response.data;
  }

  async getUser(userId) {
    const response = await axios.get(API_USERS_URL + userId, {
      withCredentials: true
    })
    return response.data
  }

  async deleteUser(userId) {
    const response = await axios.delete(API_USERS_URL + "delete/" + userId);
    return response.data;
  }

  async updateUser(data) {
    const {
      userId
    } = data

    const response = await axios.put(API_USERS_URL + "update/" + userId, data);
    return response.data;
  }

  async createUser(data) {
    const response = await axios.post(API_USERS_URL + "create", data)

    return response.data
  }

  async updateUserInCompany(data) {
    const {
      userId,
      companyId
    } = data

    const response = await axios.put(API_USERS_URL + "update/" + userId + '/' + companyId, data);
    return response.data;
  }

  async deleteCompanyFromUser(data) {
    const {
      userId,
      companyId
    } = data
    const response = await axios.delete(API_USERS_URL + userId + '/delete/' + companyId, data);
    return response.data;
  }

  async addCompanyToUser(data) {
    const response = await axios.post(API_USERS_URL + 'add-company', data);
    return response.data;
  }
}

export default new UserService();
