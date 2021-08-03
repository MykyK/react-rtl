import React, { useMemo, useEffect } from 'react'
import DashboardTable from '../../components/DashboardTable'
import CircularProgress from '@material-ui/core/CircularProgress'
import DashboardDialog from '../../components/DashboardDialog/index'
import { connect } from 'react-redux'
import {
  closeDialog,
  getUsers,
  resetUserNotification,
} from '../../store/actions/userActions'
import styles from '../../styles/Dashboard.module.scss'
import PropTypes from 'prop-types'
import MainLayout from '../../components/MainLayout/index'
import { userTable, companiesTable, userCompaniesTable } from './constants'
import ErrorNotification from './../../components/ErrorNotification/index'

const Dashboard = (props) => {
  const {
    users,
    onGetUsers,
    isLoading,
    contextUser,
    notification,
    onResetUserNotification,
    onDialogClose,
  } = props

  useEffect(() => {
    onGetUsers()
  }, [])

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
  const isCompaniesExists =
    contextUser && contextUser.companies && contextUser.companies.length

  const userColumns = useMemo(() => userTable, [])
  const userCompaniesColumns = useMemo(() => userCompaniesTable, [])

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
          {Boolean(users.length) ? (
            <React.Fragment>
              <DashboardTable
                columns={userColumns}
                data={users}
                isSelected
                toolBar
              />
              {Boolean(isCompaniesExists) && (
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
  const { users, isLoading, contextUser, notification } = state.user
  return { users, isLoading, contextUser, notification }
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
