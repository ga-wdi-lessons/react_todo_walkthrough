import axios from 'axios'

class TodoModel {
  static all(){
    let request = axios.get(`https://super-crud.herokuapp.com/todos`)
    console.log("request is ", request);
    return request
  }
}

export default TodoModel
