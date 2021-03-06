import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  mockAuthStore,
  mockUserStore,
  mockCompanyStore,
} from '../containers/Dashboard/__mocks__'

export const renderWithState = (
  ui,
  { initialState, ...renderOptions } = {}
) => {
  const defaultState = {
    user: mockUserStore,
    company: mockCompanyStore,
    auth: mockAuthStore,
  }
  const middlewares = [thunk]
  const makeStore = configureMockStore(middlewares)
  const mockStore = initialState
    ? makeStore(initialState)
    : makeStore(defaultState)
  mockStore.dispatch = jest.fn()
  const Wrapper = ({ children }) => (
    <Provider store={mockStore}>{children}</Provider>
  )

  return {
    render: render(ui, { wrapper: Wrapper, ...renderOptions }),
    store: mockStore,
  }
}
