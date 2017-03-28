import React, {Component} from 'react'

class Todo extends Component {
  render(){
    return(
      <p data-todos-index={this.props.todo.id}>
        <li>{this.props.todo.body}</li>
      </p>
    )
  }
}

export default Todo
