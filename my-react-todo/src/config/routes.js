import React from 'react'
import App from '../App'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import TodosContainer from '../containers/TodosContainer'

module.exports = (
  <Router>
    <Route path='/todos' component={TodosContainer}/>
  </Router>
);
