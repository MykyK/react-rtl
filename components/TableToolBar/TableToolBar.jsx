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
  const [isOptionEnable, setIsOptionEnable] = useState(false)
  const isAdmin = user.generalRole === 'admin'

  useEffect(() => {
    if (selectedRows[0]) {
      setIsOptionEnable(isAdmin || user.id == selectedRows[0].original.id)
    }
  }, [selectedRows])

  const handleOpen = () => {
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
          data-testid="open-dialog-button"
          aria-label="add-company"
          onClick={handleAddCompanyToUser}
          disabled={!selectedRows.length || !isOptionEnable}
        >
          <AddIcon fontSize="small" />
          <BusinessIcon fontSize="small" />
        </IconButton>
      )}
      <IconButton
        data-testid="open-dialog-button"
        aria-label="add-user"
        onClick={handleOpen}
        disabled={!isAdmin}
      >
        {isUserContent ? (
          <PersonAddIcon />
        ) : (
          <React.Fragment>
            <AddIcon fontSize="small" />
            <BusinessIcon fontSize="small" />
          </React.Fragment>
        )}
      </IconButton>
      <IconButton
        aria-label="edit"
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
