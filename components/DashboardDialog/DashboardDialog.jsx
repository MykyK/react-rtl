import React, { useState, useEffect } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { closeDialog, createUser } from '../../store/actions/userActions'
import {
  openDialog,
  updateUser,
  getUsers,
} from '../../store/actions/userActions'
import { useFieldValidation, useSetForm } from '../../utils/customHooks'
import InputField from '../InputField/index'
import { useDialogContext } from '../../utils/customHooks'
import {
  createCompanyAction,
  getCompaniesAction,
  updateCompany,
} from '../../store/actions/companyActions'
import { updateUserInCompany } from '../../store/actions/userActions'
import CompanySelect from '../CompanySelect'
import { addCompanyToUserAction } from './../../store/actions/userActions'

const DashboardDialog = (props) => {
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

  const { form, setFormValue, setNewForm } = useSetForm(initialContext)
  const errors = useFieldValidation(form)
  const selectHandleChange = (event) => {
    setNewForm({
      companyName: companies[event.target.value].companyName,
      email: companies[event.target.value].email,
      corporateNumber: companies[event.target.value].corporateNumber,
      type: companies[event.target.value].type,
    })
  }

  const submitText =
    dialogContext && dialogType !== 'Add company to user' ? 'Save' : 'Add'
  const isError = initialContext
    ? errors.filter((error) => error).length
    : errors.filter((error) => error).length

  const [open, setOpen] = useState(isDialogOpen)

  const handleClose = () => {
    onDialogClose()
  }

  const handleAdd = () => {
    if (dialogType === 'Add User') {
      onAddNewUser(form)
    } else {
      onAddNewCompany(form)
    }
  }

  const handleUpdate = () => {
    if (dialogType === 'Edit User') {
      onUserUpdate(form)
    }

    if (dialogType === 'Edit Company') {
      onCompanyUpdate(form)
    }

    if (dialogType === 'Edit role and status') {
      onUserInCompanyUpdate(form)
    }

    if (dialogType === 'Add company to user') {
      onAddCompanyToUser({
        ...form,
        emailAddress: dialogContext.emailAddress,
      })
    }
  }

  useEffect(() => {
    setOpen(isDialogOpen)
  }, [isDialogOpen])

  useEffect(() => {
    if (initialContext) {
      setNewForm(initialContext)
    } else {
      setNewForm(form)
    }
  }, [dialogContext, dialogType])

  useEffect(() => {
    if (dialogType === 'Add company to user') {
      onGetCompanies()
    }
  }, [dialogType])
  return (
    <div data-testid="dialog-wrapper">
      <Dialog
        open={open}
        data-testid="dialog-component"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{dialogType}</DialogTitle>
        <DialogContent>
          {dialogType === 'Add company to user' && (
            <CompanySelect
              companies={companies}
              form={form}
              selectHandleChange={selectHandleChange}
            />
          )}
          {Object.keys(initialContext).map((key, i) => {
            return !key.toLocaleLowerCase().includes('id') ? (
              <InputField
                key={i}
                margin="dense"
                error={errors[i]}
                name="username"
                label={key}
                type="text"
                fullWidth
                value={form[key]}
                onChange={setFormValue(key)}
              />
            ) : null
          })}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            data-testid="close-dialog-button"
            color="primary"
          >
            Cancel
          </Button>
          <Tooltip
            title={
              Boolean(isError) ? (
                <ul>
                  {errors.map(
                    (error, index) => error && <li key={index}>{error}</li>
                  )}
                </ul>
              ) : (
                <span>{submitText}</span>
              )
            }
          >
            <span>
              <Button
                data-testid="action-type-button"
                onClick={dialogContext ? handleUpdate : handleAdd}
                color="primary"
                disabled={Boolean(isError)}
              >
                {submitText}
              </Button>
            </span>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </div>
  )
}

DashboardDialog.propTypes = {
  onDialogClose: PropTypes.func.isRequired,
  onUserUpdate: PropTypes.func.isRequired,
  onAddNewUser: PropTypes.func.isRequired,
  dialogContext: PropTypes.object,
  isDialogOpen: PropTypes.bool.isRequired,
  companies: PropTypes.array.isRequired,
  onUserInCompanyUpdate: PropTypes.func.isRequired,
  onCompanyUpdate: PropTypes.func.isRequired,
  onAddCompanyToUser: PropTypes.func.isRequired,
  onAddNewCompany: PropTypes.func.isRequired,
  onGetCompanies: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const { dialogContext, isDialogOpen, dialogType } = state.user
  const { companies } = state.company
  return { dialogContext, dialogType, isDialogOpen, companies }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDialogClose: () => dispatch(closeDialog()),
    onDialogOpen: () => dispatch(openDialog()),
    onGetCompanies: () => dispatch(getCompaniesAction()),
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDialog)
