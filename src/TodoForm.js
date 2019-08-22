import React from 'react';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      completed: false,
      error: undefined
    }
    this.onChange = this.onChange.bind(this);
    this.submitTodo = this.submitTodo.bind(this);
  }
  onChange(e) {
    if(e.target.value.length < 4 && e.target.value.length > 0) {
      this.setState({
        error: 'Please add a todo of more than 4 letters'
      })
    } 
    else {
      this.setState({
        error: null
      })
    }
      this.setState({
        [e.target.name]: e.target.value
      })
  }
  submitTodo(e) {
    e.preventDefault();
    if(this.state.text.length > 4) {
      this.props.addTodo(this.state)
      this.setState({
        text: '',
        error: undefined
      })
    }
  }
  render() {
    return (
      <div>
        <form className="todo-form" onSubmit={this.submitTodo}>
          <input
            className="todo-form__input"
            name="text"
            value={this.state.text}
            onChange={this.onChange}
            placeholder="Add a new todo"
          />
          <button className="todo-form__btn"><i className="fas fa-plus"></i></button>
        </form>
        <div className="errMsg">{this.state.error && <p>{this.state.error}</p>}</div>
      </div>
    )
  }
}

export default TodoForm;