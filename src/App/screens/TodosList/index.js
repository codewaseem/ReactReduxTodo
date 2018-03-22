import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from 'App/stores/resources/actions'
import { getEntities } from 'App/stores/resources'

import AddTodoList from './components/AddTodoList'
import TodosList from './components/TodosList'

const TodosLists = ({ todosList, addTodoList, handleClick, router }) => {
  return (
    <section className='pa3 pa5-ns'>
      <AddTodoList onSubmit={({ name }, _, { reset }) => {
        console.log("list", name)
        addTodoList(name)
        reset()
      }} />

      <h1 className='f4 bold center mw6'>All Todos Lists</h1>

      <TodosList {...{
        todosList, handleClick: (id) => {
          router.push(`/${id}`)
          handleClick(id)
        }
      }} />
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
    addTodoList: (name) => dispatch(actions.submitEntity({ name }, { type: 'lists' })),
    handleClick: (listID) => {
      dispatch({ type: "SELECT_TODO_LIST", selectedTodoList: listID })
      dispatch(actions.fetchEntity({ listID }))
    }
  })
)(TodosLists)