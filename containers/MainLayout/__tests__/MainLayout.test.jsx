import React, { useState as mockUseState } from 'react'
import { renderWithState } from './../../../utils/renderWithState'
import MainLayout from './../MainLayout'
import { fireEvent, cleanup } from '@testing-library/react'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

describe('<MainLayout />', () => {
  let container
  const setOpen = jest.fn()
  mockUseState.mockImplementation((init) => [init, setOpen])
  beforeEach(() => {
    container = renderWithState(<MainLayout />)
  })

  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('should render component', () => {
    expect(container.render.getByTestId('main-layout')).toBeInTheDocument()
  })
  it('should call setOpen after onClick event was called by "open-drawer" ', () => {
    fireEvent.click(container.render.getByTestId('open-drawer'))
    expect(setOpen).toHaveBeenCalledWith(true)
  })
})
