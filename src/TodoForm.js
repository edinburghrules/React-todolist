import React from 'react';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      completed: false
    }
    this.onChange = this.onChange.bind(this);
    this.submitTodo = this.submitTodo.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  submitTodo(e) {
    e.preventDefault();
    this.props.addTodo(this.state)
    this.setState({
      text: ''
    })
  }
  render() {
    return (
        <form className="todo-form" onSubmit={this.submitTodo}>
          <label className="todo-form__lbl" htmlFor="text">Text:</label>
          <input
            className="todo-form__input"
            name="text"
            value={this.state.text}
            onChange={this.onChange}
          />
          <button className="todo-form__btn">add todo</button>
        </form>
    )
  }
}

export default TodoForm;