import React, { useState, useEffect } from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import BusinessIcon from '@material-ui/icons/Business'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from '@material-ui/core'
import styles from './TableToolBar.module.scss'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

export const TableToolBar = (props) => {
  const { onDialogOpen, selectedRows, onUserDelete, onCompanyDelete, user } =
    props

  const router = useRouter()
  const isUserContent = router.asPath == '/dashboard'
  const isAdmin = user.generalRole === 'admin'

  const [isOptionEnable, setIsOptionEnable] = useState(false)

  useEffect(() => {
    if (selectedRows[0]) {
      setIsOptionEnable(user.id == selectedRows[0].original.id)
    }
  }, [selectedRows])

  const handleAdd = () => {
    const dialogType = isUserContent ? 'Add User' : 'Add Company'
    onDialogOpen(null, dialogType)
  }
  const handleAddCompanyToUser = () => {
    onDialogOpen(selectedRows, 'Add company to user')
  }
  const handleEdit = () => {
    const dialogType = isUserContent ? 'Edit User' : 'Edit Company'
    onDialogOpen(selectedRows[0].original, dialogType)
  }
  const handleDelete = () => {
    isUserContent
      ? selectedRows.map(async (row) => {
          await onUserDelete(row.original.id)
        })
      : selectedRows.map(async (row) => {
          await onCompanyDelete(row.original.id)
        })
  }
  return (
    <div className={styles.toolbarContainer} data-testid="table-toolbar">
      {isUserContent && (
        <IconButton
          data-testid="add-company-button"
          aria-label="add-company"
          onClick={handleAddCompanyToUser}
          disabled={!selectedRows.length || !isOptionEnable}
        >
          <AddIcon fontSize="small" />
          <BusinessIcon fontSize="small" />
        </IconButton>
      )}
      <IconButton
        data-testid="add-button"
        aria-label="add-user"
        onClick={handleAdd}
        disabled={!isAdmin}
      >
        {isUserContent ? (
          <PersonAddIcon data-testid="person-icon" />
        ) : (
          <React.Fragment>
            <AddIcon fontSize="small" />
            <BusinessIcon fontSize="small" data-testid="business-icon" />
          </React.Fragment>
        )}
      </IconButton>
      <IconButton
        aria-label="edit"
        data-testid="edit-button"
        disabled={
          selectedRows.length > 1 || !selectedRows.length || !isOptionEnable
        }
        onClick={handleEdit}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        disabled={!selectedRows.length || !isOptionEnable}
        aria-label="delete"
        data-testid="delete-button"
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  )
}

TableToolBar.propTypes = {
  onDialogOpen: PropTypes.func.isRequired,
  onUserDelete: PropTypes.func.isRequired,
  onCompanyDelete: PropTypes.func.isRequired,
  selectedRows: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}
