import { render } from '@testing-library/react'
import React from 'react'
import DrawerApp from './../index'
import { fireEvent, cleanup } from '@testing-library/react'
describe('<DrawerApp />', () => {
  let container

  const defaultProps = {
    theme: {
      direction: 'rtl',
    },
    classes: {
      drawer: 'drawer',
      drawerOpen: 'drawerOpen',
      drawerClose: 'drawerClose',
      toolbar: 'toolbar',
    },
    open: true,
    onSetOpen: jest.fn(),
  }

  afterAll(() => {
    jest.clearAllMocks()
    cleanup()
  })
  describe('When default props are passed ', () => {
    beforeEach(() => {
      container = render(<DrawerApp {...defaultProps} />)
    })
    it('should render component', () => {
      expect(container.getByTestId('drawer-app')).toBeInTheDocument()
    })

    it('should call setOpen after onClick event was called by "drawer-button" ', () => {
      fireEvent.click(container.getByTestId('drawer-button'))
      expect(defaultProps.onSetOpen).toHaveBeenCalledWith(false)
    })

    it('should render component with test id "chevron-right" ', () => {
      expect(container.getByTestId('chevron-right')).toBeInTheDocument()
    })

    it('should not render component with test id "chevron-left" ', () => {
      expect(() => container.getByTestId('chevron-left')).toThrow(
        'Unable to find an element'
      )
    })
  })
  describe('When prop theme.direction is "ltl" ', () => {
    const props = {
      ...defaultProps,
      theme: {
        direction: 'ltl',
      },
    }
    beforeEach(() => {
      container = render(<DrawerApp {...props} />)
    })
    it('should render component with test id "chevron-left" ', () => {
      expect(container.getByTestId('chevron-left')).toBeInTheDocument()
    })

    it('should not render component with test id "chevron-right" ', () => {
      expect(() => container.getByTestId('chevron-right')).toThrow(
        'Unable to find an element'
      )
    })
  })
})
