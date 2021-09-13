import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  closeDialog,
  getUsers,
  getUser,
  resetUserNotification,
} from '../../store/actions/userActions'
import { getCompaniesAction } from '../../store/actions/companyActions'
import PropTypes from 'prop-types'
import { userTable, userCompaniesTable, companiesTable } from './tableStructure'
import UsersDashboard from '../../components/UsersDashboard/index'
import { useRouter } from 'next/router'
import CompaniesDashboard from '../../components/CompaniesDashboard'
import { ErrorNotification } from './../../components/ErrorNotification/ErrorNotification'
import DashboardDialogContainer from '../DashboardDialogContainer/DashboardDialogContainer'

const Dashboard = (props) => {
  const {
    user,
    users,
    onGetUsers,
    isExpanded,
    onGetUser,
    userCompanies,
    onResetUserNotification,
    userNotification,
    isUsersLoading,
    companies,
    isCompaniesLoading,
    onGetCompanies,
    companyNotification,
    onResetCompanyNotification,
    onDialogClose,
  } = props

  const router = useRouter()

  const isCompaniesExists = userCompanies && Boolean(userCompanies.length)

  const isUserContent = router.asPath == '/dashboard'

  const userColumns = useMemo(() => userTable, [])

  const companiesColumns = useMemo(() => companiesTable, [])

  const userCompaniesColumns = useMemo(() => userCompaniesTable, [])

  const usersDashboardProps = {
    users,
    isUsersLoading,
    onGetUsers,
    userColumns,
    isCompaniesExists,
    userCompanies,
    isExpanded,
    userCompaniesColumns,
  }
  const companiesDashboardProps = {
    companies,
    companiesColumns,
    isCompaniesLoading,
    onGetCompanies,
    companyNotification,
    onResetCompanyNotification,
  }

  const onCloseNotification = () => {
    onResetUserNotification()
  }

  useEffect(() => {
    if (userNotification && userNotification.type === 'success') {
      setTimeout(() => {
        onGetUsers()
        onDialogClose()
        onCloseNotification()
        if (user) {
          onGetUser({
            userId: user.id,
            isExpanded: isExpanded,
          })
        }
      }, 400)
    }
  }, [userNotification])

  return (
    <div data-testid="dashboard-container">
      <React.Fragment>
        <DashboardDialogContainer />
        {Boolean(userNotification) && (
          <ErrorNotification
            open={Boolean(userNotification)}
            severity={userNotification.type}
            onClose={onCloseNotification}
          >
            {userNotification.message}
          </ErrorNotification>
        )}
      </React.Fragment>
      {isUserContent ? (
        <UsersDashboard {...usersDashboardProps} />
      ) : (
        <CompaniesDashboard {...companiesDashboardProps} />
      )}
    </div>
  )
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
  const {
    users,
    isUsersLoading,
    isExpanded,
    user,
    userCompanies,
    userNotification,
  } = state.user

  const { companies, isCompaniesLoading, companyNotification } = state.company
  return {
    companies,
    users,
    isUsersLoading,
    isCompaniesLoading,
    isExpanded,
    user,
    userNotification,
    companyNotification,
    userCompanies,
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
    onGetCompanies: () => {
      dispatch(getCompaniesAction())
    },
    onResetCompanyNotification: () => {
      dispatch(resetCompanyNotification())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
