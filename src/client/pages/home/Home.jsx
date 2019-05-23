import React, { Component, Fragment } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Loading from '../../components/loading/Loading';
import Inicio from '../inicio/Inicio';
import PanelUsuario from '../panel-usuario/PanelUsuario';
import Programa from '../programas/Programa';
import NotFound from '../../components/notFound/NotFound';

class Home extends Component {
  state = {
    toRender: '',
    loading: false,
    error: null
  };

  handleRender = () => {
    switch (this.props.location.pathname) {
      case '/home/start':
        return <Inicio />;
      case '/home/careers':
        return <Programa />;
      case '/home/profile':
        return <PanelUsuario />;
      default:
        return <NotFound />;
    }
  };

  render() {
    return (
      <Navbar>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12">{this.handleRender()}</div>
          </div>
        </div>
      </Navbar>
    );
  }
}

export default Home;
