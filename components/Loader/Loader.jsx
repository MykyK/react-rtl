import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import styles from './Loader.module.scss'

export const Loader = () => (
  <div className={styles.loader} data-testid="loader">
    <CircularProgress />
  </div>
)
