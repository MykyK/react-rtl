import React from 'react'
import ExpandedCell from '..'
import { renderWithState } from '../../../utils/renderWithState'
import { fireEvent, cleanup } from '@testing-library/react'

import {
  mockUserStore,
  mockCompanyStore,
  mockAuthStore,
} from './../../../containers/Dashboard/__mocks__/index'

jest.mock('../../../store/actions/userActions', () => ({
  getUser: () => ({
    type: 'GET_USER_SUCCESS',
    payload: [{ emailAddress: 'test@test.com' }],
  }),
  getRowExpandedStatus: () => ({
    type: 'GET_EXPANDED_STATUS',
  }),
}))

describe('<ExpandedCell />', () => {
  let container
  const initialState = {
    user: mockUserStore,
    company: mockCompanyStore,
    auth: mockAuthStore,
  }
  initialState.dispatch = jest.fn()
  const defaultProps = {
    row: {
      id: '1',
      original: { id: 1 },
      isExpanded: true,
      toggleRowExpanded: jest.fn(),
    },
    rows: [
      { original: { id: 1 }, isExpanded: true, id: '1' },
      { original: { id: 2 }, isExpanded: false, id: '2' },
    ],
    onGetUser: jest.fn(),
    onGetRowExpandedStatus: jest.fn(),
    toggleRowExpanded: jest.fn(),
  }

  describe('When row.id == expandedRow.id', () => {
    beforeEach(() => {
      container = renderWithState(<ExpandedCell {...defaultProps} />, {
        initialState,
      })
    })

    it('should render expanded-cell', () => {
      const expandedCell = container.render.getByTestId('expanded-cell')
      expect(expandedCell).toBeInTheDocument()
    })

    it('should dispatch actions after onClick event called by expanded-cell', () => {
      const expandedCell = container.render.getByTestId('expanded-cell')
      fireEvent.click(expandedCell)
      expect(defaultProps.row.toggleRowExpanded).toHaveBeenCalledTimes(1)
      expect(container.store.dispatch).toHaveBeenCalledTimes(2)
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'GET_USER_SUCCESS',
        payload: [{ emailAddress: 'test@test.com' }],
      })
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'GET_EXPANDED_STATUS',
      })
    })

    it('should render expand-less', () => {
      const expandedLessIcon = container.render.getByTestId('expand-less')
      expect(expandedLessIcon).toBeInTheDocument()
    })
  })

  describe('When row.id !== expandedRow.id and row is not expanded', () => {
    const props = {
      ...defaultProps,
      row: {
        id: '1',
        original: { id: 1 },
        isExpanded: false,
        toggleRowExpanded: jest.fn(),
      },
      rows: [
        { original: { id: 1 }, isExpanded: false, id: '1' },
        { original: { id: 2 }, isExpanded: true, id: '2' },
      ],
    }

    beforeEach(() => {
      container = renderWithState(<ExpandedCell {...props} />, {
        initialState,
      })
    })

    it('should dispatch actions after onClick event called by expanded-cell', () => {
      const expandedCell = container.render.getByTestId('expanded-cell')
      fireEvent.click(expandedCell)
      expect(props.toggleRowExpanded).toHaveBeenCalledTimes(1)
      expect(container.store.dispatch).toHaveBeenCalledTimes(2)
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'GET_USER_SUCCESS',
        payload: [{ emailAddress: 'test@test.com' }],
      })
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'GET_EXPANDED_STATUS',
      })
    })
    it('should render expand-more', () => {
      const expandMoreIcon = container.render.getByTestId('expand-more')
      expect(expandMoreIcon).toBeInTheDocument()
    })
  })
})
