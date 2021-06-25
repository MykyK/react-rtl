import axios from 'axios'
import AuthService, {
  API_AUTH_URL
} from '../authApi';

jest.mock('axios');


const error = {
  code: 'error',
  replacements: [],
  message: ''
}


const methods = [
  ['register',
    {
      method: AuthService.register,
      mockResolve: {},
      mockReject: error,
      response: {
        data: {}
      },
      apiArgs: Object.values({
        url: API_AUTH_URL + 'signup',
        data: {
          username: 'test',
          email: 'test@test.com',
          password: 'test1234'
        }
      }),
      callArgs: {
        username: 'test',
        email: 'test@test.com',
        password: 'test1234'
      },

      apiMethod: 'post'
    }
  ],
  [
    'login',
    {
      method: AuthService.login,
      mockResolve: {
        accessToken: 'test123'
      },
      response: {
        accessToken: 'test123'
      },
      mockReject: error,
      apiArgs: Object.values({
        url: API_AUTH_URL + 'signin',
        data: {
          username: 'test',
          password: 'test1234'
        }
      }),
      callArgs: {
        username: 'test',
        password: 'test1234'
      },
      apiMethod: 'post'
    }
  ],
]


const mockAxios = axios;

describe('UserService', () => {
  beforeEach(() => {
    mockAxios.get.mockClear()
    mockAxios.post.mockClear()
    jest.clearAllMocks()
  })

  it('logout should call localStorage.removeItem', () => {
    jest.spyOn(window.localStorage.__proto__, 'removeItem');
    window.localStorage.__proto__.removeItem = jest.fn();
    AuthService.logout()
    expect(localStorage.removeItem).toHaveBeenCalled();
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
