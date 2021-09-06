import React, { useMemo, useEffect } from 'react'
import DashboardTable from '../../components/DashboardTable'
import DashboardDialog from '../../components/DashboardDialog/index'
import { connect } from 'react-redux'
import {
  closeDialog,
  getUsers,
  getUser,
  resetUserNotification,
} from '../../store/actions/userActions'
import styles from '../../styles/Dashboard.module.scss'
import PropTypes from 'prop-types'
import { userTable, userCompaniesTable } from './constants'
import ErrorNotification from './../../components/ErrorNotification/index'
import Loader from './../../components/Loader'

const Dashboard = (props) => {
  const {
    users,
    user,
    onGetUsers,
    isLoading,
    isExpanded,
    onGetUser,
    notification,
    userCompanies,
    onResetUserNotification,
    onDialogClose,
  } = props

  const isLoadingUsers = useMemo(() => isLoading, [isLoading])

  const isCompaniesExists = userCompanies && userCompanies.length

  const userColumns = useMemo(() => userTable, [])

  const userCompaniesColumns = useMemo(() => userCompaniesTable, [])

  useEffect(() => {
    if (!users) {
      onGetUsers()
    }
  }, [users])

  const onCloseNotification = () => {
    onResetUserNotification()
  }

  useEffect(() => {
    if (notification && notification.type === 'success') {
      setTimeout(() => {
        onGetUsers()
        onGetUser({
          userId: user.id,
          isExpanded: isExpanded,
        })
        onDialogClose()
        onCloseNotification()
      }, 400)
    }
  }, [notification])
  if (isLoadingUsers && !users) {
    return <Loader />
  } else {
    return (
      <div data-testid="dashboard-container">
        <React.Fragment>
          <DashboardDialog />
          {Boolean(notification) && (
            <ErrorNotification
              open={Boolean(notification)}
              severity={notification.type}
              onClose={onCloseNotification}
            >
              {notification.message}
            </ErrorNotification>
          )}
          {users && Boolean(users.items.length) ? (
            <React.Fragment>
              <DashboardTable
                data-testid="users-table"
                columns={userColumns}
                data={users.items}
                pagination={users}
                isSelected
                toolBar
              />
              {Boolean(isCompaniesExists) && isExpanded && (
                <DashboardTable
                  data-testid="user-companies-table"
                  columns={userCompaniesColumns}
                  data={userCompanies}
                />
              )}
            </React.Fragment>
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
  user: PropTypes.object.isRequired,
  userCompanies: PropTypes.array,
  onGetUsers: PropTypes.func.isRequired,
  onGetUser: PropTypes.func.isRequired,
  onResetUserNotification: PropTypes.func.isRequired,
  onDialogClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  notification: PropTypes.object,
}

const mapStateToProps = (state) => {
  const { users, isLoading, isExpanded, user, userCompanies, notification } =
    state.user
  return {
    users,
    isLoading,
    isExpanded,
    user,
    userCompanies,
    notification,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUsers: () => {
      dispatch(getUsers())
    },
    onGetUser: (param) => {
      dispatch(getUser(param))
    },
    onDialogClose: () => dispatch(closeDialog()),
    onResetUserNotification: () => {
      dispatch(resetUserNotification())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
