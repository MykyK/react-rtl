import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import store from '../store'
import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()
  const isLoggedIn = store.getState().auth.isLoggedIn

  useEffect(() => {
    isLoggedIn ? router.push('/dashboard') : router.push('/login')
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)
