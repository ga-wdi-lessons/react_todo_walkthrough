<!-- Es6ify -->
<!--   replace .bind(this) -->

<!-- Edit Update -->
<!-- Component Reusability -->
<!-- Refactor res.data stuff for update and delete -->
<!-- Add completed todos route: reuse existing components -->
# React Todo

## Learning Objectives
- Build a todo app in React that persists with a backend
- Use React Router to deep link
- Use axios promise library to retrieve data from a back end
- Pass state from parent components to children as props
- Pass state from children components to their parents as arguments to functions

## Framing
For today, we'll be creating a Todo app in React. Before we start coding it. We're going to take a look at some "high level" paradigms and principles of React. Following that, we'll do a code review of a simple todo application. Then, we'll build the application.

We've learned a tremendous amount about object oriented structures for web development. And they were great. With angular, we dabbled a bit with feature based separation of concerns. React takes that separation and doubles down on it.

## You do - Checkout React Todo (60m)
Before we can checkout the react todo app, we need to grab up our backend that will serve up our todos:

```bash
$ git clone git@github.com:ga-wdi-exercises/react-todo-api.git
$ cd react-todo-api
$ rake db:create
$ rake db:migrate
$ rake db:seed
$ rails s -p 4000
```

> This api needs to be served on port 4000 because when we run our react application it defaults to port 3000.

Now lets grab the react todo app:

```bash
$ git clone git@github.com:ga-wdi-exercises/react-todo.git
$ npm install
$ npm start
```

Now go to `http://localhost:3000` and play with the site!

After we've played with the site for a bit, take a look at the code base. Start at `src/index.js`. In that file, we can see that it uses another file `config/routes.js`. Don't worry too much about understanding all the specific syntax just get a good overview of the code base.

### Deliverables -
As you progress from one file to another and scan through the code base, write down in-line comments of what you think that particular piece of code is doing. You don't have to write a comment for every line, but at least one for each function/method

Some things you should consider/do during code review:

- how is the application CRUD'ing the data?
- what is the applications point of entry?
- are any components reused? which one/ones?
- how is state being passed from parent components to their children?
- how is state being passed from child component to it parents?(*this is tough!*)
- change things up play with it, put a `console.log()` if your not sure what something is or when it's executing.

> while changing the app, if the code breaks, just do a `$ git checkout -- .` to get back to the original code base

## React Todo
Alright it's time to build! We're going to be building this application from scratch! It won't be exactly like the repo above, but it'll be pretty close and follow much of the same structure.

> If you get behind, all code written today will be in the lesson plan. Additionally the repo you code reviews contains most of the same code. We can also catch people up during breaks/lunch. So please keep questions pertinent to content rather then debugging specific errors you may be getting. Should also note that some of the code snippets will be repetitions to reiterate points of learning. Some of them might just be updates to existing files. Some of them might be brand new content you have to add all of.

### Getting Started

Let's first create the react app.

```bash
$ create-react-app react-todo
$ cd react-todo
$ npm start
```

