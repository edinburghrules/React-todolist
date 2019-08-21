import React from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import Search from './Search';
import uuid from 'uuid';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    const items = localStorage.getItem('todos')
    const todos = JSON.parse(items)
    this.state = {
      todos: todos ? todos : [],
      searchText: '',
      hideCompleted: false
    }
    this.deleteTodo = this.deleteTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.editedTodo = this.editedTodo.bind(this);
    this.setComplete = this.setComplete.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
    this.hideCompleted = this.hideCompleted.bind(this);
    this.markAll = this.markAll.bind(this);
  }
  addTodo(newTodo) {
    newTodo = {...newTodo, id: uuid()}
    this.setState(state => ({
      todos: state.todos.concat(newTodo)
    }))
    setTimeout(() => {
      localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }, 1000)
  }
  deleteTodo(id) {
    this.setState(state => ({
      todos: state.todos.filter(todo => (
        todo.id !== id
      ))
    }))
    setTimeout(() => {
      localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }, 1000)
  }
  editedTodo(edited) {
    this.setState(state => ({
      todos: state.todos.map(todo => {
        if(todo.id === edited.id) {
         return  {...todo, text: edited.text}
        } else {
          return todo
        }
      })
    }))
    setTimeout(() => {
      localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }, 1000)
  }
  setComplete(id) {
    this.setState(state => ({
      todos: state.todos.map(todo => {
        if(todo.id === id) {
          return {...todo, completed: !todo.completed};
        } else {
          return todo;
        }
      })
    }))
    setTimeout(() => {
      localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }, 1000)
  }
  setSearchText(e) {
    const searchTerm = e.target.value;
    this.setState({
      searchText: searchTerm
    })
  }
  filterTodos() {
    if(this.state.hideCompleted) {
      return this.state.todos.filter(todo => !todo.completed)
      .map(todo => (
        <Todo 
          key={todo.id}
          setComplete={this.setComplete} 
          editedTodo={this.editedTodo} 
          deleteTodo={this.deleteTodo} 
          todo={todo} 
        />
      ))
    } 
    else {
      const filteredTodos = this.state.todos.filter(todo => 
        todo.text.toLowerCase().includes(this.state.searchText.toLowerCase()))
          .map(todo => (
            <Todo
              key={todo.id}
              setComplete={this.setComplete} 
              editedTodo={this.editedTodo} 
              deleteTodo={this.deleteTodo} 
              todo={todo} 
            />
          )
        )
        return filteredTodos;
    } 
  }
  hideCompleted() {
    this.setState(state => ({
      hideCompleted: !state.hideCompleted
    }))
  }
  markAll() {
    this.setState(state => ({
      todos: state.todos.map(todo => {
        return {...todo, completed: true }
      })
    }))
  }
  render() {
    const incompleteTodos = () => {
      return this.state.todos.filter(todo => !todo.completed).length
    }
    const completeTodos = () => {
      return this.state.todos.filter(todo => todo.completed).length
    }
    return (
      <div className="container">
        <div>
          <TodoForm addTodo={this.addTodo} />
        </div>
        <div className="mark-all">
          <button className="mark-all__btn" onClick={this.markAll}>Mark all complete <i className="fas fa-check-double"></i></button>
        </div>
        <div className="line-break"></div>
        <div>
          <Search setSearchText={this.setSearchText} />
        </div>
        <div className="todos">
          {this.filterTodos()}
        </div>
        <div className="line-break"></div>
        <div className="footer">
          <p className="footer_info"><span>{incompleteTodos()}</span> todos left</p>
          <button disabled={completeTodos() === 0}  className="footer__btn" onClick={this.hideCompleted}>
            {this.state.hideCompleted ? 'show all' : 'hide completed'}
          </button>
        </div>
      </div>
    )
  }
}

export default TodoList;


