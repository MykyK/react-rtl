import React, { useMemo, useEffect } from 'react'
import DashboardTable from '../../components/DashboardTable'
import CircularProgress from '@material-ui/core/CircularProgress'
import DashboardDialog from '../../components/DashboardDialog/index'
import { connect } from 'react-redux'
import {
  getUsers,
  resetUserNotification,
} from '../../store/actions/userActions'
import styles from '../../styles/Dashboard.module.scss'
import PropTypes from 'prop-types'
import MainLayout from './../../components/AppHeader/index'
import { userTable, companiesTable } from './constants'
import ErrorNotification from './../../components/ErrorNotification/index'
import { resetAuthNotification } from '../../store/actions/authActions'

const Dashboard = (props) => {
  const {
    users,
    onGetUsers,
    isLoading,
    contextUser,
    notification,
    onResetUserNotification,
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
        onCloseNotification()
      }, 400)
    }
  }, [notification])
  const isCompaniesExists =
    contextUser && contextUser.companies && contextUser.companies.length

  const userColumns = useMemo(() => userTable, [])
  const companiesColumns = useMemo(() => companiesTable, [])

  if (isLoading) {
    return (
      <div className={styles.loader} data-testid="dashboard-loader">
        <CircularProgress />
      </div>
    )
  } else {
    return (
      <MainLayout>
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
                {isCompaniesExists && (
                  <DashboardTable
                    columns={companiesColumns}
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
      </MainLayout>
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
    onResetUserNotification: () => {
      dispatch(resetUserNotification())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
