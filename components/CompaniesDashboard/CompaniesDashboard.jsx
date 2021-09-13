import React, { useEffect } from 'react'
import styles from '../../containers/Dashboard/Dashboard.module.scss'
import DashboardTableContainer from './../../containers/DashboardTableContainer/DashboardTableContainer'
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
      <div>
        {companies && Boolean(companies.items.length) ? (
          <React.Fragment>
            <DashboardTableContainer
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
      </div>
    )
  }
}
