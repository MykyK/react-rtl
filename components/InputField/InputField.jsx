import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
export const InputField = (props) => {
	const [touched, setTouched] = useState(false)
	const handleTouched = () => {
		setTouched(true)
	}
	return (
		<React.Fragment>
			<TextField
				data-testid="input-field"
				{...props}
				helperText={touched && props.error}
				error={touched && Boolean(props.error)}
				onClick={handleTouched}
			/>
		</React.Fragment>
	)
}

InputField.propTypes = {
	error: PropTypes.string,
	'data-testid': PropTypes.string,
	fullWidth: PropTypes.bool,
	label: PropTypes.string,
	margin: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
	type: PropTypes.string,
}
