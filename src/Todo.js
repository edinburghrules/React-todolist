import React from 'react';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isEditing: false, text: this.props.todo.text, id: this.props.todo.id}
    this.isEditing = this.isEditing.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
    this.isComplete = this.isComplete.bind(this);
  }
  isEditing() {
    this.setState(state => ({
      isEditing: !state.isEditing
    }))
  }
  editTodo(e) {
    this.setState({
      text: e.target.value
    })
  }
  saveTodo(e) {
    e.preventDefault();
    this.props.editedTodo({id: this.state.id, text: this.state.text })
    this.setState({
      isEditing: false
    })
  }
  isComplete() {
    this.props.setComplete(this.state.id)
  }

  render() {
    const {text, completed, id} = this.props.todo;
    return (
      <div>
      {!this.state.isEditing && 
        <div>
          <p className={completed ? 'completed' : 'incomplete'} onClick={this.isComplete}>{text}</p>
          <button onClick={() => this.props.deleteTodo(id)}>x</button>
          <button onClick={this.isEditing}>edit</button>
          </div>
      }
      {this.state.isEditing &&
        <div>
          <form onSubmit={this.saveTodo}>
            <input
              value={this.state.text}
              onChange={this.editTodo}
            />
            <button>save</button>
          </form>
        </div>
      }
      </div>
    )
  }
}

export default Todo;