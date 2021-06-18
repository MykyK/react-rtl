import axios from 'axios'
import UserService, {
  API_USERS_URL
} from '../users';

jest.mock('axios');

const error = {
  code: 'error',
  replacements: [],
  message: ''
}


const methods = [
  // ['register',
  //   {
  //     method: UserService.register,
  //     mockResolve: {data:{} },
  //     mockReject: error,
  //     response: {},
  //     apiArgs: Object.values({
  //       url: API_USERS_URL + 'singup',
  //       data: {
  //         username: 'test',
  //         email: 'test@test.com',
  //         password: 'test123'
  //       }
  //     }),
  //     callArgs: {
  //       username: 'test',
  //       email: 'test@test.com',
  //       password: 'test123'
  //     },
  //     apiMethod: 'post'
  //   }
  // ]
  [
    'getUsers',
    {
      method: UserService.getUsers,
      mockResolve: {},
      response: {},
      mockReject: error,
      apiArgs: [API_USERS_URL + 'users'],
      apiMethod: 'get'
    }
  ]
]


const mockAxios = axios;

describe('UserService', () => {
  beforeEach(() => {
    mockAxios.get.mockClear()
    mockAxios.post.mockClear()
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
