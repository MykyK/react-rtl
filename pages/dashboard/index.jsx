import React, { useMemo, useEffect } from 'react'
import UserTable from '../../components/UserTable'
import ActionCell from '../../components/ActionCell'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import ActionUserDialog from '../../components/UserDialog/index'
import { connect } from 'react-redux'
import { getUsers } from '../../store/actions/userActions'
import { logout } from '../../store/actions/authActions'
import styles from '../../styles/Dashboard.module.scss'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

export const tableColumns = [
  {
    Header: 'USERS LIST',
    columns: [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Action',
        accessor: 'action',
        disableSortBy: true,
        Cell: ({ row }) => <ActionCell row={row} />,
      },
    ],
  },
]
const Dashboard = (props) => {
  const { users, getUsers, isLoading, onLogOut } = props
  useEffect(() => {
    getUsers()
  }, [])

  const router = useRouter()

  const handleLogOut = async () => {
    await onLogOut()
    router.push('/login')
  }
  const columns = useMemo(() => tableColumns, [])

  if (isLoading) {
    return (
      <div className={styles.loader} data-testid="dashboard-loader">
        <CircularProgress />
      </div>
    )
  } else {
    return (
      <div data-testid="dashboard-container">
        <React.Fragment>
          <div className={styles.spaceBetween}>
            <ActionUserDialog />
            <Button data-testid="logout" onClick={handleLogOut}>
              Logout
            </Button>
          </div>
          {users.length ? (
            <UserTable columns={columns} data={users} />
          ) : (
            <div className={styles.centered} data-testid="no-data">
              <span>no data available</span>
            </div>
          )}
        </React.Fragment>
      </div>
    )
  }
}

Dashboard.propsTypes = {
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onLogOut: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { users, isLoading } = state.user
  return { users, isLoading }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => {
      dispatch(getUsers())
    },
    onLogOut: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
