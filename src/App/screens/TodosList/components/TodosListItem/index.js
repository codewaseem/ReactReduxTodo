import React, { PropTypes } from 'react'

import classNames from 'classnames'

const TodosListItem = ({ id, name, handleClick, isLast }) => {
  const todoClass = classNames(
    'ph3 pv3 pointer bg-animate hover-bg-light-gray',
    {
      'bb b--light-silver': !isLast,
    }
  )

  return (
    <li className={todoClass} onClick={() => handleClick(id)}>{name}</li>
  )
}

TodosListItem.propTypes = {
  name: PropTypes.string.isRequired,
  isLast: PropTypes.bool
}

export default TodosListItem
