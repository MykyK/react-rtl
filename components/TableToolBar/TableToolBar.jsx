import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import { openDialog } from '../../store/actions/userActions'
import styles from './TableToolBar.module.scss'
import { deleteUser } from './../../store/actions/userActions'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

const TableToolBar = (props) => {
  const { onDialogOpen, selectedRows, onUserDelete } = props

  const router = useRouter()
  const isUserContent = router.pathname == '/dashboard'
  const handleOpen = () => {
    isUserContent
      ? onDialogOpen(null, 'Add User')
      : onDialogOpen(null, 'Add Company')
  }
  const handleEdit = () => {
    isUserContent
      ? onDialogOpen(selectedRows[0].original, 'Edit User')
      : onDialogOpen(selectedRows[0].original, 'Edit Company')
  }
  const handleDelete = () => {
    selectedRows.map(async (row) => {
      await onUserDelete(row.original.id)
    })
  }
  return (
    <div className={styles.toolbarContainer}>
      <IconButton
        data-testid="open-dialog-button"
        aria-label="add"
        onClick={handleOpen}
      >
        <AddIcon />
      </IconButton>
      <IconButton
        aria-label="edit"
        disabled={selectedRows.length > 1 || !selectedRows.length}
        onClick={handleEdit}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        disabled={!selectedRows.length}
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
  selectedRows: PropTypes.array.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDialogOpen: (dialogContext, dialogType) => {
      dispatch(openDialog(dialogContext, dialogType))
    },
    onUserDelete: (userId) => {
      dispatch(deleteUser(userId))
    },
  }
}
export default connect(null, mapDispatchToProps)(TableToolBar)
