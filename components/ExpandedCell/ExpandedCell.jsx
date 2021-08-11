import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { connect } from 'react-redux'
import { getUserContext } from './../../store/actions/userActions'
import PropTypes from 'prop-types'

const ExpandedCell = (props) => {
  const { row, rows, toggleRowExpanded, onGetUserContext } = props

  const onExpanded = () => {
    const expandedRow = rows.find((row) => row.isExpanded)
    onGetUserContext({
      context: row.original,
      isExpanded: !Boolean(row.isExpanded),
    })
    if (expandedRow) {
      const isSubItemOfRow = Boolean(
        expandedRow && row.id.split('.')[0] === expandedRow.id
      )

      if (!isSubItemOfRow) {
        toggleRowExpanded(expandedRow.id, false)
      }
    }
    row.toggleRowExpanded()
  }
  return (
    <span
      {...row.getToggleRowExpandedProps({
        onClick: () => onExpanded(),
      })}
    >
      {row.isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </span>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserContext: (data) => {
      dispatch(getUserContext(data))
    },
  }
}

ExpandedCell.propTypes = {
  row: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  toggleRowExpanded: PropTypes.func.isRequired,
  onGetUserContext: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(ExpandedCell)
