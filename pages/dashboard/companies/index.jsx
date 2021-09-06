import React, { useMemo, useEffect } from 'react'
import DashboardTable from '../../../components/DashboardTable'
import DashboardDialog from '../../../components/DashboardDialog/index'
import { connect } from 'react-redux'
import styles from '../../../styles/Dashboard.module.scss'
import PropTypes from 'prop-types'
import { companiesTable } from './../constants'
import ErrorNotification from './../../../components/ErrorNotification/index'
import { getCompaniesAction } from '../../../store/actions/companyActions'
import { resetCompanyNotification } from './../../../store/actions/companyActions'
import { closeDialog } from '../../../store/actions/userActions'
import Loader from './../../../components/Loader'

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
        onCloseNotification()
        onDialogClose()
      }, 400)
    }
  }, [notification])

  if (isLoadingCompanies && !companies) {
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
          {companies && Boolean(companies.items.length) ? (
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
  companies: PropTypes.array.isRequired,
  onGetCompanies: PropTypes.array,
  onResetNotification: PropTypes.func.isRequired,
  onDialogClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  notification: PropTypes.object,
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
