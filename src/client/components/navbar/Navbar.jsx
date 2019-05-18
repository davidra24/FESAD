import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <Fragment>
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          style={{ backgroundColor: '#247BB0' }}
        >
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo-uptc" className="reduce" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active ">
                <div className="justify-content-center text-center">
                  <Link className="nav-link" to="/home/start">
                    <FontAwesomeIcon icon="home" size="3x" />
                    <h3>Inicio</h3>
                    <span className="sr-only">(current)</span>
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="justify-content-center text-center">
                  <Link className="nav-link" to="/home/careers">
                    <FontAwesomeIcon icon="brain" size="3x" />
                    <h3>Programas</h3>
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="justify-content-center text-center">
                  <Link className="nav-link" to="/home/subjects">
                    <FontAwesomeIcon icon="book-reader" size="3x" />
                    <h3>Asignaturas</h3>
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="justify-content-center text-center">
                  <Link className="nav-link" to="/home/teachers">
                    <FontAwesomeIcon icon="chalkboard-teacher" size="3x" />
                    <h3>Docentes</h3>
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="justify-content-center text-center">
                  <Link className="nav-link" to="/home/classrooms">
                    <FontAwesomeIcon icon="building" size="3x" />
                    <h3>Salones</h3>
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <div className="justify-content-center text-center">
                  <Link className="nav-link " to="/home/profile">
                    <FontAwesomeIcon icon="cogs" size="3x" />
                    <h3>Panel de usuario</h3>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <Fragment>{this.props.children}</Fragment>
      </Fragment>
    );
  }
}

export default Navbar;
