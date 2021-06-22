import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'

export const ErrorNotification = (props) => {
	const { open, handleCloseNotification, ...rest } = props
	return (
		<Snackbar open={open} onClose={handleCloseNotification}>
			<MuiAlert elevation={6} variant="filled" {...rest}>
				{props.children}
			</MuiAlert>
		</Snackbar>
	)
}

ErrorNotification.propTypes = {
	handleCloseNotification: PropTypes.func,
	severity: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
}
