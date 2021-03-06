import React from 'react'
import ExpandedCell from '../../components/ExpandedCell/ExpandedCell'
import ActionCell from '../../components/ActionCell/index'
import Link from 'next/link'
import ForwardIcon from '@material-ui/icons/Forward'
import IconButton from '@material-ui/core/IconButton'

export const userTable = [
  {
    Header: 'USERS LIST',
    columns: [
      {
        Header: 'ID',
        Cell: ({ row }) => <span>{row.original.id}</span>,
      },
      {
        Header: 'Full Name',
        accessor: 'firstName',
        Cell: ({ row }) => (
          <React.Fragment>
            <span>{row.original.firstName}</span>
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
        accessor: 'phoneNumber',
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

export const userCompaniesTable = [
  {
    Header: 'User Companies List',
    columns: [
      {
        Header: 'Name',
        accessor: (originalRow) =>
          originalRow.companyName ? originalRow.companyName : '-',
      },
      {
        Header: 'Role',
        accessor: (originalRow) =>
          originalRow.userInCompany.companyRole
            ? originalRow.userInCompany.companyRole
            : '-',
      },
      {
        Header: 'Status',
        accessor: (originalRow) =>
          originalRow.userInCompany.status
            ? originalRow.userInCompany.status
            : '-',
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => <ActionCell row={row} />,
      },
    ],
  },
]

export const companiesTable = [
  {
    Header: 'COMPANIES LIST',
    columns: [
      {
        Header: 'ID',
        Cell: ({ row }) => <span>{row.original.id}</span>,
      },
      {
        Header: 'Company Name',
        accessor: 'companyName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'corporateNumber',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Users Quantity',
        accessor: 'users',
        Cell: ({ row }) => <span>{row.original.users.length}</span>,
      },
      {
        Header: () => 'action',
        id: 'link',
        Cell: ({ row }) => (
          <Link
            key={row.original.id}
            href={`/dashboard/companies/${row.original.id}`}
          >
            <IconButton>
              <ForwardIcon />
            </IconButton>
          </Link>
        ),
      },
    ],
  },
]
