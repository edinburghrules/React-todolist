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
      hideCompleted: false,
      allCompleted: false
    }
    this.deleteTodo = this.deleteTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.editedTodo = this.editedTodo.bind(this);
    this.setComplete = this.setComplete.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
    this.hideCompleted = this.hideCompleted.bind(this);
    this.markAllComplete = this.markAllComplete.bind(this);
    this.deleteCompleted = this.deleteCompleted.bind(this);
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
  markAllComplete() {
    if (!this.state.allCompleted) {
      this.setState(state => ({
        allCompleted: !state.allCompleted,
        todos: state.todos.map(todo => {
          return {...todo, completed: true }
        })
      }))
      setTimeout(() => {
        localStorage.setItem('todos', JSON.stringify(this.state.todos))
      }, 1000)
    } else {
      this.setState(state => ({
        allCompleted: !state.allCompleted,
        todos: state.todos.map(todo => {
          return {...todo, completed: false }
        })
      }))
      setTimeout(() => {
        localStorage.setItem('todos', JSON.stringify(this.state.todos))
      }, 1000)
    }
  }
  deleteCompleted() {
    this.setState(state => ({
      allCompleted: false,
      todos: state.todos.filter(todo => {
        return !todo.completed
      })
    }))
    setTimeout(() => {
      localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }, 1000)
  }
  render() {
    const incompleteTodos = () => {
      return this.state.todos.filter(todo => !todo.completed).length
    }
    const completeTodos = () => {
      return this.state.todos.filter(todo => todo.completed).length
    }
    const renderMarkAllBtns = () => {
      if(this.state.allCompleted) {
        return (
          <button 
            disabled={this.state.todos.length < 1}
            className="mark-all__btn mark-all__btn--incomplete" 
            onClick={this.markAllComplete}>
            <i className="fas fa-exclamation"></i>
            Mark all incomplete
          </button>
        )
      } else {
        return (
          <button 
            disabled={this.state.todos.length < 1}
            className="mark-all__btn mark-all__btn--complete" 
            onClick={this.markAllComplete}>
            <i className="fas fa-check-double"></i>
            Mark all complete 
          </button>
        )
      }
    }
    return (
      <div className="container">
        <div>
          <TodoForm addTodo={this.addTodo} />
        </div>
        <div className="mark-all">
          {renderMarkAllBtns()}
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
          <p className="footer__info"><span>{incompleteTodos()}</span> todos left</p>
          <div className="footer__btns">
            <button disabled={completeTodos() === 0}  className="footer__btn" onClick={this.hideCompleted}>
              {this.state.hideCompleted ? 'show all' : 'hide completed'}
            </button>
            <button
              disabled={completeTodos() === 0}
              className="footer__btn footer__btn--delete-all" 
              onClick={this.deleteCompleted}>
              Delete all completed
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default TodoList;


