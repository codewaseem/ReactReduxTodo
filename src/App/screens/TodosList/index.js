import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getEntities } from 'App/stores/resources'

import AddTodoList from './components/AddTodoList'
import TodosList from './components/TodosList'

const TodosLists = ({ todosList, addTodoList, handleClick }) => {
  return (
    <section className='pa3 pa5-ns'>
      <AddTodoList onSubmit={({ todo }, _, { reset }) => {
        addTodoList(todoList)
        reset()
      }} />

      <h1 className='f4 bold center mw6'>All Todos Lists</h1>

      <TodosList {...{ todosList, toggleTodo }} />
    </section>
  )
}

TodosLists.propTypes = {
  todosList: PropTypes.array
}

export default connect(
  state => ({
    todosList: getEntities('lists')(state)
  }),
  dispatch => ({
    addTodoList: (text) => console.log("Adding todos"),
    handleClick: (todo, completed) => console.log("routing")
  })
)(TodosLists)