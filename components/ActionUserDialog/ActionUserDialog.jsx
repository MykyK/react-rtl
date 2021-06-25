import React, { useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import { connect } from 'react-redux'
import { closeDialog } from '../../store/actions/userActions'
import {
	openDialog,
	updateUser,
	getUsers,
} from '../../store/actions/userActions'
import {
	register,
	resetAuthNotification,
} from '../../store/actions/authActions'
import { useFieldValidation, useSetForm } from '../../utils/customHooks'
import ErrorNotification from './../ErrorNotification/index'
import InputField from './../InputField/index'

const initialUser = {
	username: '',
	email: '',
	password: '',
}

const ActionUserDialog = (props) => {
	const {
		contextUser,
		isDialogOpen,
		onDialogClose,
		onDialogOpen,
		onUserUpdate,
		onGetUsers,
		addNewUser,
		onResetAuthStatus,
		status,
	} = props

	const { form, setFormValue, setNewForm } = useSetForm(initialUser)

	const [userNameError, emailError, passwordError] = useFieldValidation(form)

	const isError = contextUser
		? userNameError || emailError || passwordError
		: userNameError || emailError

	const [open, setOpen] = useState(isDialogOpen)

	const handleOpen = () => {
		onDialogOpen()
	}

	const handleClose = () => {
		onDialogClose()
		onResetAuthStatus()
	}

	const handleCloseNotification = () => {
		onResetAuthStatus()
	}

	const handleAdd = async () => {
		await addNewUser(form)
	}

	const handleUpdate = () => {
		onUserUpdate({
			username: form.username,
			email: form.email,
			userId: form.id,
		})
	}

	useEffect(() => {
		setOpen(isDialogOpen)
	}, [isDialogOpen])

	useEffect(() => {
		if (status && status.type === 'success') {
			setTimeout(() => {
				onGetUsers()
				handleClose()
			}, 400)
		}
	}, [status])

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
				<IconButton
					data-testid="open-dialog-button"
					aria-label="add"
					onClick={handleOpen}
				>
					<AddIcon />
				</IconButton>
			</Tooltip>
			<Dialog
				open={open}
				data-testid="dialog-component"
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Add User</DialogTitle>
				<DialogContent>
					<InputField
						margin="dense"
						error={userNameError}
						name="username"
						label="UserName"
						type="text"
						fullWidth
						value={form.username}
						onChange={setFormValue('username')}
					/>
					<InputField
						margin="dense"
						error={emailError}
						name="email"
						label="Email"
						type="text"
						fullWidth
						value={form.email}
						onChange={setFormValue('email')}
					/>
					{!contextUser && (
						<InputField
							data-testid="password-input"
							error={passwordError}
							name="password"
							margin="dense"
							label="Password"
							type="password"
							value={form.password}
							fullWidth
							onChange={setFormValue('password')}
						/>
					)}
					{Boolean(status) && (
						<ErrorNotification
							data-testid="error-notification"
							open={Boolean(status)}
							severity={status.type}
							onClose={handleCloseNotification}
						>
							{status.message}
						</ErrorNotification>
					)}
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
						onClick={contextUser ? handleUpdate : handleAdd}
						color="primary"
						disabled={Boolean(isError)}
					>
						{contextUser ? 'Save' : 'Add'}
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
	const { status } = state.auth
	return { contextUser, isDialogOpen, status }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onDialogClose: () => dispatch(closeDialog()),
		onDialogOpen: () => dispatch(openDialog()),
		onGetUsers: () => dispatch(getUsers()),
		onUserUpdate: (userId, data) => {
			dispatch(updateUser(userId, data))
		},
		addNewUser: (data) => {
			dispatch(register(data))
		},
		onResetAuthStatus: () => {
			dispatch(resetAuthNotification())
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionUserDialog)
