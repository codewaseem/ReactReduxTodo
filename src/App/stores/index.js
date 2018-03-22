import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import todos from './todos'
import lists from './lists'

const uiReducer = (state = {
  appliedFilter: 'SHOW_ALL',
  selectedTodoList: ''
}, action) => {
  switch (action.type) {
    case "SET_FILTER": return { ...state, appliedFilter: action.filter }
    case "SELECT_TODO_LIST": return { ...state, selectedTodoList: action.selectedTodoList };
    default: return state;
  }
}

export default combineReducers({
  todos,
  ui: uiReducer,
  lists,
  form: formReducer
})
