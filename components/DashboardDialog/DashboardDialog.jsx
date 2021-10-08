import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CompanySelect from './../CompanySelect/index'
import InputField from './../InputField/index'
import PropTypes from 'prop-types'

export const DashboardDialog = (props) => {
  const {
    isDialogOpen,
    errors,
    dialogContext,
    initialContext,
    dialogType,
    companies,
    setFormValue,
    submitText,
    setNewForm,
    onDialogClose,
    resetForm,
    onAddNewUser,
    onAddNewCompany,
    onUserUpdate,
    onCompanyUpdate,
    onUserInCompanyUpdate,
    onAddCompanyToUser,
    isError,
    form,
  } = props

  const selectHandleChange = (event) => {
    setNewForm({
      companyName: companies[event.target.value].companyName,
      email: companies[event.target.value].email,
      corporateNumber: companies[event.target.value].corporateNumber,
      type: companies[event.target.value].type,
    })
  }

  const handleClose = () => {
    onDialogClose()
    resetForm()
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
      dialogContext.map(async (row) => {
        await onAddCompanyToUser({
          ...form,
          emailAddress: row.original.emailAddress,
        })
      })
    }
  }
  return (
    <div data-testid="dialog-wrapper">
      <Dialog
        open={isDialogOpen}
        data-testid="dialog-component"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{dialogType}</DialogTitle>
        <DialogContent>
          {dialogType === 'Add company to user' && companies && (
            <CompanySelect
              data-testid="company-select"
              companies={companies}
              form={form}
              selectHandleChange={selectHandleChange}
            />
          )}
          {initialContext &&
            Object.keys(initialContext).map((key, i) => {
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
                    (error, index) =>
                      error && (
                        <li data-testid="error-list-item" key={index}>
                          {error}
                        </li>
                      )
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
  isDialogOpen: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  dialogContext: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  initialContext: PropTypes.object,
  form: PropTypes.object,
  companies: PropTypes.array,
  errors: PropTypes.array,
  submitText: PropTypes.string,
  dialogType: PropTypes.string,
  setFormValue: PropTypes.func,
  setNewForm: PropTypes.func,
  onDialogClose: PropTypes.func,
  resetForm: PropTypes.func,
  onAddNewUser: PropTypes.func,
  onAddNewCompany: PropTypes.func,
  onUserUpdate: PropTypes.func,
  onCompanyUpdate: PropTypes.func,
  onUserInCompanyUpdate: PropTypes.func,
  onAddCompanyToUser: PropTypes.func,
}
