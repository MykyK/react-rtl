import React from 'react'
import MaUTable from '@material-ui/core/Table'
import PropTypes from 'prop-types'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import DashboardTablePagination from '../DashboardTablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import ExpandedContent from '../ExpandedContent/index'

export const DashboardTable = (props) => {
  const {
    data,
    page,
    pagination,
    pageSize,
    pageIndex,
    currentPage,
    getTableProps,
    headerGroups,
    prepareRow,
    visibleColumns,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => {
          return (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    {column.id !== 'action' ? (
                      <TableSortLabel
                        active={column.isSorted}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                    ) : null}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableHead>
      <TableBody>
        {page.map((row, i) => {
          prepareRow(row)
          const { key, ...restRowProps } = row.getRowProps()
          return (
            <React.Fragment key={key}>
              <TableRow {...restRowProps}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
              {row.isExpanded ? (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length}>
                    <ExpandedContent {...row.values} />
                  </TableCell>
                </TableRow>
              ) : null}
            </React.Fragment>
          )
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10]}
            colSpan={3}
            count={pagination ? pagination.totalItems : data.length}
            rowsPerPage={pageSize}
            page={pagination ? currentPage : pageIndex}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={DashboardTablePagination}
          />
        </TableRow>
      </TableFooter>
    </MaUTable>
  )
}

DashboardTable.propTypes = {
  page: PropTypes.array.isRequired,
  visibleColumns: PropTypes.array.isRequired,
  headerGroups: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  pageSize: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  getTableProps: PropTypes.func.isRequired,
  prepareRow: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
}
