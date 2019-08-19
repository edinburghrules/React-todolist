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
      <div>
        <form onSubmit={this.submitTodo}>
          <label htmlFor="text">Text:</label>
          <input 
            name="text"
            value={this.state.text}
            onChange={this.onChange}
          />
          <button>add todo</button>
        </form>
      </div>
    )
  }
}

export default TodoForm;