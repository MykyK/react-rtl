import React, { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import { deleteUser, openDialog } from '../../store/actions/userActions'
import PropTypes from 'prop-types'

const ActionCell = (props) => {
  const { onDelete, onDialogOpen, row } = props
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDelete = () => {
    onDelete(row.original.id)
  }

  const handleEdit = () => {
    onDialogOpen(row.original)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        data-testid="action-button"
        onClick={handleClick}
      >
        <EditIcon />
      </IconButton>
      <Menu
        data-testid="action-menu"
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem data-testid="edit-button" onClick={handleEdit}>
          Edit
        </MenuItem>
        <MenuItem data-testid="delete-button" onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

ActionCell.propsTypes = {
  row: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDialogOpen: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (userId) => {
      dispatch(deleteUser(userId))
    },
    onDialogOpen: (user) => {
      dispatch(openDialog(user))
    },
  }
}

export default connect(null, mapDispatchToProps)(ActionCell)
