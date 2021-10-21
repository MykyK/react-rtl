import axios from "axios";
export const API_COMPANY_URL = "http://localhost:8080/api/company/";

class CompanyService {
  updateCompany(data) {
    const {
      companyId
    } = data
    return axios.put(API_COMPANY_URL + 'update/' + companyId, data)
  }

  getCompanies(params = {
    page: 0,
    size: 5
  }) {
    return axios.get(API_COMPANY_URL, {
      params,
      withCredentials: true
    })
  }

  getCompany(companyId) {
    return axios.get(API_COMPANY_URL + companyId)
  }

  createCompany(data) {
    return axios.post(API_COMPANY_URL + 'add', data)
  }

  deleteCompany(companyId) {
    return axios.delete(API_COMPANY_URL + "delete/" + companyId);;
  }
}

export default new CompanyService();
