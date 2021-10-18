import React from 'react'
import { fireEvent, cleanup, waitFor } from '@testing-library/react'
import { render } from '@testing-library/react'
import Login from '..'

describe('<Login/>', () => {
  let container
  const defaultProps = {
    authNotification: { message: 'test', type: 'success' },
    form: {
      firstName: 'testName',
      lastName: 'testLastName',
      emailAddress: 'test@mail.com',
      password: 'testPasword',
    },
    errors: {
      firstNameError: null,
      lastNameError: null,
      emailError: null,
      passwordError: null,
    },
    onSingUp: jest.fn(),
    setIsSingUp: jest.fn(),
    onCloseNotification: jest.fn(),
    onLogin: jest.fn(),
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
      jest.clearAllMocks()
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

    it('should call setIsSingUp event with "true" after onClick by "auth-type-button"', () => {
      const isSingUpButton = container.getByTestId('auth-type-button')
      fireEvent.click(isSingUpButton)
      expect(defaultProps.setIsSingUp).toBeCalledTimes(1)
      expect(defaultProps.setIsSingUp).toBeCalledWith(true)
    })

    it('should dispatch login after submit event', () => {
      const authForm = container.getByTestId('login-form')
      fireEvent.submit(authForm)
      expect(defaultProps.onLogin).toHaveBeenCalledTimes(1)
      expect(defaultProps.onLogin).toHaveBeenCalledWith({
        emailAddress: defaultProps.form.emailAddress,
        password: defaultProps.form.password,
      })
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
      jest.clearAllMocks()
    })
    it('should not render firstName-input', () => {
      expect(container.getByTestId('firstName-input')).toBeInTheDocument()
    })
    it('should not render lastName-input', () => {
      expect(container.getByTestId('lastName-input')).toBeInTheDocument()
    })

    it('should call setIsSingUp event with "false" after onClick by "auth-type-button"', () => {
      const isSingUpButton = container.getByTestId('auth-type-button')
      fireEvent.click(isSingUpButton)
      expect(defaultProps.setIsSingUp).toBeCalledTimes(1)
      expect(defaultProps.setIsSingUp).toBeCalledWith(false)
    })

    it('should dispatch onSingUp and onLogin after submit event', async () => {
      const authForm = container.getByTestId('login-form')
      fireEvent.submit(authForm)
      expect(defaultProps.onSingUp).toHaveBeenCalledTimes(1)
      expect(defaultProps.onSingUp).toHaveBeenCalledWith(defaultProps.form)
      await waitFor(() => {
        expect(defaultProps.onLogin).toHaveBeenCalledTimes(1)
        expect(defaultProps.onLogin).toHaveBeenCalledWith({
          emailAddress: defaultProps.form.emailAddress,
          password: defaultProps.form.password,
        })
      })
    })
  })
})
