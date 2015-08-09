import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import PureComponent from 'react-pure-render/component';

class TodoItem extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  }

  render() {
    const {todo, markTodo, deleteTodo} = this.props;
    console.log('rendering: ',todo.get('text'));
    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.get('text')}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.get('id'), text)} />
      );
    } else {
      element = (
        <div className='view'>
          <input className='toggle'
                 type='checkbox'
                 checked={todo.get('marked')}
                 onChange={() => markTodo(todo.get('id'))} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.get('text')}
          </label>
          <button className='destroy'
                  onClick={() => deleteTodo(todo.get('id'))} />
        </div>
      );
    }

    return (
      <li className={classnames({
        completed: todo.get('marked'),
        editing: this.state.editing
      })}>
        {element}
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  markTodo: PropTypes.func.isRequired
};

export default TodoItem;
