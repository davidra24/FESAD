import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import {
  faUserCircle,
  faEdit,
  faCogs,
  faHome,
  faTrash,
  faChalkboardTeacher,
  faBookReader,
  faBrain,
  faBuilding,
  faCalendarWeek,
  faSave
} from '@fortawesome/free-solid-svg-icons';
import Login from './login/Login';
import Principal from './principal/Principal';
import Home from './home/Home';
import NotFound from './notFound/NotFound';
import '../styles/app.css';
import ProgramaAsignatura from './programa_asignatura/ProgramaAsignatura';

library.add(
  faUserCircle,
  faCogs,
  faHome,
  faChalkboardTeacher,
  faBookReader,
  faBrain,
  faEdit,
  faTrash,
  faBuilding,
  faCalendarWeek,
  faSave
);
class Index extends Component {
  state = { username: null };

  componentDidMount() {}

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Principal} isLogged="false" />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/careers" component={Home} />
        <Route exact path="/subjects" component={Home} />
        <Route exact path="/teachers" component={Home} />
        <Route exact path="/classrooms" component={Home} />
        <Route exact path="/profile" component={Home} />
        <Route exact path="/careers/:id" component={ProgramaAsignatura} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Index;
