import React, { useEffect } from 'react'
import styles from '../../containers/Dashboard/Dashboard.module.scss'
import Loader from './../Loader/index'
import DashboardTableContainer from './../../containers/DashboardTableContainer/DashboardTableContainer'
export const UsersDashboard = (props) => {
  const {
    users,
    onGetUsers,
    userCompaniesColumns,
    userCompanies,
    userColumns,
    isUsersLoading,
    isCompaniesExists,
    isExpanded,
  } = props

  useEffect(() => {
    if (!users) {
      onGetUsers()
    }
  }, [users])

  if (isUsersLoading && !users) {
    return <Loader />
  } else {
    return (
      <div>
        {users && Boolean(users.items.length) ? (
          <React.Fragment>
            <DashboardTableContainer
              data-testid="users-table"
              columns={userColumns}
              data={users.items}
              pagination={users}
              isSelected
              toolBar
            />
            {Boolean(isCompaniesExists) && isExpanded && (
              <DashboardTableContainer
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
      </div>
    )
  }
}
