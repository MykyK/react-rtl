import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'

export const ErrorNotification = (props) => {
  const { open, onCloseNotification, ...rest } = props
  return (
    <Snackbar
      data-testid="error-notification"
      open={open}
      onClose={onCloseNotification}
    >
      <MuiAlert elevation={6} variant="filled" {...rest}>
        {props.children}
      </MuiAlert>
    </Snackbar>
  )
}

ErrorNotification.propTypes = {
  onCloseNotification: PropTypes.func,
  severity: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
}
