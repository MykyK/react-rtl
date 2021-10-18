import React, { useState } from 'react'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import PropTypes from 'prop-types'

export const CompanySelect = (props) => {
  const { selectHandleChange, companies } = props

  const [selectedOption, setSelectedOption] = useState('Company')
  const onSelectChange = (event) => {
    selectHandleChange(event)
    setSelectedOption(companies[event.target.value].companyName)
  }
  return (
    <div data-testid="company-select-wrapper">
      <InputLabel htmlFor="age-native-simple">
        Choose Company From Lists
      </InputLabel>
      <Select
        native
        name="Company"
        value={selectedOption}
        onChange={onSelectChange}
        fullWidth
        inputProps={{
          'aria-label': 'companyName',
          'data-testid': 'company-select',
        }}
      >
        <option value="">{selectedOption}</option>
        {companies.map((company, index) => {
          return (
            <option data-testid="select-option" value={index} key={index}>
              {company.companyName}
            </option>
          )
        })}
      </Select>
    </div>
  )
}

CompanySelect.propTypes = {
  companies: PropTypes.array.isRequired,
  selectHandleChange: PropTypes.func.isRequired,
}
