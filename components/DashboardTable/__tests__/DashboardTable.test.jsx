import React from 'react'
import { renderWithState } from '../../../utils/renderWithState'
import DashboardTable from '..'

const defaultProps = {
  page: [
    {
      getRowProps: jest.fn().mockImplementation(() => ({
        key: '1',
      })),
      isExpanded: false,
      cells: [{ getCellProps: jest.fn(), render: jest.fn() }],
    },
  ],
  visibleColumns: [{}, {}],
  headerGroups: [
    {
      getHeaderGroupProps: jest.fn(),
      headers: [
        {
          getHeaderProps: jest.fn(),
          getSortByToggleProps: jest.fn(),
          id: 'action',
          render: jest.fn(),
          isSorted: false,
          isSortDesc: false,
        },
      ],
    },
  ],
  data: [{ username: 'test' }],
  pagination: { totalItems: 1, currentPage: 0, lastPage: 1 },
  pageSize: 2,
  pageIndex: 1,
  currentPage: 0,
  getTableProps: jest.fn(),
  prepareRow: jest.fn(),
  handleChangePage: jest.fn(),
  handleChangeRowsPerPage: jest.fn(),
}
describe('<DashboardTable/>', () => {
  let container

  describe('When default props are passed', () => {
    beforeEach(() => {
      container = renderWithState(<DashboardTable {...defaultProps} />)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should render with  props', () => {
      const tableContainer = container.render.getByTestId('dashboard-table')
      expect(tableContainer).toBeInTheDocument()
    })
    it('should not render element with data-testid "sort-label"', () => {
      expect(() => container.render.getByTestId('sort-label')).toThrow(
        'Unable to find an element'
      )
    })
    it('should not render element with data-testid "expanded-row"', () => {
      expect(() => container.render.getByTestId('expanded-row')).toThrow(
        'Unable to find an element'
      )
    })
  })

  describe('When column id != "action", end row is expanded', () => {
    const props = {
      ...defaultProps,
      pagination: null,
      page: [
        {
          getRowProps: jest.fn().mockImplementation(() => ({
            key: '1',
          })),
          isExpanded: true,
          cells: [{ getCellProps: jest.fn(), render: jest.fn() }],
        },
      ],
      headerGroups: [
        {
          getHeaderGroupProps: jest.fn(),
          headers: [
            {
              getHeaderProps: jest.fn(),
              getSortByToggleProps: jest.fn(),
              id: 'name',
              render: jest.fn(),
              isSorted: false,
              isSortDesc: true,
            },
          ],
        },
      ],
    }
    beforeEach(() => {
      container = renderWithState(<DashboardTable {...props} />)
    })

    it('should render with  props', () => {
      const tableContainer = container.render.getByTestId('dashboard-table')
      expect(tableContainer).toBeInTheDocument()
    })
    it('should not render element with data-testid "sort-label"', () => {
      expect(container.render.getByTestId('sort-label')).toBeInTheDocument()
    })
    it('should not render element with data-testid "expanded-row"', () => {
      expect(container.render.getByTestId('expanded-row')).toBeInTheDocument()
    })
  })
})
