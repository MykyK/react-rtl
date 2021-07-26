import React from 'react'
import ExpandedCell from './../../components/ExpandedCell/ExpandedCell'
import ActionCell from './../../components/ActionCell/index'

export const userTable = [
  {
    Header: 'USERS LIST',
    columns: [
      {
        Header: '#',
        Cell: ({ row }) => <span>{row.index + 1}</span>,
      },
      {
        Header: 'Full Name',
        accessor: 'firstName',
        Cell: ({ row }) => (
          <React.Fragment>
            <span>{row.original.firstName}</span>{' '}
            <span>{row.original.lastName}</span>
          </React.Fragment>
        ),
      },
      {
        Header: 'Email',
        accessor: 'emailAddress',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Role',
        accessor: 'generalRole',
      },
      {
        Header: () => null,
        accessor: 'companies',
        isVisible: false,
        disableSortBy: true,
        Cell: ({ row }) => <span></span>,
      },
      {
        Header: () => 'action',
        id: 'expander',
        Cell: ({ row, rows, toggleRowExpanded }) => (
          <ExpandedCell
            row={row}
            rows={rows}
            toggleRowExpanded={toggleRowExpanded}
          />
        ),
      },
    ],
  },
]

export const companiesTable = [
  {
    Header: 'Companies LIST',
    columns: [
      {
        Header: 'Name',
        accessor: 'companyName',
      },
      {
        Header: 'Role',
        accessor: 'companyRole',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => <ActionCell row={row} />,
      },
    ],
  },
]
