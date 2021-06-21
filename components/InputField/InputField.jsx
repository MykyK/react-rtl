import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
export const InputField = (props) => {
	const [touched, setTouched] = useState(false)
	const handleTouched = () => {
		setTouched(true)
	}
	return (
		<React.Fragment>
			<TextField
				{...props}
				helperText={touched && props.inputError}
				error={touched && !!props.inputError}
				onFocus={handleTouched}
			/>
		</React.Fragment>
	)
}
