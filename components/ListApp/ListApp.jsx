import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import BusinessIcon from '@material-ui/icons/Business'
import PeopleIcon from '@material-ui/icons/People'
import SettingsIcon from '@material-ui/icons/Settings'
import List from '@material-ui/core/List'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const ListApp = () => {
  const router = useRouter()

  return (
    <List>
      {[
        { name: 'Users', route: '/dashboard', icon: <PeopleIcon /> },
        {
          name: 'Companies',
          route: '/dashboard/companies',
          icon: <BusinessIcon />,
        },
        { name: 'Setting', route: '/settings', icon: <SettingsIcon /> },
      ].map((link, index) => {
        if (link.name === 'Companies') {
          return (
            <Link key={index} href="/dashboard/companies">
              <ListItem button>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.name} />
              </ListItem>
            </Link>
          )
        }
        return (
          <ListItem button key={index} onClick={() => router.push(link.route)}>
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.name} />
          </ListItem>
        )
      })}
    </List>
  )
}
