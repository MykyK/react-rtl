import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import { render } from '@testing-library/react'
import Login from '..'

describe('<Login/>', () => {
  let container
  const defaultProps = {
    authNotification: { message: 'test', type: 'success' },
    form: { firstName: '', lastName: '', emailAddress: '', password: '' },
    errors: {
      firstNameError: null,
      lastNameError: null,
      emailError: null,
      passwordError: null,
    },
    handleChangeAuthType: jest.fn(),
    onCloseNotification: jest.fn(),
    onSubmit: jest.fn(),
    setFormValue: jest.fn(),
    isError: false,
    isSingUp: false,
  }
  describe('When default props passed', () => {
    beforeEach(() => {
      container = render(<Login {...defaultProps} />)
    })

    afterEach(() => {
      cleanup()
    })

    it('should not render email-input', () => {
      expect(() => container.getByTestId('firstName-input')).toThrow(
        'Unable to find an element'
      )
    })
    it('should not render email-input', () => {
      expect(() => container.getByTestId('lastName-input')).toThrow(
        'Unable to find an element'
      )
    })

    it('should call handleChangeAuthType event after onClick by "auth-type-button"', () => {
      const isSingUpButton = container.getByTestId('auth-type-button')
      fireEvent.click(isSingUpButton)
      expect(defaultProps.handleChangeAuthType).toBeCalledTimes(1)
    })

    it('should dispatch login after submit event', () => {
      const authForm = container.getByTestId('login-form')
      fireEvent.submit(authForm)
      expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1)
    })
  })

  describe('When isSingUp prop is true', () => {
    const props = {
      ...defaultProps,
      isSingUp: true,
    }
    beforeEach(() => {
      container = render(<Login {...props} />)
    })

    afterEach(() => {
      cleanup()
    })
    it('should not render email-input', () => {
      expect(container.getByTestId('firstName-input')).toBeInTheDocument()
    })
    it('should not render email-input', () => {
      expect(container.getByTestId('lastName-input')).toBeInTheDocument()
    })
  })
})
