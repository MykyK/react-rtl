import React, { useEffect, useState, forwardRef, useRef } from 'react'
import TableToolBar from '../../components/TableToolBar'
import PropTypes from 'prop-types'
import {
  usePagination,
  useSortBy,
  useTable,
  useExpanded,
  useRowSelect,
} from 'react-table'
import DashboardTable from './../../components/DashboardTable/index'
import { connect } from 'react-redux'
import {
  getUsers,
  openDialog,
  deleteUser,
} from './../../store/actions/userActions'
import {
  getCompaniesAction,
  deleteCompanyAction,
} from '../../store/actions/companyActions'
import { useRouter } from 'next/router'
import TableContainer from '@material-ui/core/TableContainer'
import Checkbox from '@material-ui/core/Checkbox'

export const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
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
  }
)

const DashboardTableContainer = (props) => {
  const {
    columns,
    data,
    isSelected,
    toolBar,
    pagination,
    onGetUsers,
    onGetCompanies,
    onDialogOpen,
    onUserDelete,
    onCompanyDelete,
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

  const isUserContent = router.asPath == '/dashboard'

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

  const tableDashboardProps = {
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
  }

  const toolBarProps = {
    onDialogOpen,
    onUserDelete,
    onCompanyDelete,
    selectedRows,
  }

  return (
    <TableContainer data-testid="dashboard-table">
      {toolBar && <TableToolBar {...toolBarProps} />}
      <DashboardTable {...tableDashboardProps} />
    </TableContainer>
  )
}

DashboardTableContainer.propTypes = {
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
    onDialogOpen: (dialogContext, dialogType) => {
      dispatch(openDialog(dialogContext, dialogType))
    },
    onUserDelete: (userId) => {
      dispatch(deleteUser(userId))
    },
    onCompanyDelete: (companyId) => {
      dispatch(deleteCompanyAction(companyId))
    },
  }
}

export default connect(null, mapDispatchToProps)(DashboardTableContainer)
