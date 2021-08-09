import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { getCompanyAction } from '../../../store/actions/companyActions'
import styles from './Company.module.scss'

const Company = (props) => {
  const { onGetCompany, company } = props
  const router = useRouter()
  const { companyId } = router.query

  useEffect(() => {
    onGetCompany(companyId)
  }, [companyId])

  return (
    <div className={styles.companyContainer}>
      {company && (
        <div className={styles.contentWrapper}>
          <span>
            <strong>ID:</strong>
            {company.id}
          </span>
          <span>
            <strong>NAME:</strong>
            {company.companyName}
          </span>
          <span>
            <strong>EMAIL:</strong>
            {company.email}
          </span>
          <span>
            <strong>PHONE:</strong>
            {company.corporateNumber}
          </span>
          <span>
            <strong>TYPE:</strong>
            {company.type}
          </span>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const { company } = state.company
  return {
    company,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCompany: (companyId) => {
      dispatch(getCompanyAction(companyId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Company)
