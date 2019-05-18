import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faCogs,
  faHome,
  faChalkboardTeacher,
  faBookReader,
  faBrain,
  faBuilding,
  faCalendarWeek
} from '@fortawesome/free-solid-svg-icons';
import Login from './login/Login.jsx';
import Principal from './principal/Principal.jsx';
import Home from './home/Home.jsx';
import '../styles/app.css';

library.add(
  faUserCircle,
  faCogs,
  faHome,
  faChalkboardTeacher,
  faBookReader,
  faBrain,
  faBuilding,
  faCalendarWeek
);
class App extends Component {
  state = { username: null };

  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Principal} isLogged="false" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home/start" component={Home} />
          <Route exact path="/home/careers" component={Home} />
          <Route exact path="/home/subjects" component={Home} />
          <Route exact path="/home/teachers" component={Home} />
          <Route exact path="/home/classrooms" component={Home} />
          <Route exact path="/home/profile" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
