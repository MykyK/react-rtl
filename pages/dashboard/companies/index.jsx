import React, { useMemo, useEffect } from 'react'
import DashboardTable from '../../../components/DashboardTable'
import CircularProgress from '@material-ui/core/CircularProgress'
import DashboardDialog from '../../../components/DashboardDialog/index'
import { connect } from 'react-redux'
import styles from '../../../styles/Dashboard.module.scss'
import PropTypes from 'prop-types'
import { companiesTable } from './../constants'
import ErrorNotification from './../../../components/ErrorNotification/index'
import { getCompaniesAction } from '../../../store/actions/companyActions'
import { resetCompanyNotification } from './../../../store/actions/companyActions'
import { closeDialog } from '../../../store/actions/userActions'

const DashboardCompanies = (props) => {
  const {
    companies,
    onGetCompanies,
    isLoading,
    notification,
    onResetNotification,
    onDialogClose,
  } = props

  const isLoadingCompanies = useMemo(() => isLoading, [isLoading])
  const companiesColumns = useMemo(() => companiesTable, [])

  useEffect(() => {
    if (!companies) {
      onGetCompanies()
    }
  }, [companies])

  const onCloseNotification = () => {
    onResetNotification()
  }

  useEffect(() => {
    if (notification && notification.type === 'success') {
      setTimeout(() => {
        onGetCompanies()
        onDialogClose()
        onCloseNotification()
      }, 400)
    }
  }, [notification])

  if (isLoadingCompanies && !companies) {
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
          {companies && Boolean(companies.items) ? (
            <React.Fragment>
              <DashboardTable
                columns={companiesColumns}
                data={companies.items}
                pagination={companies}
                isSelected
                toolBar
              />
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

DashboardCompanies.propsTypes = {
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  const { companies, isLoading, notification } = state.company
  return { companies, isLoading, notification }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCompanies: () => {
      dispatch(getCompaniesAction())
    },
    onDialogClose: () => dispatch(closeDialog()),
    onResetNotification: () => {
      dispatch(resetCompanyNotification())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCompanies)
