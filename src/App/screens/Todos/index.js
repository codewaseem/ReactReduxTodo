import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import { getEntities } from 'App/stores/resources';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_ALL':
    default:
      return todos
  }
}

const Todos = ({ todos, addTodo, toggleTodo, selectedTodoList, setFilter }) => {
  return (
    <section className='pa3 pa5-ns'>
      <AddTodo onSubmit={({ todo }, _, { reset }) => {
        addTodo(todo, selectedTodoList)
        reset()
      }} />

      <h1 className='f4 bold center mw6'>All Todos</h1>
      <nav className="bt bb tc mw6 center">
        <span onClick={setFilter.bind(null, "SHOW_ALL")} className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" >ALL</span>
        <span onClick={setFilter.bind(null, "SHOW_ACTIVE")} className="f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l" >ACTIVE</span>
        <span onClick={setFilter.bind(null, "SHOW_COMPLETED")} className="f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l">COMPLETED</span>
      </nav>
      <TodoList {...{ todos, toggleTodo }} />
    </section>
  )
}

Todos.propTypes = {
  // todos: PropTypes.array
}

export default connect(
  state => {
    return {
      todos: getVisibleTodos(getEntities("todos")(state).filter(t => t.listID == state.ui.selectedTodoList), state.ui.appliedFilter),
      selectedTodoList: state.ui.selectedTodoList
    }
  },
  dispatch => ({
    setFilter: (filter) => dispatch({ type: "SET_FILTER", filter }),
    addTodo: (text, listID) => dispatch(actions.submitEntity({ text, listID }, { type: 'todos' })),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, { type: 'todos' }))
  })
)(Todos)
