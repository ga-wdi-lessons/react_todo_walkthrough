import React, {Component} from 'react'
import TodoModel from '../models/Todo'
import Todos from '../components/Todos'
import CreateTodoForm from '../components/CreateTodoForm'

class TodosContainer extends Component {
  constructor(){
    super()
    this.state = {
      todos: []
    }
  }
  componentDidMount(){
    this.fetchData()
  }
  fetchData(){
    TodoModel.all().then( (res) => {
      this.setState ({
        todos: res.data.todo,
        todo: ''
      })
    })
  }
  createTodo(todo){
  let newTodo = {body: todo, completed: false}
  TodoModel.create(newTodo).then( (res) => {
    let todos = res.data
    this.setState({todos})
  })
}
deleteTodo(todo){
  TodoModel.delete(todo).then( (res)=>{
    let todos = res.data
    this.setState({todos})
  })
}
render(){
  return (
    <div className="todosComponent">
      <Todos
        todos={this.state.todos}
        onDeleteTodo={this.deleteTodo.bind(this)} />
      <CreateTodoForm
        createTodo={this.createTodo.bind(this)}
        />
    </div>
  )
}
}

export default TodosContainer
