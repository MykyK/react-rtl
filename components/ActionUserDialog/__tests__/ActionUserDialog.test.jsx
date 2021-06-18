import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import { renderWithState } from '../../../utils/renderWithState';
import ActionUserDialog from './../index';
import { mockUserStore, mockAuthStore } from './../../../pages/dashboard/__mocks__/index';
import { REGISTER_SUCCESS, UPDATE_USER_SUCCESS, HIDE_DIALOG, SHOW_DIALOG } from './../../../store/constants';


jest.mock("../../../store/actions/userActions.js", () => ({
  getUsers: () => ({ type: "GET_USERS_SUCCESS", payload: [{ username: 'test' }] }),
  closeDialog: () => ({ type: "HIDE_DIALOG" }),
  openDialog: () => ({ type: "SHOW_DIALOG" }),
  updateUser: () => ({ type: "UPDATE_USER_SUCCESS" })
}));

jest.mock("../../../store/actions/authActions.js", () => ({
  register: () => ({ type: "REGISTER_SUCCESS" }),
}));


describe('<ActionUserDialog />', () => {
  describe('when default props are passed', () => {
    describe('when dialog is closed', () => {
      let container;
      beforeEach(() => {
        container = renderWithState(<ActionUserDialog />)
      })

      afterEach(() => {
        jest.clearAllMocks()
        cleanup()
      })

      it('should render component', () => {
        expect(container.render.getByTestId('dialog-wrapper')).toBeInTheDocument()
      })

      it('should not render dialog-component ', () => {
        expect(() => container.render.getByTestId('dialog-component')).toThrow('Unable to find an element');
      })

      it('should dispatch action after onClick event called by open-dialog-button', () => {
        const openDialogButton = container.render.getByTestId('open-dialog-button')
        fireEvent.click(openDialogButton)
        expect(container.store.dispatch).toHaveBeenCalledWith({
          type: SHOW_DIALOG
        });
      })
    })

    describe('when dialog is open', () => {
      let container;
      const initialState = {
        user: { ...mockUserStore, isDialogOpen: true },
        auth: mockAuthStore
      }

      beforeEach(() => {
        container = renderWithState(<ActionUserDialog />, { initialState })
      })

      afterEach(() => {
        jest.clearAllMocks()
        cleanup()
      })

      it('should render dialog-component', () => {
        expect(container.render.getByTestId('dialog-component')).toBeInTheDocument()
      })

      it('should render password-input', () => {
        expect(container.render.getByTestId('password-input')).toBeInTheDocument()
      })

      it('should render action-type-button with "Add" text content', () => {
        const actionTypeButton = container.render.getByTestId('action-type-button')
        expect(actionTypeButton.textContent).toBe("Add");
      })

      it('should dispatch action after onClick event called by action-type-button ', () => {
        const actionTypeButton = container.render.getByTestId('action-type-button')
        fireEvent.click(actionTypeButton)
        expect(container.store.dispatch).toHaveBeenCalledWith({
          type: REGISTER_SUCCESS
        });
      })

      it('should dispatch action after onClick event called by close-dialog-button', () => {
        const closeDialogButton = container.render.getByTestId('close-dialog-button')
        fireEvent.click(closeDialogButton)
        expect(container.store.dispatch).toHaveBeenCalledWith({
          type: HIDE_DIALOG
        });
      })
    })
  })

  describe('when contextUser exists in props and dialog is open', () => {
    const initialState = {
      user: { ...mockUserStore, contextUser: { username: 'test', email: 'test@test.com', password: 'test123' }, isDialogOpen: true },
      auth: mockAuthStore
    }
    let container;
    beforeEach(() => {
      container = renderWithState(<ActionUserDialog />, { initialState })
    })

    afterEach(() => {
      jest.clearAllMocks()
      cleanup()
    })

    it('should render action-type-button with "Save" text content', () => {
      const actionTypeButton = container.render.getByTestId('action-type-button')
      expect(actionTypeButton.textContent).toBe("Save");
    })

    it('should dispatch action after onClick event called by action-type-button ', () => {
      const actionTypeButton = container.render.getByTestId('action-type-button')
      fireEvent.click(actionTypeButton)
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: UPDATE_USER_SUCCESS
      });
    })

    it('should not render password-input ', () => {
      expect(() => container.render.getByTestId('password-input')).toThrow('Unable to find an element');
    })


  })
})
