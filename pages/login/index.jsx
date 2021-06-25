import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { connect } from 'react-redux'
import {
	login,
	register,
	resetAuthNotification,
} from '../../store/actions/authActions'
import { useFieldValidation, useSetForm } from '../../utils/customHooks'
import { useRouter } from 'next/router'
import ErrorNotification from './../../components/ErrorNotification/index'
import InputField from './../../components/InputField/index'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

const initialUser = {
	username: '',
	email: '',
	password: '',
}

const Login = (props) => {
	const { onLogin, onSingUp, notification, onResetAuthStatus, isLoggedIn } =
		props
	const router = useRouter()
	const classes = useStyles()

	const { form, setFormValue } = useSetForm(initialUser)

	const [authType, setAuthType] = useState(false)

	const [userNameError, emailError, passwordError] = useFieldValidation(form)

	const isError = authType
		? userNameError || emailError || passwordError
		: userNameError || passwordError

	const onSubmit = async (e) => {
		e.preventDefault(e)
		if (!authType) {
			await onLogin({ username: form.username, password: form.password })
		} else {
			await onSingUp(form)
			await onLogin({ username: form.username, password: form.password })
		}
	}
	const handleChangeAuthType = () => {
		authType ? setAuthType(false) : setAuthType(true)
	}

	const onCloseNotification = () => {
		onResetAuthStatus()
	}

	useEffect(() => {
		if (notification && notification.type === 'success') {
			setTimeout(() => {
				router.push('/dashboard')
			}, 400)
		}
	}, [notification])

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{authType ? 'Sing up' : 'Sing in'}
				</Typography>
				<form
					data-testid="login-form"
					className={classes.form}
					noValidate
					onSubmit={(e) => onSubmit(e)}
				>
					<InputField
						margin="dense"
						input-error={userNameError}
						name="username"
						label="UserName"
						type="text"
						fullWidth
						value={form.username}
						onChange={setFormValue('username')}
					/>
					{authType && (
						<InputField
							data-testid="email-input"
							margin="dense"
							input-error={emailError}
							name="email"
							label="Email"
							type="text"
							fullWidth
							value={form.email}
							onChange={setFormValue('email')}
						/>
					)}
					<InputField
						input-error={passwordError}
						name="password"
						margin="dense"
						label="Password"
						type="password"
						value={form.password}
						fullWidth
						onChange={setFormValue('password')}
					/>
					<Button
						type="submit"
						disabled={Boolean(isError)}
						fullWidth
						variant="contained"
						color="primary"
						data-testid="login-button"
						className={classes.submit}
					>
						{authType ? 'Sing up' : 'Login'}
					</Button>
					<Button
						type="button"
						fullWidth
						data-testid="auth-type-button"
						variant="contained"
						color="primary"
						onClick={handleChangeAuthType}
						className={classes.submit}
					>
						{authType ? 'Login' : 'Sing up'}
					</Button>
				</form>
			</div>
			{Boolean(notification) && notification.message && (
				<ErrorNotification
					data-testid="error-notification"
					open={Boolean(notification)}
					severity={notification.type}
					onClose={onCloseNotification}
				>
					{notification.message}
				</ErrorNotification>
			)}
		</Container>
	)
}

Login.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	notification: PropTypes.object,
	onLogin: PropTypes.func.isRequired,
	onSingUp: PropTypes.func.isRequired,
	onResetAuthStatus: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
	const { isLoggedIn, notification } = state.auth
	return { isLoggedIn, notification }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogin: async (data) => {
			await dispatch(login(data))
		},
		onSingUp: async (data) => {
			await dispatch(register(data))
		},
		onResetAuthStatus: () => {
			dispatch(resetAuthNotification())
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
