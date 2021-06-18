import React, { useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import { connect } from 'react-redux'
import { closeDialog } from '../../store/actions/userActions'
import { openDialog, updateUser, getUsers } from '../../store/actions/userActions';
import { register } from '../../store/actions/authActions'
import { useSetForm } from '../../utils/customHooks'

const initialUser = {
  username: '',
  email: '',
  password: ''
}

const ActionUserDialog = props => {
  const {
    contextUser,
    isDialogOpen,
    onDialogClose,
    onDialogOpen,
    onUserUpdate,
    addNewUser
  } = props;
  const { form, setFormValue, setNewForm } = useSetForm(initialUser)

  const [open,
    setOpen] = useState(isDialogOpen)

  const handleOpen = () => {
    onDialogOpen()
  }

  const handleClose = () => {
    onDialogClose()
  }

  const handleAdd = () => {
    addNewUser(form)
  }

  const handleUpdate = () => {
    onUserUpdate(form.id, { username: form.username, email: form.email })
  }

  useEffect(() => {
    setOpen(isDialogOpen)
  }, [isDialogOpen])

  useEffect(() => {
    if (contextUser) {
      setNewForm(contextUser)
    } else {
      setNewForm(form)
    }
  }, [contextUser])

  return (
    <div data-testid="dialog-wrapper">
      <Tooltip title="Add">
        <IconButton data-testid="open-dialog-button" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} data-testid="dialog-component" onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="UserName"
            type="text"
            fullWidth
            value={form.username}
            onChange={setFormValue('username')} />
          <TextField
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            value={form.email}
            onChange={setFormValue('email')} />
          {!contextUser && <TextField
            data-testid="password-input"
            margin="dense"
            label="Password"
            type="password"
            value={form.password}
            fullWidth
            onChange={setFormValue('password')} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} data-testid="close-dialog-button" color="primary">
            Cancel
          </Button>
          <Button
            data-testid="action-type-button"
            onClick={contextUser
              ? handleUpdate
              : handleAdd}
            color="primary">
            {contextUser
              ? 'Save'
              : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

ActionUserDialog.propTypes = {
  onDialogClose: PropTypes.func.isRequired,
  onDialogOpen: PropTypes.func.isRequired,
  onUserUpdate: PropTypes.func.isRequired,
  addNewUser: PropTypes.func.isRequired,
  contextUser: PropTypes.object,
  isDialogOpen: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  const { contextUser, isDialogOpen } = state.user
  return { contextUser, isDialogOpen }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDialogClose: () => dispatch(closeDialog()),
    onDialogOpen: () => dispatch(openDialog()),
    onUserUpdate: async (userId, data) => {
      await dispatch(updateUser(userId, data))
      dispatch(closeDialog())
      dispatch(getUsers())
    },
    addNewUser: async (data) => {
      await dispatch(register(data))
      dispatch(closeDialog())
      dispatch(getUsers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionUserDialog)
