import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import { renderWithState } from './../../../utils/renderWithState'
import Login from '../index'
import { mockAuthStore } from '../../dashboard/__mocks__'
import {
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	RESET_AUTH_NOTIFICATION,
} from './../../../store/constants'
import { useRouter } from 'next/router'

jest.mock('./../../../store/actions/authActions', () => ({
	login: () => ({ type: 'LOGIN_SUCCESS', payload: mockAuthStore }),
	register: () => ({ type: 'REGISTER_SUCCESS' }),
	resetAuthNotification: () => ({ type: 'RESET_AUTH_NOTIFICATION' }),
}))

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}))

describe('<Login/>', () => {
	describe('if status prop with exists', () => {
		let container

		const initialState = {
			auth: { ...mockAuthStore, status: { message: 'test', type: 'success' } },
		}

		const push = jest.fn()
		useRouter.mockImplementation(() => ({
			push,
			pathname: '/',
			route: '/',
			asPath: '/',
			query: '',
		}))
		beforeEach(() => {
			jest.useFakeTimers()
			container = renderWithState(<Login />, { initialState })
		})

		afterEach(() => {
			cleanup()
			jest.useRealTimers()
		})

		it('should push to "/dashboard"', () => {
			jest.advanceTimersByTime(400)
			expect(push).toHaveBeenCalledWith('/dashboard')
		})

		it('should show ErrorNotification component', () => {
			const errorNotification =
				container.render.getByTestId('error-notification')
			expect(errorNotification).toBeInTheDocument()
		})
	})
	describe('if default props passed', () => {
		let container

		const initialState = {
			auth: mockAuthStore,
		}

		beforeEach(() => {
			container = renderWithState(<Login />, { initialState })
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
})
