import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Header from './components/Header'
import TodosContainer from './containers/TodosContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
      <h1>Hello, and welcome! I am a heading tag in App.js! Have a great day!</h1>
        <Router>
          <Route exact path='/todos' component={TodosContainer}/>
        </Router>
      </div>
    );
  }
}

export default App;
