import React, { useState as mockUseState } from 'react'
import { fireEvent, cleanup, render } from '@testing-library/react'
import CompanySelect from './../index'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

describe('<CompanySelect/>', () => {
  let container
  const defaultProps = {
    selectHandleChange: jest.fn(),
    companies: [
      { companyName: 'testCompany1' },
      { companyName: 'testCompany2' },
    ],
  }
  const setSelectedOption = jest.fn()
  const event = {
    target: {
      value: '1',
    },
  }
  mockUseState.mockImplementation((init) => [init, setSelectedOption])
  describe('When default props are passed', () => {
    beforeEach(() => {
      container = render(<CompanySelect {...defaultProps} />)
    })

    afterAll(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it('should render component', () => {
      expect(
        container.getByTestId('company-select-wrapper')
      ).toBeInTheDocument()
    })
    it('should call selectHandleChange after onClick event was called by "company-select"', () => {
      const companySelect = container.getByTestId('company-select')
      fireEvent.change(companySelect, event)
      expect(defaultProps.selectHandleChange).toHaveBeenCalledTimes(1)
    })
    it('should call useState after onClick event was called by "company-select"', () => {
      expect(setSelectedOption).toHaveBeenCalledTimes(1)
      expect(setSelectedOption).toHaveBeenCalledWith(
        defaultProps.companies[event.target.value].companyName
      )
    })
    it('should render select options with correct text ', () => {
      expect(container.getAllByTestId('select-option')[0]).toHaveTextContent(
        defaultProps.companies[0].companyName
      )
      expect(container.getAllByTestId('select-option')[1]).toHaveTextContent(
        defaultProps.companies[1].companyName
      )
    })
  })
})
