import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import {
  login,
  register,
  resetAuthNotification,
} from '../../store/actions/authActions'
import { useFieldValidation, useSetForm } from '../../utils/customHooks'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Login from './../../components/Login/index'

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
  firstName: '',
  lastName: '',
  emailAddress: '',
  password: '',
}

const Auth = (props) => {
  const { onLogin, onSingUp, authNotification, onResetAuthStatus } = props

  const router = useRouter()
  const classes = useStyles()

  const { form, setFormValue } = useSetForm(initialUser)

  const [authType, setAuthType] = useState(false)

  const [firstNameError, lastNameError, emailError, passwordError] =
    useFieldValidation(form)

  const isError = Boolean(
    authType
      ? firstNameError || lastNameError || emailError || passwordError
      : emailError || passwordError
  )

  const onSubmit = async (e) => {
    e.preventDefault(e)
    if (!authType) {
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
  const handleChangeAuthType = () => {
    authType ? setAuthType(false) : setAuthType(true)
  }

  const onCloseNotification = () => {
    onResetAuthStatus()
  }

  const loginProps = {
    classes,
    handleChangeAuthType,
    onCloseNotification,
    authNotification,
    onSubmit,
    setFormValue,
    authType,
    isError,
    form,
    errors: { firstNameError, lastNameError, emailError, passwordError },
  }

  useEffect(() => {
    if (authNotification && authNotification.type === 'success') {
      setTimeout(() => {
        router.push('/dashboard')
      }, 400)
    }
  }, [authNotification])

  return <Login {...loginProps} />
}

Auth.propTypes = {
  authNotification: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
  onSingUp: PropTypes.func.isRequired,
  onResetAuthStatus: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { isLoggedIn, authNotification } = state.auth
  return { isLoggedIn, authNotification }
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
