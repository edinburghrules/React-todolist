import React from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import uuid from 'uuid';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    const items = localStorage.getItem('todos')
    const todos = JSON.parse(items)
    console.log(todos)
    this.state = {
      todos: todos
    }
    this.deleteTodo = this.deleteTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.editedTodo = this.editedTodo.bind(this);
    this.setComplete = this.setComplete.bind(this);
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
  }
  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <div>
          <TodoForm addTodo={this.addTodo} />
        </div>
        {
          this.state.todos.map((todo, index) => (
            <Todo 
              key={todo.id}
              setComplete={this.setComplete} 
              editedTodo={this.editedTodo} 
              deleteTodo={this.deleteTodo} 
              todo={todo} 
            />
          ))
        }
      </div>
    )
  }
}

export default TodoList;