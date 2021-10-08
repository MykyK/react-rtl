import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import { render } from '@testing-library/react'
import DashboardDialog from './../index'

const defaultProps = {
  isDialogOpen: false,
  isError: false,
  dialogContext: null,
  initialContext: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
  },
  form: {
    username: 'test12345',
    email: 'test@teset.com',
    password: 'testtest123',
  },
  companies: null,
  errors: [null, null, null, null],
  submitText: 'Add',
  dialogType: 'Add User',
  setFormValue: jest.fn(),
  setNewForm: jest.fn(),
  onDialogClose: jest.fn(),
  onAddNewCompany: jest.fn(),
  resetForm: jest.fn(),
  onAddNewUser: jest.fn(),
  onUserUpdate: jest.fn(),
  onCompanyUpdate: jest.fn(),
  onUserInCompanyUpdate: jest.fn(),
  onAddCompanyToUser: jest.fn(),
}

describe('<UserDialog />', () => {
  describe('when default props are passed', () => {
    let container
    beforeEach(() => {
      container = render(<DashboardDialog {...defaultProps} />)
    })

    afterEach(() => {
      jest.clearAllMocks()
      cleanup()
    })

    it('should render component', () => {
      expect(container.getByTestId('dialog-wrapper')).toBeInTheDocument()
    })

    it('should not render dialog-component ', () => {
      expect(() => container.getByTestId('dialog-component')).toThrow(
        'Unable to find an element'
      )
    })
  })

  describe('when dialog is open', () => {
    let container
    const props = { ...defaultProps, isDialogOpen: true }

    beforeEach(() => {
      container = render(<DashboardDialog {...props} />)
    })

    afterEach(() => {
      jest.clearAllMocks()
      cleanup()
    })

    it('should render dialog-component', () => {
      expect(container.getByTestId('dialog-component')).toBeInTheDocument()
    })

    it('when dialogType is equal "Add Company" should call onAddNewCompany after onClick event called by action-type-button', () => {
      const props = {
        ...defaultProps,
        dialogType: 'Add company',
        isDialogOpen: true,
      }
      const container = render(<DashboardDialog {...props} />)
      const actionTypeButton = container.getAllByTestId('action-type-button')
      fireEvent.click(actionTypeButton[1])
      expect(props.onAddNewCompany).toHaveBeenCalledTimes(1)
    })

    it('should call onAddNewUser after onClick event called by action-type-button ', () => {
      const actionTypeButton = container.getByTestId('action-type-button')
      fireEvent.click(actionTypeButton)
      expect(props.onAddNewUser).toHaveBeenCalledTimes(1)
    })

    it('should call onDialogClose and resetForm  after onClick event called by close-dialog-button', () => {
      const closeDialogButton = container.getByTestId('close-dialog-button')
      fireEvent.click(closeDialogButton)
      expect(props.onDialogClose).toHaveBeenCalledTimes(1)
      expect(props.resetForm).toHaveBeenCalledTimes(1)
    })
  })

  describe('when  dialogType and dialogContext props exist', () => {
    describe.each([
      ['Edit User', 'onUserUpdate'],
      ['Edit Company', 'onCompanyUpdate'],
      ['Edit role and status', 'onUserInCompanyUpdate'],
      ['Add company to user', 'onAddCompanyToUser'],
    ])('', (type, func) => {
      let container
      const props = {
        ...defaultProps,
        isDialogOpen: true,
        dialogContext: [
          {
            original: {
              emailAddress: 'nikita@test.com',
              firstName: 'Nikita',
              generalRole: 'admin',
            },
          },
        ],
        dialogType: type,
      }
      beforeEach(() => {
        container = render(<DashboardDialog {...props} />)
      })

      afterEach(() => {
        jest.clearAllMocks()
        cleanup()
      })
      it(`should call ${func} after onClick event called by action-type-button`, () => {
        const actionTypeButton = container.getByTestId('action-type-button')
        fireEvent.click(actionTypeButton)
        expect(props[func]).toHaveBeenCalledTimes(1)
      })
    })
  })
  // describe('when contextUser exists in props and dialog is open', () => {
  //   const initialState = {
  //     user: {
  //       ...mockUserStore,
  //       contextUser: {
  //         username: 'test',
  //         email: 'test@test.com',
  //         password: 'test123',
  //       },
  //       isDialogOpen: true,
  //     },
  //     auth: mockAuthStore,
  //   }
  //   let container
  //   beforeEach(() => {
  //     container = render(<DashboardDialog />, { initialState })
  //   })

  //   afterEach(() => {
  //     jest.clearAllMocks()
  //     cleanup()
  //   })

  //   it('should render action-type-button with "Save" text content', () => {
  //     const actionTypeButton =
  //       container.render.getByTestId('action-type-button')
  //     expect(actionTypeButton.textContent).toBe('Save')
  //   })

  //   it('should dispatch action after onClick event called by action-type-button ', () => {
  //     const actionTypeButton =
  //       container.render.getByTestId('action-type-button')
  //     fireEvent.click(actionTypeButton)
  //     expect(container.store.dispatch).toHaveBeenCalledWith({
  //       type: UPDATE_USER_SUCCESS,
  //     })
  //   })

  //   it('should not render password-input ', () => {
  //     expect(() => container.getByTestId('password-input')).toThrow(
  //       'Unable to find an element'
  //     )
  //   })
  // })

  // describe('if notification prop exists', () => {
  //   let container

  //   const initialState = {
  //     auth: {
  //       ...mockAuthStore,
  //       notification: { message: 'test', type: 'success' },
  //     },
  //     user: {
  //       ...mockUserStore,
  //       contextUser: {
  //         username: 'test',
  //         email: 'test@test.com',
  //         password: 'test123',
  //       },
  //       isDialogOpen: true,
  //     },
  //   }

  //   beforeEach(() => {
  //     jest.useFakeTimers()
  //     container = renderWithState(<DashboardDialog />, { initialState })
  //   })

  //   afterEach(() => {
  //     cleanup()
  //     jest.useRealTimers()
  //   })

  //   it('should dispatch actions', () => {
  //     jest.advanceTimersByTime(400)
  //     expect(container.store.dispatch).toHaveBeenCalledTimes(3)
  //     expect(container.store.dispatch).toHaveBeenNthCalledWith(1, {
  //       type: GET_USERS_SUCCESS,
  //       payload: [{ username: 'test' }],
  //     })
  //     expect(container.store.dispatch).toHaveBeenNthCalledWith(2, {
  //       type: HIDE_DIALOG,
  //     })

  //     expect(container.store.dispatch).toHaveBeenNthCalledWith(3, {
  //       type: RESET_AUTH_NOTIFICATION,
  //     })
  //   })

  //   it('should show ErrorNotification component', () => {
  //     const errorNotification =
  //       container.render.getByTestId('error-notification')
  //     expect(errorNotification).toBeInTheDocument()
  //   })
  // })
})
