import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import store from '../store'
import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import MuiAlert from '@material-ui/lab/Alert'

const MyApp = ({ Component, pageProps }) => {
	const { isLoggedIn, authErrors } = store.getState().auth
	const router = useRouter()
	useEffect(() => {
		isLoggedIn ? router.push('/dashboard') : router.push('/login')
	}, [isLoggedIn])

	return (
		<Provider store={store}>
			<Component {...pageProps} />{' '}
		</Provider>
	)
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)
