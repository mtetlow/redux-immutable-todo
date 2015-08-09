import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/TodoActions';

class TodoApp extends Component {
  render() {
    const { todos, actions } = this.props;

    return (
      <div>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
      </div>
    );
  }
}

function select(state) {
  return {
    todos: state.todos
  };
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {...state};
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {actions:bindActionCreators(TodoActions,dispatch)};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp);