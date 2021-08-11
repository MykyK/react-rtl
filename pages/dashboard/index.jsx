import React, { useMemo, useEffect } from 'react'
import DashboardTable from '../../components/DashboardTable'
import DashboardDialog from '../../components/DashboardDialog/index'
import { connect } from 'react-redux'
import {
  closeDialog,
  getUsers,
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
    onGetUsers,
    isLoading,
    isExpanded,
    contextUser,
    notification,
    onResetUserNotification,
    onDialogClose,
  } = props

  const isLoadingUsers = useMemo(() => isLoading, [isLoading])

  const isCompaniesExists =
    contextUser && contextUser.companies && contextUser.companies.length

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
              data-testid="error-notification"
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
                columns={userColumns}
                data={users.items}
                pagination={users}
                isSelected
                toolBar
              />
              {Boolean(isCompaniesExists) && isExpanded && (
                <DashboardTable
                  columns={userCompaniesColumns}
                  data={contextUser.companies}
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
  getUsers: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  const { users, isLoading, isExpanded, contextUser, notification } = state.user
  return { users, isLoading, isExpanded, contextUser, notification }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUsers: () => {
      dispatch(getUsers())
    },
    onDialogClose: () => dispatch(closeDialog()),
    onResetUserNotification: () => {
      dispatch(resetUserNotification())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
