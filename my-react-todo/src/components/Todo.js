import React, {Component} from 'react'
import TodoForm from '../components/TodoForm'

class Todo extends Component {
  render(){
      if (this.props.editingTodoId === this.props.todo._id){
        //if we see this console.log, we know that Todo-props are being
        // passed into TodosContainer, and being set as the
        // TodosContainer-state, and then trickling down as props to
        // the Todo component. 
        console.log(`${this.props.todo.body} is being edited`);
        return (
          <TodoForm
            autoFocus={true}
            onUpdateTodo={this.props.onUpdateTodo}
            buttonName="Update Todo!"/>
        )
      }
      return(
        <p data-todos-index={this.props.todo._id}>
          <span onClick={() => this.props.onEditTodo(this.props.todo)}>
            {this.props.todo.body}
          </span>
          <span
            className='deleteButton'
            onClick={ () => this.props.onDeleteTodo(this.props.todo) }>
              (X)
          </span>
        </p>
      )
    }
}

export default Todo
