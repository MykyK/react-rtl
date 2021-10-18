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
    <List data-testid="list-app">
      {[
        {
          name: 'Users',
          route: '/dashboard',
          icon: <PeopleIcon data-testid="people-icon" />,
        },
        {
          name: 'Companies',
          route: '/dashboard/companies',
          icon: <BusinessIcon data-testid="business-icon" />,
        },
        {
          name: 'Setting',
          route: '/settings',
          icon: <SettingsIcon data-testid="settings-icon" />,
        },
      ].map((link, index) => {
        if (link.name === 'Companies') {
          return (
            <Link key={index} href="/dashboard/companies">
              <ListItem data-testid="link-item" button>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.name} />
              </ListItem>
            </Link>
          )
        }
        return (
          <ListItem
            data-testid="link-item"
            button
            key={index}
            onClick={() => router.push(link.route)}
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.name} />
          </ListItem>
        )
      })}
    </List>
  )
}
