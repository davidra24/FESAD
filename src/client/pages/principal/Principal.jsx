import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class Principal extends Component {
  state = {
    logged: this.props.isLogged
  };
  componentWillMount() {
    if (this.props.location.state) {
      this.setState({
        logged: this.props.location.state.logged,
        user: []
      });
    }
  }
  handleLogin() {
    this.setState({ logged: true });
  }
  render() {
    if (this.state.logged) {
      return (
        <Redirect
          to={{ pathname: '/home', state: { user: this.state.user } }}
        />
      );
    } else {
      return (
        <Redirect
          to={{ pathname: '/login', state: { logged: this.state.logged } }}
        />
      );
    }
  }
}

export default Principal;
