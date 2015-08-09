import Immutable from 'immutable';
import { ADD_TODO, DELETE_TODO, EDIT_TODO, MARK_TODO, MARK_ALL, CLEAR_MARKED } from '../constants/ActionTypes';

const initialStateJS = [{
  text: 'Use Redux',
  marked: false,
  id: 0
}];
const initialState = Immutable.fromJS(initialStateJS);

export default function todos(state = initialState, action) {
  switch (action.type) {
  case ADD_TODO:
    return state.unshift(Immutable.fromJS({
      id: (state.size === 0) ? 0 : state.first().get('id') + 1,
      marked: false,
      text: action.text
    }));

  case DELETE_TODO:
    return state.filter(todo =>
      todo.get('id') !== action.get('id')
    );

  case EDIT_TODO:
    return state.map(todo =>
      todo.get('id') === action.get('id') ?
        Object.assign({}, todo, { text: action.text }) :
        todo
    );

  case MARK_TODO:
    const updateIndex = state.findIndex(todo => todo.get('id') === action.id);
    const updateObj = state.get(updateIndex);
    const updatedObj = updateObj.set('marked',!updateObj.get('marked'));
    return state.set(updateIndex,updatedObj);

  case MARK_ALL:
    const areAllMarked = state.every(todo => todo.get('marked'));
    return state.map(todo => todo.set('marked',!areAllMarked));

  case CLEAR_MARKED:
    return state.filter(todo => todo.get('marked') === false);

  default:
    return state;
  }
}
