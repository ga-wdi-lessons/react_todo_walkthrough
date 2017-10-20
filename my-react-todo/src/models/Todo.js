import axios from 'axios'

class TodoModel {
    static all() {
        let request = axios.get("https://super-crud.herokuapp.com/todos")
        return request
    }
    static create(todo) {
        let request = axios.post("https://super-crud.herokuapp.com/todos", todo)
        return request
    }
    static delete(todo) {
        let request = axios.delete(`https://super-crud.herokuapp.com/todos/${todo._id}`)
        return request
    }
    static update(todoId, todoBody) {
        let request = axios.put(`https://super-crud.herokuapp.com/todos/${todoId}`, {
            body: todoBody
        })
        return request
    }
}

export default TodoModel
