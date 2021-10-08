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

    it('when dialogType is equal "Add Company to user" and companies prop exist should render company-select', () => {
      const props = {
        ...defaultProps,
        dialogType: 'Add company to user',
        companies: [{}],
        isDialogOpen: true,
      }
      const container = render(<DashboardDialog {...props} />)
      expect(container.getByTestId('company-select')).toBeInTheDocument()
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

  describe.each([
    ['Edit User', 'onUserUpdate'],
    ['Edit Company', 'onCompanyUpdate'],
    ['Edit role and status', 'onUserInCompanyUpdate'],
    ['Add company to user', 'onAddCompanyToUser'],
  ])('when  dialogType and dialogContext props exist', (type, func) => {
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
