import React from 'react'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import PropTypes from 'prop-types'

export const CompanySelect = (props) => {
  const { selectHandleChange, companies } = props

  const [selectedOption, setSelectedOption] = React.useState('Company')
  const onSelectChange = (event) => {
    selectHandleChange(event)
    setSelectedOption(companies[event.target.value].companyName)
  }
  return (
    <React.Fragment>
      <InputLabel htmlFor="age-native-simple">
        Choose Company From Lists
      </InputLabel>
      <Select
        native
        name="Company"
        value={selectedOption}
        onChange={onSelectChange}
        fullWidth
        inputProps={{ 'aria-label': 'companyName' }}
      >
        <option value="">{selectedOption}</option>
        {companies.map((company, index) => {
          return (
            <option value={index} key={index}>
              {company.companyName}
            </option>
          )
        })}
      </Select>
    </React.Fragment>
  )
}

CompanySelect.propTypes = {
  companies: PropTypes.array.isRequired,
  selectHandleChange: PropTypes.func.isRequired,
}
