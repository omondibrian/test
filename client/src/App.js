import React from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.css'

import Modules from './page/modules';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Events from './page/events';
import Users from './page/users';
import Posts from './page/posts';

import LoginForm from './components/loginForm';
import RegistrationForm from './components/RegistrationForm';
import AddPosts from './components/addPosts';
import AddEvents from './components/addEventsForm';
import Verify from './components/verify';
function App() {
  return (
    <Router >
     
      <Route exact path ='/' component={LoginForm} />
      <Route path ='/modules' component={Modules} />
      <Route path = '/events' component={ Events } />
      <Route path = '/users' component={ Users } />
      <Route path = '/posts' component={ Posts } />
      <Route path = '/login' component={ LoginForm } />
      <Route path = '/register' component={ RegistrationForm } />
      <Route path = '/create' component={ AddPosts } />
      <Route path = '/newEvent' component={ AddEvents } />
      <Route path = '/verify' component={ Verify } />
    </Router>
  );
}

export default App;
