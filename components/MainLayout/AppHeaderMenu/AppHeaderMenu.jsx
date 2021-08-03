import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { connect } from 'react-redux'
import { logout } from '../../../store/actions/authActions'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const AppHeaderMenu = (props) => {
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
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
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
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

AppHeaderMenu.propsTypes = {
  user: PropTypes.object.isRequired,
  onLogOut: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const { user } = state.auth
  return { user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderMenu)
