import React, { useEffect } from 'react'
import styles from '../../containers/Dashboard/Dashboard.module.scss'
import DashboardTableContainer from './../../containers/DashboardTableContainer/DashboardTableContainer'
import PropTypes from 'prop-types'
import Loader from './../Loader/index'

export const CompaniesDashboard = (props) => {
  const { companies, companiesColumns, onGetCompanies, isCompaniesLoading } =
    props

  useEffect(() => {
    if (!companies) {
      onGetCompanies()
    }
  }, [companies])

  if (isCompaniesLoading && !companies) {
    return <Loader />
  } else {
    return (
      <div data-testid="company-dashboard-content">
        {companies && Boolean(companies.items.length) ? (
          <DashboardTableContainer
            columns={companiesColumns}
            data={companies.items}
            pagination={companies}
            isSelected
            toolBar
          />
        ) : (
          <div className={styles.centered} data-testid="no-data">
            <span>no data available</span>
          </div>
        )}
      </div>
    )
  }
}

CompaniesDashboard.propTypes = {
  companies: PropTypes.object,
  companiesColumns: PropTypes.array.isRequired,
  onGetCompanies: PropTypes.func.isRequired,
  isCompaniesLoading: PropTypes.bool.isRequired,
}
