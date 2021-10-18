import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

export const AppHeaderMenu = (props) => {
  const { user, onLogOut } = props
  const [anchorEl, setAnchorEl] = React.useState(null)
  const router = useRouter()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    onLogOut()
    router.push('/login')
  }

  return (
    <div data-testid="app-header">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        data-testid="menu-button"
        onClick={handleClick}
      >
        <span suppressHydrationWarning>{user && user.firstName}</span>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem data-testid="logout-button" onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}

AppHeaderMenu.propsTypes = {
  user: PropTypes.object.isRequired,
  onLogOut: PropTypes.func.isRequired,
}
