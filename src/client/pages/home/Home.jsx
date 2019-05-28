import React, { Component, Fragment } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Inicio from '../inicio/Inicio';
import Programa from '../programas/Programa';
import Asignaturas from '../asignaturas/Asignaturas';
import Docentes from '../docentes/Docentes';
import Salones from '../salones/Salones';
import PanelUsuario from '../panel-usuario/PanelUsuario';
import NotFound from '../../components/notFound/NotFound';

class Home extends Component {
  state = {
    toRender: '',
    loading: false,
    error: null
  };

  handleRender = () => {
    switch (this.props.location.pathname) {
      case '/home':
        return <Inicio />;
      case '/home/careers':
        return <Programa api="/api/programas" />;
      case '/home/subjects':
        return <Asignaturas api="/api/asignaturas" />;
      case '/home/teachers':
        return <Docentes api="/api/docentes" />;
      case '/home/classrooms':
        return <Salones api="/api/salones" />;
      case '/home/profile':
        return <PanelUsuario />;
      default:
        return <NotFound />;
    }
  };

  render() {
    const toRender = this.handleRender();
    return (
      <Navbar>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12">{toRender}</div>
          </div>
        </div>
      </Navbar>
    );
  }
}

export default Home;
