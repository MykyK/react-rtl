import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { connect } from 'react-redux'
import { getUser } from './../../store/actions/userActions'
import PropTypes from 'prop-types'

const ExpandedCell = (props) => {
  const { row, rows, toggleRowExpanded, onGetUser } = props

  const onExpanded = () => {
    const expandedRow = rows.find((row) => row.isExpanded)
    onGetUser({
      userId: row.original.id,
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
    onGetUser: (data) => {
      dispatch(getUser(data))
    },
  }
}

ExpandedCell.propTypes = {
  row: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  toggleRowExpanded: PropTypes.func.isRequired,
  onGetUser: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(ExpandedCell)
