import React, {Component} from 'react'
import Todo from './Todo'

class Todos extends Component {
  render(){
    let todos = this.props.todos.map( (todo) => {
      return (
        <Todo
          key={todo.id}
          todo={todo}
          onDeleteTodo={this.props.onDeleteTodo}/>
      )
    })
    return(
      <div className="todos">
      <ul>
        {todos}
      </ul>
      </div>
    )
  }
}

export default Todos
