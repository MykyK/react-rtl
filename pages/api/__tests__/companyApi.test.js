import axios from 'axios'
import CompanyService, {
  API_COMPANY_URL
} from '../companyApi';

jest.mock('axios');

const error = {
  code: 'error',
  replacements: [],
  message: ''
}


const methods = [
  ['updateCompany',
    {
      method: CompanyService.updateCompany,
      mockResolve: {},
      mockReject: error,
      response: {
        data: {}
      },
      apiArgs: Object.values({
        url: API_COMPANY_URL + 'update/' + 1,
        data: {
          companyName: 'test',
          email: 'test@test.com',
          companyId: 1
        }
      }),
      callArgs: {
        companyName: 'test',
        email: 'test@test.com',
        companyId: 1
      },
      apiMethod: 'put'
    }
  ],
  [
    'deleteCompany',
    {
      method: CompanyService.deleteCompany,
      mockResolve: {},
      response: {
        data: {}
      },
      mockReject: error,
      apiArgs: [API_COMPANY_URL + 'delete/1'],
      callArgs: 1,
      apiMethod: 'delete'
    }
  ],
  [
    'getCompanies',
    {
      method: CompanyService.getCompanies,
      mockResolve: {},
      response: {
        data: {}
      },
      mockReject: error,
      apiArgs: Object.values({
        url: API_COMPANY_URL,
        data: {
          params: {
            page: 0,
            size: 5
          },
          withCredentials: true
        }
      }),
      apiMethod: 'get'
    }
  ],
  [
    'getCompany', {
      method: CompanyService.getCompany,
      mockResolve: {},
      response: {
        data: {}
      },
      mockReject: error,
      apiArgs: [API_COMPANY_URL + 1],
      callArgs: 1,
      apiMethod: 'get'
    }
  ],
  [
    'createCompany', {
      method: CompanyService.createCompany,
      mockResolve: {},
      response: {
        data: {}
      },
      mockReject: error,
      apiArgs: Object.values({
        url: API_COMPANY_URL + 'add',
        data: {
          companyName: 'test',
          email: 'test@test.com',
          companyId: 1
        }
      }),
      callArgs: {
        companyName: 'test',
        email: 'test@test.com',
        companyId: 1
      },
      apiMethod: 'post'
    }
  ]
]


const mockAxios = axios;

describe('CompanyService', () => {
  beforeEach(() => {
    mockAxios.get.mockClear()
    mockAxios.post.mockClear()
    mockAxios.delete.mockClear()
    jest.clearAllMocks()
  })

  describe.each(methods)('%s', (methodName, methodArgs) => {
    it(`should have ${methodName}`, () => {
      expect(methodArgs.method).toBeDefined()
    })

    it(`should be called with correct parameters and return correct data for ${methodName}`, async () => {
      mockAxios[methodArgs.apiMethod].mockResolvedValueOnce({
        data: methodArgs.mockResolve
      });
      const response = await methodArgs.method(methodArgs.callArgs)
      expect(response).toBeDefined()
      expect(response).toEqual(methodArgs.response);
      expect(mockAxios[methodArgs.apiMethod]).toHaveBeenCalledTimes(1);
      expect(mockAxios[methodArgs.apiMethod]).toHaveBeenCalledWith(...methodArgs.apiArgs)
    })

    it(`should be called with correct parameters and return error for ${methodName}`, async () => {
      mockAxios[methodArgs.apiMethod].mockRejectedValueOnce(methodArgs.mockReject)

      await expect(methodArgs.method(methodArgs.callArgs)).rejects.toEqual(methodArgs.mockReject)
    })
  })
})
