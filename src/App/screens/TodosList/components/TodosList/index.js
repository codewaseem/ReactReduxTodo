import React, { PropTypes } from 'react'

import TodosListItem from '../TodosListItem'

const sortByDate = (arr) => arr.sort((a, b) => {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(b.createdAt) - new Date(a.createdAt)
})

const TodosList = ({ todosList, handleClick }) => {
  const sortedTodos = todosList && todosList[0] ? sortByDate(todosList) : null

  return (
    <ul className='list pl0 ml0 center mw6 ba b--light-silver br2'>
      {sortedTodos
        ? todosList.map((todoListItem, i) =>
          <TodosListItem
            key={i}
            {...todoListItem}
            handleClick={handleClick}
            isLast={(todosList.length - 1) === i}
          />
        )
        : <p className='ph3 pv3 tc'>No todos lists found</p>
      }
    </ul>
  )
}

TodosList.propTypes = {
  todosList: PropTypes.array
}

export default TodosList
