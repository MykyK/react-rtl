import React from 'react'
import AppHeaderMenu from './../index'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('<AppHeaderMenu />', () => {
  const defaultProps = {
    user: {
      firstName: 'firstName',
    },
    onLogOut: jest.fn(),
  }

  let container
  const push = jest.fn()

  useRouter.mockImplementation(() => ({
    push,
    pathname: '/',
    route: '/',
    asPath: '/',
    query: '',
  }))

  describe('When default props are passed', () => {
    beforeEach(() => {
      container = render(<AppHeaderMenu {...defaultProps} />)
    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it('should render component', () => {
      expect(container.getByTestId('app-header')).toBeInTheDocument()
    })

    it('should render button with user firstName', () => {
      expect(container.getByTestId('menu-button')).toHaveTextContent(
        defaultProps.user.firstName
      )
    })
    it('should call setState after onClick event has called on "menu-button"', () => {
      const handleClick = jest.fn()
      const menuButton = container.getByTestId('menu-button')
      menuButton.onClick = handleClick({ currentTarget: {} })
      fireEvent.click(menuButton)
      expect(handleClick).toHaveBeenCalledWith({ currentTarget: {} })
    })
    it('should dispatch onLogOut action and call router.push  after onClick has called on "logout-button"', () => {
      fireEvent.click(container.getByTestId('logout-button'))
      expect(defaultProps.onLogOut).toHaveBeenCalledTimes(1)
      expect(push).toHaveBeenCalledTimes(1)
      expect(push).toHaveBeenCalledWith('/login')
    })
  })
})
