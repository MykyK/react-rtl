import React, { useMemo, useEffect } from 'react'
import Table from '../../components/Table'
import ActionCell from '../../components/ActionCell'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import ActionUserDialog from '../../components/ActionUserDialog/index'
import { connect } from 'react-redux'
import { getUsers } from '../../store/actions/userActions'
import { logout } from '../../store/actions/authActions'
import styles from '../../styles/Dashboard.module.scss'
import { useRouter } from 'next/router'

const Dashboard = (props) => {
	const { users, getUsers, isLoading, onLogOut } = props
	useEffect(() => {
		getUsers()
	}, [])

	const router = useRouter()

	const handleLogOut = async () => {
		await onLogOut()
		router.push('/login')
	}
	const columns = useMemo(
		() => [
			{
				Header: 'USERS LIST',
				columns: [
					{
						Header: 'ID',
						accessor: 'id',
					},
					{
						Header: 'Username',
						accessor: 'username',
					},
					{
						Header: 'Email',
						accessor: 'email',
					},
					{
						Header: 'Action',
						accessor: 'action',
						disableSortBy: true,
						Cell: ({ row }) => <ActionCell row={row} />,
					},
				],
			},
		],
		[]
	)

	if (isLoading) {
		return (
			<div className={styles.loader} data-testid="dashboard-loader">
				<CircularProgress />
			</div>
		)
	} else {
		return (
			<div data-testid="dashboard-container">
				<React.Fragment>
					<div className={styles.spaceBetween}>
						<ActionUserDialog />
						<Button data-testid="logout" onClick={handleLogOut}>
							Logout
						</Button>
					</div>
					{users.length ? (
						<Table columns={columns} data={users} />
					) : (
						<div className={styles.centered} data-testid="no-data">
							<span>no data available</span>
						</div>
					)}
				</React.Fragment>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { users, isLoading } = state.user
	return { users, isLoading }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getUsers: () => {
			dispatch(getUsers())
		},
		onLogOut: () => dispatch(logout()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
