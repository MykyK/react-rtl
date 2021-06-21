import React from 'react'
import MaUTable from '@material-ui/core/Table'
import PropTypes from 'prop-types'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from '../TablePaginationActions'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'

import { usePagination, useSortBy, useTable } from 'react-table'

export const Table = (props) => {
	const { columns, data } = props
	const {
		getTableProps,
		headerGroups,
		prepareRow,
		page,
		gotoPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
		},
		useSortBy,
		usePagination
	)

	const handleChangePage = (event, newPage) => {
		gotoPage(newPage)
		console.log(gotoPage(newPage))
	}

	const handleChangeRowsPerPage = (event) => {
		setPageSize(Number(event.target.value))
	}

	return (
		<TableContainer data-testid="dashboard-table">
			<MaUTable {...getTableProps()}>
				<TableHead>
					{headerGroups.map((headerGroup) => (
						<TableRow {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<TableCell
									{...column.getHeaderProps(column.getSortByToggleProps())}
								>
									{column.render('Header')}
									{column.id !== 'action' ? (
										<TableSortLabel
											active={column.isSorted}
											direction={column.isSortedDesc ? 'desc' : 'asc'}
										/>
									) : null}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{page.map((row, i) => {
						prepareRow(row)
						return (
							<TableRow {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<TableCell {...cell.getCellProps()}>
											{cell.render('Cell')}
										</TableCell>
									)
								})}
							</TableRow>
						)
					})}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[
								5,
								10,
								15,
								{
									label: 'All',
									value: data.length,
								},
							]}
							colSpan={3}
							count={data.length}
							rowsPerPage={pageSize}
							page={pageIndex}
							SelectProps={{
								inputProps: {
									'aria-label': 'rows per page',
								},
								native: true,
							}}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</MaUTable>
		</TableContainer>
	)
}

Table.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
}
