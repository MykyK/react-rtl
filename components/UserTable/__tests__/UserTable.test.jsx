import React from 'react'
import { renderWithState } from '../../../utils/renderWithState'
import UserTable from '..'
import { tableColumns } from '../../../pages/dashboard'

jest.mock('../../../styles/Dashboard.module.scss', () => {
  return {
    centered: {},
  }
})

describe('<UserTable/>', () => {
  let container
  const props = {
    data: [{ username: 'test' }, { username: 'test2' }],
    columns: tableColumns,
  }

  beforeEach(() => {
    container = renderWithState(<UserTable {...props} />)
  })

  it('should render with props', () => {
    const tableContainer = container.render.getByTestId('dashboard-table')
    expect(tableContainer).toBeInTheDocument()
  })
})
