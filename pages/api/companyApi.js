import axios from "axios";
export const API_COMPANY_URL = "http://localhost:8080/api/company/";

class CompanyService {
  async updateCompany(data) {
    const {
      companyId
    } = data
    const response = await axios.put(API_COMPANY_URL + 'update/' + companyId, data)
    return response.data
  }

  async getCompanies() {
    const response = await axios.get(API_COMPANY_URL + 'all', {
      withCredentials: true
    })
    return response.data
  }

  async getCompany(companyId) {
    const response = await axios.get(API_COMPANY_URL + companyId)
    return response.data
  }

  async createCompany(data) {
    const response = await axios.post(API_COMPANY_URL + 'add', data)
    return response.data
  }

  async deleteCompany(companyId) {
    const response = await axios.delete(API_COMPANY_URL + "delete/" + companyId);
    return response.data;
  }
}

export default new CompanyService();
