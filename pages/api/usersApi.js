import axios from "axios";
export const API_USERS_URL = "http://localhost:8080/api/users/";

class UserService {
  getUsers(params = {
    size: 5,
    page: 0
  }) {

    return axios.get(API_USERS_URL, {
      params,
      withCredentials: true
    });
  }

  getUser(userId) {
    return axios.get(API_USERS_URL + userId, {
      withCredentials: true
    })
  }

  deleteUser(userId) {
    return axios.delete(API_USERS_URL + "delete/" + userId);
  }

  updateUser(data) {
    const {
      userId
    } = data
    return axios.put(API_USERS_URL + "update/" + userId, data);
  }

  createUser(data) {
    return axios.post(API_USERS_URL + "create", data)
  }

  updateUserInCompany(data) {
    const {
      userId,
      companyId
    } = data
    return axios.put(API_USERS_URL + "update/" + userId + '/' + companyId, data);
  }

  deleteCompanyFromUser(data) {
    const {
      userId,
      companyId
    } = data

    return axios.delete(API_USERS_URL + userId + '/delete/' + companyId, data);
  }

  addCompanyToUser(data) {
    return axios.post(API_USERS_URL + 'add-company', data);
  }
}

export default new UserService();
