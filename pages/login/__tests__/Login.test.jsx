import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import { renderWithState } from './../../../utils/renderWithState'
import Login from '../index'
import { mockAuthStore } from '../../dashboard/__mocks__'
import { LOGIN_SUCCESS, REGISTER_SUCCESS } from './../../../store/constants'

jest.mock('./../../../store/actions/authActions', () => ({
	login: () => ({ type: 'LOGIN_SUCCESS', payload: mockAuthStore }),
	register: () => ({ type: 'REGISTER_SUCCESS' }),
}))

describe('<Login/>', () => {
	let container
	beforeEach(() => {
		container = renderWithState(<Login />)
	})

	afterEach(() => {
		cleanup()
	})

	it('should not render email-input', () => {
		expect(() => container.render.getByTestId('email-input')).toThrow(
			'Unable to find an element'
		)
	})

	it('should render email-input after changeAuthType event is called', () => {
		const authTypeButton = container.render.getByTestId('auth-type-button')
		fireEvent.click(authTypeButton)
		const emailInput = container.render.getByTestId('email-input')
		expect(emailInput).toBeInTheDocument()
	})

	it('should dispatch login after submit event', () => {
		const authForm = container.render.getByTestId('login-form')
		fireEvent.submit(authForm)
		expect(container.store.dispatch).toHaveBeenCalledWith({
			type: LOGIN_SUCCESS,
			payload: mockAuthStore,
		})
	})

	it('should dispatch login after submit event', () => {
		const authTypeButton = container.render.getByTestId('auth-type-button')
		const authForm = container.render.getByTestId('login-form')
		fireEvent.click(authTypeButton)
		fireEvent.submit(authForm)
		expect(container.store.dispatch).toHaveBeenCalledWith({
			type: REGISTER_SUCCESS,
		})
	})
})
