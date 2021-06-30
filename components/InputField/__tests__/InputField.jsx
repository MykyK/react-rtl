import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithState } from '../../../utils/renderWithState'
import InputField from '..'

describe('<InputField />', () => {
  let container
  const props = {
    error: 'test',
  }
  beforeEach(() => {
    container = renderWithState(<InputField {...props} />)
  })

  it('should render error text', () => {
    const inputField = container.render.getByTestId('input-field')
    fireEvent.click(inputField)
    expect(inputField.textContent).toBe('test')
  })
})
