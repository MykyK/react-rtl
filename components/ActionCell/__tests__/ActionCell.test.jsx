import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import ActionCell from './../ActionCell';
import { renderWithState } from '../../../utils/renderWithState';
import { DELETE_USER_SUCCESS, SHOW_DIALOG } from '../../../store/constants';


jest.mock("../../../store/actions/userActions.js", () => ({
  deleteUser: () => ({ type: "DELETE_USER_SUCCESS", payload: 1 }),
  openDialog: () => ({
    type: "SHOW_DIALOG", payload: {
      original: {
        id: 1
      }
    }
  })
}));


describe('test', () => {
  const props = {
    row: {
      original: {
        id: 1
      }
    }
  }
  let container;

  beforeEach(() => {
    container = renderWithState(<ActionCell {...props} />)
  })

  afterEach(() => {
    cleanup()
  })

  it('should call handleClick event after onClick event called by action-type-button', () => {
    const handleClick = jest.fn()
    const actionButton = container.render.getByTestId('action-button')
    actionButton.onClick = handleClick({ currentTarget: {} })
    fireEvent.click(actionButton)
    expect(handleClick).toHaveBeenCalledWith({ currentTarget: {} })
  })

  it('test', () => {
    const actionMenu = container.render.getByTestId('action-menu')
    fireEvent.click(document.body)
    expect(actionMenu).toHaveBeenLastCalledWith(expect.objectContaining({ open: false }), {})
  });

  it('should dispatch onDialogOpen action after onClick event called by edit-button', () => {
    const editButton = container.render.getByTestId('edit-button')
    fireEvent.click(editButton)
    expect(container.store.dispatch).toHaveBeenCalledWith({ type: SHOW_DIALOG, payload: { ...props.row } })
  })

  it('should dispatch onDialogOpen action after onClick event called by delete-button', () => {
    const deleteButton = container.render.getByTestId('delete-button')
    fireEvent.click(deleteButton)
    expect(container.store.dispatch).toHaveBeenCalledWith({ type: DELETE_USER_SUCCESS, payload: 1 })
  })
})
