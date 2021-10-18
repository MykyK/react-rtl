import React, { useState as mockUseState } from 'react'
import TableToolBar from '..'
import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'

jest.mock('next/router')

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))
const mockRouter = useRouter

describe('<TableToolBar />', () => {
  let container
  const defaultProps = {
    onDialogOpen: jest.fn(),
    onUserDelete: jest.fn(),
    onCompanyDelete: jest.fn(),
    selectedRows: [{ original: { id: 1, generalRole: 'user' } }],
    user: { id: 1, generalRole: 'admin' },
  }

  const setState = jest.fn()
  mockUseState.mockImplementation((init) => [init, setState])
  describe('When user is admin and asPath equal "/dashboard/companies"', () => {
    mockRouter.mockImplementation(() => ({
      asPath: '/dashboard/companies',
    }))
    beforeEach(() => {
      container = render(<TableToolBar {...defaultProps} />)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should render table-toolbar', () => {
      expect(container.getByTestId('table-toolbar')).toBeInTheDocument()
    })

    describe.each([
      [
        'add-button',
        { handler: defaultProps.onDialogOpen, args: [null, 'Add Company'] },
      ],
      [
        'edit-button',
        {
          handler: defaultProps.onDialogOpen,
          args: [defaultProps.selectedRows[0].original, 'Edit Company'],
        },
      ],
      [
        'delete-button',
        {
          handler: defaultProps.onCompanyDelete,
          args: [defaultProps.selectedRows[0].original.id],
        },
      ],
    ])(
      'When onClick event was called by element with data-testid="%s"',
      (buttonTestId, call) => {
        it(`should call action`, () => {
          mockUseState.mockImplementation((init) => [true, setState])
          const { getByTestId } = container
          fireEvent.click(getByTestId(buttonTestId))
          expect(call.handler).toHaveBeenCalledTimes(1)
          expect(call.handler).toHaveBeenCalledWith(...call.args)
        })
      }
    )
  })

  describe('When user is admin and asPath equal "/dashboard"', () => {
    beforeEach(() => {
      mockRouter.mockImplementationOnce(() => ({
        asPath: '/dashboard',
      }))
      container = render(<TableToolBar {...defaultProps} />)
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    describe.each([
      [
        'add-button',
        { handler: defaultProps.onDialogOpen, args: [null, 'Add User'] },
      ],
      [
        'edit-button',
        {
          handler: defaultProps.onDialogOpen,
          args: [defaultProps.selectedRows[0].original, 'Edit User'],
        },
      ],
      [
        'delete-button',
        {
          handler: defaultProps.onUserDelete,
          args: [defaultProps.selectedRows[0].original.id],
        },
      ],
      [
        'add-company-button',
        {
          handler: defaultProps.onDialogOpen,
          args: [defaultProps.selectedRows, 'Add company to user'],
        },
      ],
    ])(
      'When onClick event was called by element with data-testid="%s"',
      (buttonTestId, call) => {
        it(`should call action`, () => {
          mockUseState.mockImplementationOnce((init) => [true, setState])
          const { getByTestId } = container
          fireEvent.click(getByTestId(buttonTestId))
          expect(call.handler).toHaveBeenCalledTimes(1)
          expect(call.handler).toHaveBeenCalledWith(...call.args)
        })
      }
    )
  })
})
