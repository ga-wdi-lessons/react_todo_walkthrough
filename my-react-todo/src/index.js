import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import routes from './config/routes.js'
import App from './App'

ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  document.getElementById('root')
);
