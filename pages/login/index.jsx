import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { connect } from 'react-redux'
import { login, register } from '../../store/actions/authActions'
import { useSetForm } from '../../utils/customHooks'
import { useRouter } from 'next/router'

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

const Login = ({ onLogin, onSingUp }) => {
	const router = useRouter()
	const classes = useStyles()

	const { form, setFormValue } = useSetForm(initialUser)

	const [authType, setAuthType] = useState(false)

	const onSubmit = async (e) => {
		e.preventDefault(e)
		if (!authType) {
			await onLogin({ username: form.username, password: form.password })
			router.push('/dashboard')
		} else {
			await onSingUp(form)
			await onLogin({ username: form.username, password: form.password })
			router.push('/dashboard')
		}
	}
	const changeAuthType = () => {
		authType ? setAuthType(false) : setAuthType(true)
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form
					data-testid="login-form"
					className={classes.form}
					noValidate
					onSubmit={(e) => onSubmit(e)}
				>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="username"
						label="username"
						type="username"
						id="username"
						onChange={setFormValue('username')}
					/>
					{authType && (
						<TextField
							variant="outlined"
							data-testid="email-input"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							onChange={setFormValue('email')}
						/>
					)}
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						onChange={setFormValue('password')}
					/>
					<Button
						type="submit"
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
						onClick={changeAuthType}
						className={classes.submit}
					>
						{authType ? 'Login' : 'Sing up'}
					</Button>
				</form>
			</div>
		</Container>
	)
}

function mapStateToProps(state) {
	const { isLoggedIn } = state.auth
	return { isLoggedIn }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogin: async (data) => {
			await dispatch(login(data))
		},
		onSingUp: async (data) => {
			await dispatch(register(data))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
