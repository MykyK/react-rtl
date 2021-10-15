import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import ActionCell from './../ActionCell'
import { renderWithState } from '../../../utils/renderWithState'
import { DELETE_USER_SUCCESS, SHOW_DIALOG } from '../../../store/actionTypes'
import {
  mockUserStore,
  mockCompanyStore,
  mockAuthStore,
} from './../../../containers/Dashboard/__mocks__/index'

jest.mock('../../../store/actions/userActions.js', () => ({
  deleteCompanyFromUser: () => ({
    type: 'DELETE_COMPANY_FROM_USER_SUCCESS',
    payload: 1,
  }),
  openDialog: () => ({
    type: 'SHOW_DIALOG',
    payload: {
      original: {
        id: 1,
        userInCompany: {
          userId: 1,
        },
      },
    },
  }),
}))

describe('<ActionCell />', () => {
  const initialState = {
    user: {
      ...mockUserStore,
      user: {
        id: 1,
        generalRole: 'admin',
      },
    },
    company: mockCompanyStore,
    auth: {
      ...mockAuthStore,
      user: {
        id: 1,
        generalRole: 'admin',
      },
    },
  }
  const props = {
    row: {
      original: {
        id: 1,
        userInCompany: {
          userId: 1,
        },
      },
    },
  }
  let container

  beforeEach(() => {
    container = renderWithState(<ActionCell {...props} />, { initialState })
  })

  afterEach(() => {
    cleanup()
  })

  it('should render action-cell component', () => {
    const actionCell = container.render.getByTestId('action-cell')
    expect(actionCell).toBeInTheDocument()
  })
  it('should call handleClick event after onClick event called by action-type-button', () => {
    const handleClick = jest.fn()
    const actionButton = container.render.getByTestId('action-button')
    actionButton.onClick = handleClick({ currentTarget: {} })
    fireEvent.click(actionButton)
    expect(handleClick).toHaveBeenCalledWith({ currentTarget: {} })
  })

  it('should dispatch onDialogOpen action after onClick event called by edit-button', () => {
    const editButton = container.render.getByTestId('edit-button')
    fireEvent.click(editButton)
    expect(container.store.dispatch).toHaveBeenCalledWith({
      type: SHOW_DIALOG,
      payload: { ...props.row },
    })
  })

  it('should dispatch onDialogOpen action after onClick event called by delete-button', () => {
    const deleteButton = container.render.getByTestId('delete-button')
    fireEvent.click(deleteButton)
    expect(container.store.dispatch).toHaveBeenCalledWith({
      type: 'DELETE_COMPANY_FROM_USER_SUCCESS',
      payload: 1,
    })
  })
})
