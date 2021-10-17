import React, { useState, useEffect } from 'react'
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

const initialUser = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  password: '',
}

const Auth = (props) => {
  const { onLogin, onSingUp, authNotification, onResetAuthStatus } = props

  const router = useRouter()

  const { form, setFormValue } = useSetForm(initialUser)

  const [isSingUp, setIsSingUp] = useState(false)

  const [firstNameError, lastNameError, emailError, passwordError] =
    useFieldValidation(form)

  const isError = Boolean(
    isSingUp
      ? firstNameError || lastNameError || emailError || passwordError
      : emailError || passwordError
  )

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
  const handleChangeAuthType = () => {
    isSingUp ? setIsSingUp(false) : setIsSingUp(true)
  }

  const onCloseNotification = () => {
    onResetAuthStatus()
  }

  const loginProps = {
    handleChangeAuthType,
    onCloseNotification,
    authNotification,
    onSubmit,
    setFormValue,
    isSingUp,
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
