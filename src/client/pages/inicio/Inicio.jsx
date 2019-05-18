import React, { Component, Fragment } from 'react';

class Inicio extends Component {
  state = {
    message: 'Hola desde inicio'
  };
  render() {
    return (
      <Fragment>
        <h1>{this.state.message}</h1>
      </Fragment>
    );
  }
}

export default Inicio;
