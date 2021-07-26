import React, { useState, useEffect } from 'react'
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
import { resetAuthNotification } from '../../store/actions/authActions'
import { useFieldValidation, useSetForm } from '../../utils/customHooks'
import InputField from '../InputField/index'
import { useDialogContext } from '../../utils/customHooks'
import { updateCompany } from '../../store/actions/companyActions'
import { updateUserInCompany } from '../../store/actions/userActions'

const DashboardDialog = (props) => {
  const {
    dialogContext,
    dialogType,
    isDialogOpen,
    onDialogClose,
    onCompanyUpdate,
    onUserInCompanyUpdate,
    onUserUpdate,
    onGetUsers,
    onAddNewUser,
    notification,
  } = props

  const initialContext = useDialogContext({
    dialogContext,
    dialogType,
  })

  const { form, setFormValue, setNewForm } = useSetForm(initialContext)

  const errors = useFieldValidation(form)

  const isError = initialContext
    ? errors.filter((error) => error).length
    : errors.filter((error) => error).length

  const [open, setOpen] = useState(isDialogOpen)

  const handleClose = () => {
    onDialogClose()
  }

  const handleAdd = () => {
    onAddNewUser(form)
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
  }

  useEffect(() => {
    setOpen(isDialogOpen)
  }, [isDialogOpen])

  useEffect(() => {
    if (notification && notification.type === 'success') {
      setTimeout(() => {
        onGetUsers()
        handleClose()
      }, 400)
    }
  }, [notification])

  useEffect(() => {
    if (initialContext) {
      setNewForm(initialContext)
    } else {
      setNewForm(form)
    }
  }, [dialogContext])

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
          <Button
            data-testid="action-type-button"
            onClick={dialogContext ? handleUpdate : handleAdd}
            color="primary"
            disabled={Boolean(isError)}
          >
            {dialogContext ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

DashboardDialog.propTypes = {
  onDialogClose: PropTypes.func.isRequired,
  onDialogOpen: PropTypes.func.isRequired,
  onUserUpdate: PropTypes.func.isRequired,
  onAddNewUser: PropTypes.func.isRequired,
  dialogContext: PropTypes.object,
  isDialogOpen: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  const { dialogContext, isDialogOpen, dialogType, notification } = state.user
  return { dialogContext, dialogType, isDialogOpen, notification }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDialogClose: () => dispatch(closeDialog()),
    onDialogOpen: () => dispatch(openDialog()),
    onGetUsers: () => dispatch(getUsers()),
    onUserUpdate: (data) => {
      dispatch(updateUser(data))
    },
    onAddNewUser: (data) => {
      dispatch(createUser(data))
    },
    onCompanyUpdate: (data) => {
      dispatch(updateCompany(data))
    },
    onUserInCompanyUpdate: (data) => {
      dispatch(updateUserInCompany(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDialog)
