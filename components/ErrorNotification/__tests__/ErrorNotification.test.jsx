import React from 'react'
import ErrorNotification from '..'
import { renderWithState } from '../../../utils/renderWithState'

describe('test', () => {
	let container
	const props = {
		handleCloseNotification: jest.fn(),
		severity: 'success',
		open: true,
	}
	beforeEach(() => {
		container = renderWithState(<ErrorNotification {...props} />)
	})

	it('should render with props', () => {
		const errorNotificationWrapper = container.render.getByTestId(
			'error-notification-wrapper'
		)
		expect(errorNotificationWrapper).toBeInTheDocument()
	})
})
