import React from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import BusinessIcon from '@material-ui/icons/Business'
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
import { deleteCompanyAction } from '../../store/actions/companyActions'

const TableToolBar = (props) => {
  const { onDialogOpen, selectedRows, onUserDelete, onCompanyDelete } = props

  const router = useRouter()
  const isUserContent = router.pathname == '/dashboard'
  const handleOpen = () => {
    const dialogType = isUserContent ? 'Add User' : 'Add Company'
    onDialogOpen(null, dialogType)
  }
  const handleAddCompanyToUser = () => {
    onDialogOpen(selectedRows[0].original, 'Add company to user')
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
    <div className={styles.toolbarContainer}>
      {isUserContent && (
        <IconButton
          data-testid="open-dialog-button"
          aria-label="add-company"
          onClick={handleAddCompanyToUser}
          disabled={selectedRows.length > 1 || !selectedRows.length}
        >
          <AddIcon fontSize="small" />
          <BusinessIcon fontSize="small" />
        </IconButton>
      )}
      <IconButton
        data-testid="open-dialog-button"
        aria-label="add-user"
        onClick={handleOpen}
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
    onCompanyDelete: (companyId) => {
      dispatch(deleteCompanyAction(companyId))
    },
  }
}
export default connect(null, mapDispatchToProps)(TableToolBar)
