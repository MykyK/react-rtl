import axios from "axios";
export const API_COMPANY_URL = "http://localhost:8080/api/company/";

class CompanyService {
  async updateCompany(data) {
    console.log(data)
    const {
      companyId
    } = data
    const response = await axios.put(API_COMPANY_URL + 'update/' + companyId, data)
    return response.data
  }
}

export default new CompanyService();
