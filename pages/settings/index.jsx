import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from '../dashboard/companies/Company.module.scss'

const Settings = (props) => {
  const { user } = props
  return (
    <div className={styles.companyContainer}>
      {user && (
        <div className={styles.contentWrapper}>
          <span>
            <strong>ID:</strong>
            {user.id}
          </span>
          <span>
            <strong>NAME:</strong>
            {user.firstName + ' ' + user.lastName}
          </span>
          <span>
            <strong>EMAIL:</strong>
            {user.emailAddress}
          </span>
          <span>
            <strong>ROLE:</strong>
            {user.generalRole}
          </span>
        </div>
      )}
    </div>
  )
}

Settings.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  const { user } = state.auth
  return {
    user,
  }
}

export default connect(mapStateToProps)(Settings)
