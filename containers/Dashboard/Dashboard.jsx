import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  closeDialog,
  getUsers,
  getUser,
  resetUserNotification,
} from '../../store/actions/userActions'
import {
  getCompaniesAction,
  resetCompanyNotification,
} from '../../store/actions/companyActions'
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

  const isCompaniesExists = Boolean(
    user && user.companies && user.companies.length
  )

  const isUserContent = router.asPath == '/dashboard'

  const userColumns = useMemo(() => userTable, [])

  const companiesColumns = useMemo(() => companiesTable, [])

  const userCompaniesColumns = useMemo(() => userCompaniesTable, [])

  const usersDashboardProps = {
    users,
    userCompanies: user && user.companies,
    isUsersLoading,
    onGetUsers,
    userColumns,
    isCompaniesExists,
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
  const errorNotification = userNotification || companyNotification
  const onCloseNotification = () => {
    onResetUserNotification()
    onResetCompanyNotification()
  }

  useEffect(() => {
    if (userNotification && userNotification.type === 'success') {
      setTimeout(() => {
        onGetUsers()
        onDialogClose()
        onCloseNotification()
        if (user) {
          onGetUser(user.id)
        }
      }, 400)
    } else if (companyNotification && companyNotification.type === 'success') {
      setTimeout(() => {
        onGetCompanies()
        onDialogClose()
        onCloseNotification()
      }, 400)
    }
  }, [userNotification, companyNotification, user])

  return (
    <div data-testid="dashboard-container">
      <React.Fragment>
        <DashboardDialogContainer />
        {Boolean(errorNotification) && (
          <ErrorNotification
            open={Boolean(errorNotification)}
            severity={errorNotification.type}
            onClose={onCloseNotification}
          >
            {errorNotification.message}
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
  users: PropTypes.object,
  companies: PropTypes.object,
  user: PropTypes.object,
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
  const { users, isUsersLoading, isExpanded, user, userNotification } =
    state.user

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
