import React from 'react'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}))

export const UserTablePagination = (props) => {
	const classes = useStyles()
	const theme = useTheme()
	const { count, page, rowsPerPage, onChangePage } = props

	const handleFirstPageButtonClick = (event) => {
		onChangePage(event, 0)
	}

	const handleBackButtonClick = (event) => {
		onChangePage(event, page - 1)
	}

	const handleNextButtonClick = (event) => {
		console.log('test')
		onChangePage(event, page + 1)
	}

	const handleLastPageButtonClick = (event) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
	}
	return (
		<div className={classes.root} data-testid="pagination-wrapper">
			<IconButton
				data-testid="first-page-button"
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? (
					<LastPageIcon data-testid="last-page-icon" />
				) : (
					<FirstPageIcon data-testid="first-page-icon" />
				)}
			</IconButton>
			<IconButton
				data-testid="previous-page-button"
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowRight data-testid="arrow-right" />
				) : (
					<KeyboardArrowLeft data-testid="arrow-left" />
				)}
			</IconButton>
			<IconButton
				data-testid="next-page-button"
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowLeft data-testid="arrow-left" />
				) : (
					<KeyboardArrowRight data-testid="arrow-right" />
				)}
			</IconButton>
			<IconButton
				data-testid="last-page-button"
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? (
					<FirstPageIcon data-testid="first-page-icon" />
				) : (
					<LastPageIcon data-testid="last-page-icon" />
				)}
			</IconButton>
		</div>
	)
}

UserTablePagination.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
}
