import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { closeDialog, createUser } from '../../store/actions/userActions'
import { openDialog, updateUser } from '../../store/actions/userActions'
import { useFieldValidation, useSetForm } from '../../utils/customHooks'

import { useDialogContext } from '../../utils/customHooks'
import {
  createCompanyAction,
  getCompaniesAction,
  updateCompany,
} from '../../store/actions/companyActions'
import { updateUserInCompany } from '../../store/actions/userActions'
import { addCompanyToUserAction } from './../../store/actions/userActions'
import DashboardDialog from './../../components/DashboardDialog'

const DashboardDialogContainer = (props) => {
  const {
    dialogContext,
    dialogType,
    companies,
    isDialogOpen,
    onDialogClose,
    onCompanyUpdate,
    onUserInCompanyUpdate,
    onAddCompanyToUser,
    onAddNewCompany,
    onUserUpdate,
    onAddNewUser,
    onGetCompanies,
  } = props

  const initialContext = useDialogContext({
    dialogContext,
    dialogType,
  })
  const { form, setFormValue, setNewForm, resetForm } =
    useSetForm(initialContext)

  const errors = useFieldValidation(form)

  const submitText =
    dialogContext && dialogType && dialogType.toLowerCase().includes('edit')
      ? 'Save'
      : 'Add'

  const isError = initialContext
    ? Boolean(errors.filter((error) => error).length)
    : Boolean(errors.filter((error) => error).length)

  useEffect(() => {
    if (dialogType === 'Add company to user') {
      onGetCompanies({ size: 'all' })
    }

    if (initialContext) {
      setNewForm(initialContext)
    } else {
      setNewForm(form)
    }
  }, [dialogContext, dialogType])

  const dialogProps = {
    isDialogOpen,
    errors,
    dialogContext,
    initialContext,
    dialogType,
    companies,
    setFormValue,
    setNewForm,
    resetForm,
    submitText,
    onDialogClose,
    onAddNewUser,
    onAddNewCompany,
    onUserUpdate,
    onCompanyUpdate,
    onUserInCompanyUpdate,
    onAddCompanyToUser,
    isError,
    form,
  }

  return initialContext && <DashboardDialog {...dialogProps} />
}

DashboardDialogContainer.propTypes = {
  onDialogClose: PropTypes.func.isRequired,
  onUserUpdate: PropTypes.func.isRequired,
  onAddNewUser: PropTypes.func.isRequired,
  dialogType: PropTypes.string,
  dialogContext: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isDialogOpen: PropTypes.bool.isRequired,
  companies: PropTypes.array,
  onUserInCompanyUpdate: PropTypes.func.isRequired,
  onCompanyUpdate: PropTypes.func.isRequired,
  onAddCompanyToUser: PropTypes.func.isRequired,
  onAddNewCompany: PropTypes.func.isRequired,
  onGetCompanies: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const { dialogContext, isDialogOpen, dialogType } = state.user
  const { companies } = state.company
  return {
    dialogContext,
    dialogType,
    isDialogOpen,
    companies: companies && companies.items,
    totalItems: companies && companies.totalItems,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDialogClose: () => dispatch(closeDialog()),
    onDialogOpen: () => dispatch(openDialog()),
    onGetCompanies: (params) => dispatch(getCompaniesAction(params)),
    onUserUpdate: (data) => {
      dispatch(updateUser(data))
    },
    onAddNewUser: (data) => {
      dispatch(createUser(data))
    },
    onAddNewCompany: (data) => {
      dispatch(createCompanyAction(data))
    },
    onCompanyUpdate: (data) => {
      dispatch(updateCompany(data))
    },
    onUserInCompanyUpdate: (data) => {
      dispatch(updateUserInCompany(data))
    },
    onAddCompanyToUser: (data) => {
      dispatch(addCompanyToUserAction(data))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardDialogContainer)
