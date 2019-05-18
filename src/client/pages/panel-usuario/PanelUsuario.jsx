import React, { Component, Fragment } from 'react';

class PanelUsuario extends Component {
  state = {
    message: 'Hola desde el panel de usuario'
  };
  render() {
    return (
      <Fragment>
        <h1>{this.state.message}</h1>
      </Fragment>
    );
  }
}

export default PanelUsuario;
