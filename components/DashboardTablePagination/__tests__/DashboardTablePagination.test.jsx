import React from 'react'
import { fireEvent, cleanup, getByTestId } from '@testing-library/react'
import { renderWithState } from '../../../utils/renderWithState'
import { useTheme } from '@material-ui/core/styles'
import DashboardTablePagination from '..'

jest.mock('@material-ui/core/styles', () => ({
  ...jest.requireActual('@material-ui/core/styles'),
  makeStyles: jest.fn().mockReturnValue(() => ({
    root: {
      flexShrink: 0,
      marginLeft: 2,
    },
  })),
  useTheme: jest.fn(),
}))

const mockUseTheme = useTheme

describe('<UserTablePagination />', () => {
  describe('with default props', () => {
    const testIdsForRtl = [
      ['last-page-icon', 'first-page-button'],
      ['arrow-left', 'next-page-button'],
      ['arrow-right', 'previous-page-button'],
      ['first-page-icon', 'last-page-button'],
    ]

    const testIdsForLtl = [
      ['first-page-icon', 'first-page-button'],
      ['arrow-right', 'next-page-button'],
      ['arrow-left', 'previous-page-button'],
      ['last-page-icon', 'last-page-button'],
    ]

    describe.each(testIdsForLtl)(
      'when useTheme return description: "ltl"',
      (component, wrapper) => {
        const props = {
          count: 15,
          onPageChange: jest.fn(),
          page: 1,
          rowsPerPage: 5,
        }
        let container
        beforeEach(() => {
          mockUseTheme.mockReturnValueOnce({
            direction: 'ltl',
          })
          container = renderWithState(<DashboardTablePagination {...props} />)
        })

        afterAll(() => {
          jest.clearAllMocks()
          cleanup()
        })

        it(`should render ${component}`, () => {
          const componentWrapper = container.render.getByTestId(wrapper)
          const componentTest = getByTestId(componentWrapper, component)
          expect(componentTest).toBeInTheDocument()
        })

        it(`should call event ${wrapper}`, () => {
          const componentWrapper = container.render.getByTestId(wrapper)
          fireEvent.click(componentWrapper)
          expect(props.onPageChange).toHaveBeenCalled()
        })
      }
    )

    describe.each(testIdsForRtl)(
      'when useTheme return description: "rtl"',
      (component, wrapper) => {
        const props = {
          count: 15,
          onPageChange: jest.fn(),
          page: 1,
          rowsPerPage: 5,
        }
        let container

        beforeEach(() => {
          mockUseTheme.mockReturnValueOnce({
            direction: 'rtl',
          })
          container = renderWithState(<DashboardTablePagination {...props} />)
        })

        afterAll(() => {
          jest.clearAllMocks()
          cleanup()
        })

        it(`should render ${component}`, () => {
          const componentWrapper = container.render.getByTestId(wrapper)
          const componentTest = getByTestId(componentWrapper, component)
          expect(componentTest).toBeInTheDocument()
        })
      }
    )
  })
})
