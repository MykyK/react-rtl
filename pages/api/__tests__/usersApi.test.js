import axios from 'axios'
import UserService, {
  API_USERS_URL
} from '../usersApi';

jest.mock('axios');

const error = {
  code: 'error',
  replacements: [],
  message: ''
}


const methods = [
  ['updateUser',
    {
      method: UserService.updateUser,
      mockResolve: {},
      mockReject: error,
      response: {
        data: {}
      },
      apiArgs: Object.values({
        url: API_USERS_URL + 'update/' + 1,
        data: {
          username: 'test',
          email: 'test@test.com',
          userId: 1
        }
      }),
      callArgs: {
        username: 'test',
        email: 'test@test.com',
        userId: 1
      },
      apiMethod: 'put'
    }
  ],
  [
    'deleteUser',
    {
      method: UserService.deleteUser,
      mockResolve: {},
      response: {
        data: {}
      },
      mockReject: error,
      apiArgs: [API_USERS_URL + 'delete/1'],
      callArgs: 1,
      apiMethod: 'delete'
    }
  ],
  [
    'getUsers',
    {
      method: UserService.getUsers,
      mockResolve: {},
      response: {
        data: {}
      },
      mockReject: error,
      apiArgs: Object.values({
        url: API_USERS_URL,
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
    'getUser',
    {
      method: UserService.getUser,
      mockResolve: {},
      response: {
        data: {}
      },
      mockReject: error,
      apiArgs: Object.values({
        url: API_USERS_URL + 1,
        data: {
          withCredentials: true
        }
      }),
      callArgs: 1,
      apiMethod: 'get'
    }
  ],
  [
    'createUser',
    {
      method: UserService.createUser,
      mockResolve: {},
      response: {
        data: {}
      },
      mockReject: error,
      apiArgs: Object.values({
        url: API_USERS_URL + 'create',
        data: {
          username: 'test',
          email: 'test@test.com',
          userId: 1
        }
      }),
      callArgs: {
        username: 'test',
        email: 'test@test.com',
        userId: 1
      },
      apiMethod: 'post'
    }
  ],
  [
    'updateUserInCompany',
    {
      method: UserService.updateUserInCompany,
      mockResolve: {},
      response: {
        data: {}
      },
      mockReject: error,
      apiArgs: Object.values({
        url: API_USERS_URL + 'update/1/1',
        data: {
          companyId: 1,
          userId: 1
        }
      }),
      callArgs: {
        companyId: 1,
        userId: 1
      },
      apiMethod: 'put'
    }
  ],
  [
    'deleteCompanyFromUser',
    {
      method: UserService.deleteCompanyFromUser,
      mockResolve: {},
      response: {
        data: {}
      },
      mockReject: error,
      apiArgs: Object.values({
        url: API_USERS_URL + '1/delete/1',
        data: {
          companyId: 1,
          userId: 1
        }
      }),
      callArgs: {
        companyId: 1,
        userId: 1
      },
      apiMethod: 'delete'
    }
  ],
  [
    'addCompanyToUser',
    {
      method: UserService.addCompanyToUser,
      mockResolve: {},
      response: {
        data: {}
      },
      mockReject: error,
      apiArgs: Object.values({
        url: API_USERS_URL + 'add-company',
        data: {
          companyId: 1,
          userId: 1
        }
      }),
      callArgs: {
        companyId: 1,
        userId: 1
      },
      apiMethod: 'post'
    }
  ]
]


const mockAxios = axios;

describe('UserService', () => {
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
