import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import { renderWithState } from '../../../utils/renderWithState'
import Table from '..'
import { tableColumns } from '../../../pages/dashboard'

jest.mock('../../../styles/Dashboard.module.scss', () => {
	return {
		centered: {},
	}
})

describe('test', () => {
	let container
	const props = {
		data: [{ username: 'test' }, { username: 'test2' }],
		columns: tableColumns,
	}

	beforeEach(() => {
		container = renderWithState(<Table {...props} />)
	})

	it('test', () => {
		const tableContainer = container.render.getByTestId('dashboard-table')
		expect(tableContainer).toBeInTheDocument()
	})
})
