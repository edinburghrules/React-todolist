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
        <div className="todo">
          <p id="todo-text"className={completed ? 'completed' : 'incomplete'} onClick={this.isComplete}>{text}</p>
          <div className="todo__btns">
            <button className="todo__btn todo__btn--edit" onClick={this.isEditing}>
            <i className="fas fa-edit"></i>
            </button>
            <button className="todo__btn todo__btn--delete" onClick={() => this.props.deleteTodo(id)}>
              <i className="fas fa-times"></i>
            </button>
          </div>  
        </div>
      }
      {this.state.isEditing &&
        <div className="editing-todo">
          <form className="editing-todo__form" onSubmit={this.saveTodo}>
            <input autoFocus className="editing-todo__form__input"
              value={this.state.text}
              onChange={this.editTodo}
            />
            <button className="editing-todo__form__btn"><i className="fas fa-check tick"></i></button>
          </form>
        </div>
      }
      </div>
    )
  }
}

export default Todo;