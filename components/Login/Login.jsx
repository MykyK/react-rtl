import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import InputField from './../InputField/index'
import ErrorNotification from './../ErrorNotification/index'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

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

export const Login = (props) => {
  const {
    onCloseNotification,
    authNotification,
    setIsSingUp,
    isError,
    form,
    isSingUp,
    setFormValue,
    errors,
    onLogin,
    onSingUp,
  } = props
  const classes = useStyles()

  const handleChangeAuthType = () => {
    isSingUp ? setIsSingUp(false) : setIsSingUp(true)
  }

  const onSubmit = async (e) => {
    e.preventDefault(e)
    if (!isSingUp) {
      await onLogin({
        emailAddress: form.emailAddress,
        password: form.password,
      })
    } else {
      await onSingUp(form)
      await onLogin({
        emailAddress: form.emailAddress,
        password: form.password,
      })
    }
  }

  return (
    <Container component="main" maxWidth="xs" data-testid="auth-component">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSingUp ? 'Sing up' : 'Sing in'}
        </Typography>
        <form
          data-testid="login-form"
          className={classes.form}
          noValidate
          onSubmit={(e) => onSubmit(e)}
        >
          {isSingUp && (
            <React.Fragment>
              <InputField
                margin="dense"
                error={errors.firstNameError}
                name="firstName"
                label="firstName"
                data-testid="firstName-input"
                type="text"
                fullWidth
                value={form.firstName}
                onChange={setFormValue('firstName')}
              />

              <InputField
                margin="dense"
                error={errors.lastNameError}
                name="lastName"
                label="lastName"
                data-testid="lastName-input"
                type="text"
                fullWidth
                value={form.lastName}
                onChange={setFormValue('lastName')}
              />
            </React.Fragment>
          )}
          <InputField
            data-testid="email-input"
            margin="dense"
            error={errors.emailError}
            name="emailAddress"
            label="Email"
            type="text"
            fullWidth
            value={form.emailAddress}
            onChange={setFormValue('emailAddress')}
          />
          <InputField
            error={errors.passwordError}
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
            disabled={isError}
            fullWidth
            variant="contained"
            color="primary"
            data-testid="login-button"
            className={classes.submit}
          >
            {isSingUp ? 'Sing up' : 'Login'}
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
            {isSingUp ? 'Login' : 'Sing up'}
          </Button>
        </form>
      </div>
      {Boolean(authNotification) && authNotification.message && (
        <ErrorNotification
          open={Boolean(authNotification)}
          severity={authNotification.type}
          onClose={onCloseNotification}
        >
          {authNotification.message}
        </ErrorNotification>
      )}
    </Container>
  )
}

Login.propTypes = {
  authNotification: PropTypes.object,
  form: PropTypes.object,
  errors: PropTypes.object,
  onCloseNotification: PropTypes.func.isRequired,
  setIsSingUp: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onSingUp: PropTypes.func.isRequired,
  setFormValue: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  isSingUp: PropTypes.bool.isRequired,
}
