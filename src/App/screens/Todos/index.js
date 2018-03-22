import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getChildEntities } from 'App/stores/resources'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

const Todos = ({ todos, addTodo, toggleTodo }) => {
  return (
    <section className='pa3 pa5-ns'>
      <AddTodo onSubmit={({ todo }, _, { reset }) => {
        addTodo(todo, "55be85c9-8a87-4098-995b-1f3e6009bc60")
        reset()
      }} />

      <h1 className='f4 bold center mw6'>All Todos</h1>

      <TodoList {...{ todos, toggleTodo }} />
    </section>
  )
}

Todos.propTypes = {
  todos: PropTypes.array
}

export default connect(
  state => ({
    todos: getChildEntities('todos', 'lists', '55be85c9-8a87-4098-995b-1f3e6009bc60')(state)
  }),
  dispatch => ({
    addTodo: (text, listID) => dispatch(actions.submitEntity({ text, listID }, { type: 'todos' })),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, { type: 'todos' }))
  })
)(Todos)
