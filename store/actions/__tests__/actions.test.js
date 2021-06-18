import * as userActions from '../userActions'
import * as authActions from '../authActions'
import * as constants from '../../constants'
import UserService from '../../../pages/api/users'
import AuthService from '../../../pages/api/auth'

jest.mock('../../../pages/api/users', () => {
  return {
    getUsers: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn()
  }
});

jest.mock('../../../pages/api/auth', () => {
  return {
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn()
  }
});

const mockUserService = UserService;
const mockAuthService = AuthService;

describe('Actions', () => {
  describe('userActions', () => {
    describe('Actions has been called without errors', () => {
      it('getUsers should create GET_USERS_REQUEST and GET_USERS_SUCCESS', async () => {
        mockUserService.getUsers.mockResolvedValueOnce({
          data: []
        })
        const dispatch = jest.fn();
        await userActions.getUsers()(dispatch);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: constants.GET_USERS_REQUEST
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: constants.GET_USERS_SUCCESS,
          payload: {
            users: {
              data: []
            }
          }
        });
      })
      it('updateUser should create UPDATE_USER_REQUEST and UPDATE_USER_SUCCESS', async () => {
        mockUserService.updateUser.mockResolvedValueOnce({
          data: []
        })
        const dispatch = jest.fn();
        await userActions.updateUser()(dispatch);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: constants.UPDATE_USER_REQUEST
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: constants.UPDATE_USER_SUCCESS,
        });
      })

      it('deleteUser should create UPDATE_USER_REQUEST and UPDATE_USER_SUCCESS', async () => {
        mockUserService.deleteUser.mockResolvedValueOnce({
          data: []
        })
        const dispatch = jest.fn();
        await userActions.deleteUser(1)(dispatch);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: constants.DELETE_USER_REQUEST
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: constants.DELETE_USER_SUCCESS,
          payload: {
            userId: 1
          }
        });
      })

      it('openDialog should create SHOW_DIALOG', () => {
        const user = {}
        const dispatch = jest.fn();
        userActions.openDialog(user)(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
          type: constants.SHOW_DIALOG,
          payload: {
            user
          }
        });
      })

      it('closeDialog should create HIDE_DIALOG', () => {
        const dispatch = jest.fn();
        userActions.closeDialog()(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
          type: constants.HIDE_DIALOG,
        });
      })
    })

    describe('Actions have been called with error', () => {
      it('getUsers should create GET_USERS_FAIL', async () => {
        const error = {
          code: 'id',
          replacements: []
        };
        mockUserService.getUsers.mockRejectedValueOnce(error)
        const dispatch = jest.fn();
        await userActions.getUsers()(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
          type: constants.GET_USERS_FAIL,
        });
      })
      it('updateUser should create UPDATE_USER_FAIL', async () => {
        const data = {
          username: 'test',
          email: 'test@mail.com',
          password: 'test123'
        }
        const error = {
          code: 'id',
          replacements: []
        };
        mockUserService.updateUser.mockRejectedValueOnce(error)
        const dispatch = jest.fn();
        await userActions.updateUser(2, data)(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
          type: constants.UPDATE_USER_FAIL,
        });
      })

      it('deleteUser should create DELETE_USER_FAIL', async () => {
        const error = {
          code: 'id',
          replacements: []
        };
        mockUserService.deleteUser.mockRejectedValueOnce(error)
        const dispatch = jest.fn();
        await userActions.deleteUser(2)(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
          type: constants.DELETE_USER_FAIL,
        });
      })
    })

    describe('authActions', () => {
      describe('Actions has been called without errors', () => {
        it('register should create REGISTER_REQUEST and  REGISTER_SUCCESS', async () => {
          mockAuthService.register.mockResolvedValueOnce({
            data: []
          })
          const data = {}
          const dispatch = jest.fn();
          await authActions.register(data)(dispatch);
          expect(dispatch).toHaveBeenCalledTimes(2);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: constants.REGISTER_REQUEST
          });
          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: constants.REGISTER_SUCCESS,
          });
        })
        it('login should create LOGIN_REQUEST and  LOGIN_SUCCESS', async () => {
          mockAuthService.login.mockResolvedValueOnce({
            data: []
          })
          const data = {}
          const dispatch = jest.fn();
          await authActions.login(data)(dispatch);
          expect(dispatch).toHaveBeenCalledTimes(2);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: constants.LOGIN_REQUEST
          });
          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: constants.LOGIN_SUCCESS,
            payload: {
              user: data
            }
          });
        })

        it('logout should create LOGOUT', () => {
          mockAuthService.logout.mockResolvedValueOnce({
            data: []
          })
          const dispatch = jest.fn();
          authActions.logout()(dispatch);
          expect(dispatch).toHaveBeenCalledWith({
            type: constants.LOGOUT,
          });
        })
      })

      describe('Actions have been called with error', () => {
        it('register should create REGISTER_FAIL', async () => {
          const error = {
            code: 'id',
            replacements: []
          };
          mockAuthService.register.mockRejectedValueOnce(error)
          const data = {}
          const dispatch = jest.fn();
          await authActions.register(data)(dispatch);
          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: constants.REGISTER_FAIL,
          });
        })

        it('login should create LOGIN_FAIL', async () => {
          const error = {
            code: 'id',
            replacements: []
          };
          mockAuthService.login.mockRejectedValueOnce(error)
          const data = {}
          const dispatch = jest.fn();
          await authActions.login(data)(dispatch);
          expect(dispatch).toHaveBeenCalledWith({
            type: constants.LOGIN_FAIL,
          });
        })
      })
    })
  })
})
