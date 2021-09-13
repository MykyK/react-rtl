import React from 'react'
import { getCookie } from '../utils/cookie'
import store from '../store'
import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import MainLayout from '../containers/MainLayout'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from '../utils/theme'
import { PropTypes } from 'prop-types'
import Router from 'next/router'

const MyApp = ({ Component, pageProps }) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <Provider store={store}>
      {pageProps.isAuth ? (
        <React.Fragment>
          <Head>
            <title>My page</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout {...pageProps}>
              <Component {...pageProps} />
            </MainLayout>
          </ThemeProvider>
        </React.Fragment>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  )
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)
MyApp.getInitialProps = async ({ ctx }) => {
  const { req, res } = ctx
  const token = getCookie('access_token', req)
  if (!token) {
    if (req ? req.url === '/login' : Router.path === '/login') {
      return {
        pageProps: {
          isAuth: false,
        },
      }
    }
    res.writeHead(303, {
      Location: '/login',
    })
    res.end()
    return {
      pageProps: {
        isAuth: false,
      },
    }
  }
  if (token) {
    if (req ? req.url !== '/login' : Router.path !== '/login') {
      return {
        pageProps: {
          isAuth: true,
        },
      }
    }
    res.writeHead(303, {
      Location: '/dashboard',
    })
    res.end()
    return {
      pageProps: {
        isAuth: true,
      },
    }
  }
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default wrapper.withRedux(MyApp)