Great if we navigate to [`localhost:3000`](http://localhost:3000). We'll see the generic react application.seless stuff

### First Step - Hello World

#### Get rid of things we won't use

Let's remove the following files from the `src` folder:

```bash
$ rm src/App.css
$ rm src/App.test.js
$ rm src/logo.svg
```

> you could also remove the favicon, just make sure you remove the reference to it from `index.html` as well

Then replace the return block inside `src/App.js` with a header of Hello World. The whole file should look like this:

```js
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello World</h1>
      </div>
    );
  }
}

export default App;
```

> Hooray for automatic rerendering on save! If we just switch over to our browser we'll automatically see our updates.

### React Router
We're going to use React Router today to introduce it as a concept. However, it isn't strictly necessary for this application. We're really just going for exposure here. There's a lot to learn about react router and we'll just be scratching the surface. If you want to dive deeper, checkout [this tutorial](https://github.com/reactjs/react-router-tutorial)

We need React Router in the same way that we needed angular routers. We need a way to link to various url states in our application. Because our application will be a spa, we still want to preserve different states via the url. This application's states (not to be confused with component state) will just be the root url and a url to all todos(`/` and `/todos`)

### Creating Routes
It's great, Routes are just react Components as well! Let's start by installing the `react-router` dependency, making a `config` folder and a `routes.js` file that will contain our routes:

```bash
$ npm install react-router --save
$ mkdir src/config
$ touch src/config/routes.js
```

Let's fill in the contents our `routes.js` file:

```js
import React from 'react'
import {Route} from 'react-router'
import App from '../App'

module.exports = (
  <Route path='/' component={App}/>
)
```

All we've done here is added some dependencies as well as added our App component to this file. Then we used the `Route` component, given to us by `react-router` to create a route for the root path(`'/'`). We also establish that the component that should be rendered here is the App component we defined earlier.

> Something that's weird is that we imported `React` from `'react'` but then we imported `{Route}` from `'react-router'`. What's with the curly braces? In the latter case we're actually only importing a specific module of the `react-router` and name spacing it within `Route` If we had omitted the curly's it would have grabbed all of `react-router` functionality. Check out the [react router source code](https://github.com/reactjs/react-router/tree/master/modules) and we can clearly see the Route is a module within react-router

Great, we've defined out routes, but it's not going to do anything because nothing knows about this file yet. Let's update our `index.js` to use a Router now instead of just rendering the `App` Component. In `index.js`:


```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Router, browserHistory} from 'react-router'
import routes from './config/routes.js'

ReactDOM.render(
  <Router routes={routes} history={browserHistory}/>,
  document.getElementById('root')
);
```

In this file, we're using the `Router` component to specify what react should render. We pass in some properties to this `Router` component: `routes`, the file we just defined prior, and `browserHistory`. We've already gone over `routes.js` but not `browserHistory`. In a nutshell, a history knows how to listen to the browser's address bar for changes and parses the URL into a location object that the router can use to match routes and render the correct set of components.

Great, we should now be able to see hello world show up!

### A Simple Component
Before we add another route, let's change the header to be more applicable and make it, it's own component.

In `src/App.js`:

```js
import React, { Component } from 'react';
import Header from './components/Header.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
```

This will immediately error our code base out, why? (ST-WG)

That's right, we don't actually have that folder let alone the file within it. Let's create those things and define our component within it.

```bash
$ mkdir src/components
$ touch src/components/Header.js
```

In `src/components/Header.js`:

```js
import React, {Component} from 'react'
import {Link} from 'react-router'

class Header extends Component{
  render(){
    return (
      <header>
        <h1><Link to={'/todos'}>React Todos</Link></h1>
      </header>
    )
  }
}

export default Header
```

In this file, we've grabbed some dependencies and stored them in variables and then defined a component. The `Link` component is exactly what you think it is, a link to another route. You can think of it as `data-ui-sref` in angular or even an `href` in plain 'ol HTML

Awesome! We now have a header showing up! Let's click on the link.

```
Warning: [react-router] Location "/todos" did not match any routes
```

This warning makes sense, our `config/routes.js` only has a reference to `'/'` and nothing else. Let's fix that by adding the first parts of our apps main functionality. But before that... let's talk about containers.

### Containers
As we first start to write this container, its going to seem like just another component. Remember that  React components should be FIRST: focused, independent, reusable, small, and testable. In order to help keep components slim, a good practice is to move as much of the business logic surrounding a component's state to a container component. We're going to put all that logic in this container. It will start out very similarly to our `Header` component, but end up much more complex.

Let's start by creating a containers folder and then the container file:

```bash
$ mkdir src/containers
$ touch src/containers/TodosContainer.js
```

In `src/containers/TodosContainer.js`:

```js
import React, {Component} from 'react'

class TodosContainer extends Component {
  render(){
    return (
      <div className='todosContainer'>
        <h2>This is the todos container</h2>
      </div>
    )
  }
}

export default TodosContainer
```

Then we just have to update the routes in `src/config/routes.js`:

```js
//...
import TodosContainer from '../containers/TodosContainer'

module.exports = (
  <Route path='/' component={App}>
    <Route path='/todos' component={TodosContainer}/>
  </Route>
)
```

If we click on it we should totally see ..... nothing still. But no error now! Because our `/todos` is nested within our `'/'` route, our `App` Component needs to know what to render. We do this by adding one line of code to our `src/App.js`:

```js
render() {
  return (
    <div className="App">
      <Header />
      {this.props.children}
    </div>
  );
}
```

Great everything works!

### PAUSE!

Everything up to this point, is most of what you need to know about using react for a website NOT using a back end. Just add css through index.css and you're good to go!

### Fetching Data

React actually isn't as full featured as say AngularJS or BackboneJS. It relies on third party libraries to fetch data. Today, we'll be using a library called [Axios](https://github.com/mzabriskie/axios), a promise based HTTP client for the browser and node. Let's install the module now and also create the folder/file that will contain our database logic:

```bash
$ npm install axios --save
$ mkdir src/models
$ touch src/models/Todo.js
```

Now in `src/models/Todo.js`:

```js
import axios from 'axios'

class TodoModel(){
  static all(){
    let request = axios.get("http://localhost:4000/todos")
    return request
  }
}

export default TodoModel
```

The Axios API is awesome! It's pretty intuitive! When we use the `all` method on our `TodoModel`, it will make a get request to our API for all todos. We return the request so that we can chain promises to it.

Note also that `all()` is a static method. What does this mean? A static method can be called without there being an **instance** of the class containing the static method. This will allow us to call `all()` in the following way (without ***instantiating*** the class with new):

```js
let todos = TodoModel.all()
```

Does this type syntax look familiar at `.all`? If not, think back to Rails, where in a Todo app, we call the **class method** `.all`:

```rb
@todos = Todo.all
```

**Class methods** don't require an instance of the class in order to be called, but an **instance method** does. [More on Static Methods in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Static_methods)

We can't really test out the code in this file in isolation, so we must `import` it into our application in order to test it. The logical place to import this code is in the `TodosContainer` component.

For now, let's toss this in the `TodosContainer`'s `render()` method: this isn't ultimately going to be where we want to call `TodoModel.all()`, but for testing purposes, it will suffice.

In `components/TodosContainer.js`:
```js
import React, {Component} from 'react'
import TodoModel from '../models/Todo'

class TodosContainer extends Component {
  render(){
    TodoModel.all().then( (res) => {
      console.log(res);
    })
    return (
      <div className='todosContainer'>
        <h2>This is a todos container</h2>
      </div>
    )
  }
}

export default TodosContainer
```

Awesome, we can see the response from our database as soon as the page loads, we know it's working! However, its completely in the wrong spot and we don't have anything we're passing todos to... yet!

Now that we can get our data, let's code how we present that data. It'll be a bit before we connect these pieces and actually see our todos in our app, but just hold on we'll get there!

### Rendering A Todo
Let's start at the bottom and bubble up. It'll be nice if each todo we're its own component. To follow FIRST(Focused Independent Reusable Small Testable). Let's create `src/components/Todo.js` and put the following in it:

```js
import React, {Component} from 'react'

class Todo extends Component {
  render(){
    return(
      <p data-todos-index={this.props.todo.id}>
        <span>{this.props.todo.body}</span>
      </p>
    )
  }
}

export default Todo
```

When we write this component we know that if we pass it a `todo`, as a `prop`, that has both an id and a body, that it will render. AND it will render the same way every time. So what will be rendering each individual `Todo` component?

### Rendering Todos
We need another component. Its responsibility will be to render all of the todos. Let's create another component `src/components/Todos.js` and fill it with the following:

```js
import React, {Component} from 'react'
import Todo from './Todo'

class Todos extends Component {
  render(){
    let todos = this.props.todos.map( (todo) => {
      return (
        <Todo
          key={todo.id}
          todo={todo}/>
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
```

In this component, we have a property called todos. When we eventually use this component, we need to pass it that property. Once we have our todos, it takes each one and maps a `Todo` component to the variable `todos`. Then renders all of the todos. We can use the map function to render multiple components for each individual todo and store them in a variable. We just need to make sure we bind `this` in case we need to access properties from the `Todos` component later.

### Putting it all together, at last! Todos

Let's shove the remaining code we need in and then let's talk about it. In `src/containers/TodosContainer.js`:

```js
import React, {Component} from 'react'
import TodoModel from '../models/Todo'
import Todos from '../components/Todos'

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
        todos: res.data,
        todo: ''
      })
    })
  }
  render(){
    return (
      <div className="todosComponent">
      bob
        <Todos
          todos={this.state.todos} />
      </div>
    )
  }
}

export default TodosContainer
```

If we take a look at our browser now... BAM todos! What just happened....

```js
constructor(){
  super()
  this.state = {
    todos: []
  }
}
```

This is just like initialize in ruby(only a bit different). `constructor()` is basically a function that invokes when an instance of our class gets initialized. When we call `super()` were basically saying invoke the same `constructor` function that the React library defines for their `constructor`. In addition to that initialize a state for this component in which todos is a property and set its value as an empty array. We can then set the state any other time in our application using `.setState()`.

```js
fetchData(){
  TodoModel.all().then( (res) => {
    this.setState ({
      todos: res.data,
      todo: ''
    })
  })
}
```

This function leverages our model to retrieve our todos from our backend. In the promise of that request we set the state of this container component to have todos be the value returned from the response. Any time `setState` is invoked the component re-renders.

```js
componentDidMount(){
  this.fetchData()
}
```

### Hooks
Every component in react undergoes a component lifecycle. There are several "hooks" throughout this lifecycle. You can think of hooks like events that we can trigger functionality on. `componentDidMount` is a reserved hook that happens after a component renders. There are many hooks, this is a [great blog post](http://busypeoples.github.io/post/react-component-lifecycle/) that goes into much better detail of the lifecycle of a component.


You might be asking yourself: "Wait, why are we getting the data after the components already been rendered?" ([I did too](http://stackoverflow.com/questions/39338464/reactjs-why-is-the-convention-to-fetch-data-on-componentdidmount))

That's because a re-render will always happen because fetching data happens asynchronously. Here's the [Facebook recommendation](https://facebook.github.io/react/tips/initial-ajax.html)

### Passing State from parents to children
How have we passed state? What do we mean by state with reference to a react component? The state of the `TodosContainer` is simple, the todos. How does each individual todo know about the todo they need to render? From the state of the most parent container, `TodosContainer`

If we take a look at the `props` being passed from one component to the next, we can clearly see the chain of how information was passed.

In `src/containers/TodosContainer.js`:

```js
<Todos
  todos={this.state.todos} />
```

In `src/components/Todos.js`:
```js
  let todos = this.props.todos.map( (todo) => {
  return (
    <Todo
      key={todo.id}
      todo={todo}
    />
  )
})
```

In `src/components/Todo.js`:

```js
<p data-todos-index={this.props.todo.id}>
  <span>{this.props.todo.body}</span>
</p>
```

### PAUSE - Why is this awesome?
We could stop the lesson here and take this knowledge and build lots of cool things with it. Most of the API's developers have access to are read only. That said, if we know an endpoint to get data, we now know how to use react to display that data.

### Creating Todos
We're going to want to create a component that handles the form for creating todos. Before we build this feature out, How can we pass state from a child component to a parent? The opposite is easy, because we're able to just pass properties to our child components. Child state to parent state is much more difficult because we can't pass properties like that. Its unidirectional. The answer? Callbacks.

Lets write this feature to shed some more light on it.

Let's create a file `src/components/CreateTodoForm.js` and fill it out with the following:

```js
import React, {Component} from 'react'

class CreateTodoForm extends Component {
  constructor(){
    super()
    //sets the initial state via the constructor! that's the constructor's job :)
    this.state = {
      todo: ''
    }
  }
  onInputChange(event){
    this.setState({
      todo: event.target.value
    })
  }
  onFormSubmit(event){
    event.preventDefault()
    let todo = this.state.todo
    this.props.createTodo(todo)
    this.setState({
      todo: ""
    })
  }
  render(){
    return (
      <div className='createForm todoForm'>
        <h2>Create Todo Here!</h2>
        <form onSubmit={event => this.onFormSubmit(event)}>
          <input
            onChange={event => this.onInputChange(event)}
            placeholder='Write a todo here ...'
            type='text'
            value={this.state.todo} />
          <button type='submit'>Create Todo!</button>
        </form>
      </div>
    )
  }
}

export default CreateTodoForm
```

Whoa.. pauuuuseee. Let's take a look. First let's look at what we're rendering:

```js
render(){
  return (
    <div className='createForm todoForm'>
      <h2>Create Todo Here!</h2>
      <form onSubmit={event => this.onFormSubmit(event)}>
        <input
          onChange={event => this.onInputChange(event)}
          placeholder='Write a todo here ...'
          type='text'
          value={this.state.todo} />
        <button type='submit'>Create Todo!</button>
      </form>
    </div>
  )
}
```

We define the initial state of the form in the constructor.

Looks like a form. When it gets submitted we run a function (we're using es6 arrow function here to pass an anonymous function with an event argument). That function is the `.onFormSubmit` function defined in this component.

> `onSubmit` is reserved JSX to define an event for form submission, almost identical to `ng-submit` in angular

Similarly when the `input` is changed we run `.onInputChange`.


Let's take a look at the `onInputChange` function first:

```js
onInputChange(event){
  this.setState({
    todo: event.target.value
  })
}
```

Basically whenever this input changes, we're going to set the state of this component to have a property of `todo` and it's value is whatever the input field's value is.

`onFormSubmit`:

```js
onFormSubmit(event){
  event.preventDefault()
  let todo = this.state.todo
  this.props.createTodo(todo)
  this.setState({
    todo: ""
  })
}
```

First off, prevent the default action as form submission will cause a request to fire. Then instantiate a variable todo from the state. Lastly we also set the todo property of the state as an empty string. We skipped one line though, `this.props.createTodo(todo)` What does that tell us about where `createTodo` comes from?

It needs to be supplied from its parent component. Let's update the `src/containers/TodosContainer.js` so that we can successfully create todos:

```js
// At the top import the component
import CreateTodoForm from '../components/CreateTodoForm'

// adding rest of code to container, more code above
createTodo(todo){
  let newTodo = {body: todo, completed: false}
  TodoModel.create(newTodo).then( (res) => {
    let todos = res.data
    this.setState({todos})
  })
}
render(){
  return (
    <div className="todosComponent">
      <Todos
        todos={this.state.todos} />
      <CreateTodoForm
        createTodo={this.createTodo.bind(this)}
        />
    </div>
  )
}
```

We see that we pass the `createTodo` function of THIS container component TO the `CreateTodoForm` component. We have to `bind(this)` so that `this` is bound to the container component.

In the actual `createTodo` function. We can see that we construct everything we need about a todo in an object and store it in a variable. We then pass that object to a `.create` method on our `TodoModel` that ... hasn't been defined yet. Let's define it now. In `src/models/Todo.js`:

```js
static create(todo) {
  let request = axios.post("http://localhost:4000/todos", todo)
  return request
}
```

Using axios we create the todo. In the promise, we fetch all the todos from the state and push the response to that array, and reset the state.

## Backtrack - How did we pass state from child to parent?

Remember that in the submit event of the form, we used a function `this.props.createTodo()`:

In `src/components/CreateTodoForm`:

```js
onSubmit(event){
  event.preventDefault()
  let todo = this.state.todo
  this.props.createTodo(todo)
  this.setState({
    todo: ""
  })
}
```

We pass `createTodo` from the container as `props`. In `src/containers/TodosContainer.js`:

```js
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
```

The argument passed in at the `CreateTodoForm` level(child) was state from that component. And now it updates state at the `TodosContainer` level(parent)

## Deleting Todos
Deleting will work similarly with regard to passing state. Let's update the `Todo` component to contain a UI with which to delete a todo. In `src/components/Todo.js`:

```js
class Todo extends Component {
  render(){
    return(
      <p data-todos-index={this.props.todo.id}>
        <span>{this.props.todo.body}</span> | <span className='deleteButton' onClick={() => this.props.onDeleteTodo(this.props.todo)}>X</span>
      </p>
    )
  }
}
```

We've added a span with an `X` in it. When it gets clicked it invokes the `onDeleteTodo` function defined on `props`. That means we need to pass `.onDeleteTodo` as `props` from the parent component of `Todos`. In `src/components/Todos.js`

```js
let todos = this.props.todos.map( (todo) => {
  return (
    <Todo
      key={todo.id}
      todo={todo}
      onDeleteTodo={this.props.onDeleteTodo}/>
  )
})
```

Looks like it's not defined here either but passed yet again from a parent container. Finally in the `src/components/TodosContainer.js`:

```js
deleteTodo(todo){
  TodoModel.delete(todo).then( (res)=>{
    let todos = this.state.todos
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
```

Before we talk about the above code, lets look at what delete looks like in our `TodoModel`. In `src/models/Todo.js`:

```js
static delete(todo){
  let request = axios.delete(`http://localhost:4000/todos/${todo.id}`)
  return request
}
```

The `deleteTodo` takes the todo, passed from the child Component of `Todo` up through a chain of references. It deletes it with axios. Upon deletion, all todos are grabbed from the container state and filters out the one deleted, updates the state to have only the remaining todos.

## Editing Todos and Updating Completion Status
> if time allows students will talk through the solution
