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

export const Login = (props) => {
  const {
    classes,
    handleChangeAuthType,
    onCloseNotification,
    authNotification,
    onSubmit,
    isError,
    form,
    authType,
    setFormValue,
    errors,
  } = props
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
          {authType && (
            <React.Fragment>
              <InputField
                margin="dense"
                error={errors.firstNameError}
                name="firstName"
                label="firstName"
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
  classes: PropTypes.object.isRequired,
  authNotification: PropTypes.object,
  form: PropTypes.object,
  errors: PropTypes.object,
  handleChangeAuthType: PropTypes.func.isRequired,
  onCloseNotification: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setFormValue: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  authType: PropTypes.bool.isRequired,
}
