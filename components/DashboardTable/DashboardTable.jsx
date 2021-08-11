import React, { forwardRef, useEffect, useRef, useState } from 'react'
import MaUTable from '@material-ui/core/Table'
import PropTypes from 'prop-types'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import DashboardTablePagination from '../DashboardTablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Checkbox from '@material-ui/core/Checkbox'

import {
  usePagination,
  useSortBy,
  useTable,
  useExpanded,
  useRowSelect,
} from 'react-table'
import TableToolBar from '../TableToolBar'
import ExpandedContent from '../ExpandedContent/index'
import { connect } from 'react-redux'
import { getUsers } from './../../store/actions/userActions'
import { getCompaniesAction } from '../../store/actions/companyActions'
import { useRouter } from 'next/router'

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef()
  const resolvedRef = ref || defaultRef

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <React.Fragment>
      <Checkbox ref={resolvedRef} {...rest} />
    </React.Fragment>
  )
})
const DashboardTable = (props) => {
  const {
    columns,
    data,
    isSelected,
    toolBar,
    pagination,
    onGetUsers,
    onGetCompanies,
  } = props
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    setPageSize,
    visibleColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      isSelected
        ? hooks.visibleColumns.push((columns) => [
            {
              id: 'selection',
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
              ),
              Cell: ({ row }) => (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              ),
            },
            ...columns,
          ])
        : null
    }
  )
  const [currentPage, setCurrentPage] = useState(
    pagination ? pagination.currentPage : pageIndex
  )
  const router = useRouter()
  const isUserContent = router.pathname == '/dashboard'

  const selectedRows = page.filter((row) => row.isSelected)

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value))
  }

  useEffect(() => {
    if (pagination) {
      isUserContent
        ? onGetUsers({
            size: pageSize,
            page: currentPage,
          })
        : onGetCompanies({
            size: pageSize,
            page: currentPage,
          })
    }
  }, [pageSize, currentPage])

  return (
    <TableContainer data-testid="dashboard-table">
      {toolBar && <TableToolBar selectedRows={selectedRows} />}
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
    </TableContainer>
  )
}

DashboardTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  isSelected: PropTypes.bool,
  toolBar: PropTypes.bool,
  pagination: PropTypes.object,
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUsers: (params) => {
      dispatch(getUsers(params))
    },
    onGetCompanies: (params) => {
      dispatch(getCompaniesAction(params))
    },
  }
}

export default connect(null, mapDispatchToProps)(DashboardTable)
