import React, {Component} from 'react'
import Todo from './Todo'

class Todos extends Component {
  render(){
    let todos = this.props.todos.map( (todo) => {
      return (
        <Todo
          key={todo._id}
          todo={todo}
          editingTodoId={this.props.editingTodoId}
          onEditTodo={this.props.onEditTodo}
          onDeleteTodo={this.props.onDeleteTodo}
          onUpdateTodo={this.props.onUpdateTodo}
        />
      )
    })
    return(
      <div className="todos">
        {todos}
      </div>
    )
  }
}

export default Todos
