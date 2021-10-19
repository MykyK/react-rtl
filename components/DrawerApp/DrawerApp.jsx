import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import ListApp from '../ListApp/index'
import clsx from 'clsx'

export const DrawerApp = (props) => {
  const { classes, theme, open, onSetOpen } = props
  const handleDrawerClose = () => {
    onSetOpen(false)
  }
  return (
    <Drawer
      data-testid="drawer-app"
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton data-testid="drawer-button" onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon data-testid="chevron-right" />
          ) : (
            <ChevronLeftIcon data-testid="chevron-left" />
          )}
        </IconButton>
      </div>
      <Divider />
      <ListApp />
    </Drawer>
  )
}
