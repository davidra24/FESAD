import React, { Component, Fragment } from 'react';
import AgregarPrograma from '../../components/programas/AgregarPrograma';
import ConsultarPrograma from '../../components/programas/ConsutlarPrograma';
import Loading from '../../components/loading/Loading';
import 'dotenv/config';

class Programa extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addPrograms = this.addPrograms.bind(this);
  }
  state = {
    semestres: this.semesters(),
    data: [],
    loadingData: true,
    errorData: null,
    loadingPost: false,
    errorPost: null,
    form: {
      nombre: '',
      semestres: ''
    }
  };
  semesters() {
    let arr = new Array();
    for (let i = 1; i <= 10; i++) {
      arr.push(<option key={i}>{i}</option>);
    }
    return arr;
  }
  componentDidMount() {
    this.fetchProgramas();
  }
  fetchProgramas = async () => {
    this.setState({
      loading: true,
      errorData: null
    });
    try {
      const response = await fetch(process.env.API_PROGRAMAS, {
        mode: 'no-cors'
      });
      const data = await response.json();
      this.setState({
        loadingData: false,
        data: data
      });
    } catch (error) {
      this.setState({
        loadingData: false,
        errorData: error
      });
    }
  };
  handleSubmit(e) {
    e.preventDefault();
    this.addPrograms();
  }
  addPrograms = async () => {
    this.setState({
      loading: true,
      errorPost: null
    });
    try {
      //console.log(info);

      const response = await fetch(process.env.API_PROGRAMAS, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(this.state.form),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      this.setState({
        loadingPost: false
      });
      this.fetchProgramas();
    } catch (error) {
      this.setState({
        loadingPost: false,
        errorPost: error
      });
    }
  };
  handleEdit(e) {}
  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {this.state.loadingPost && <Loading />}
            <AgregarPrograma
              semestres={this.state.semestres}
              formNombre={this.state.form.nombre}
              formSemestres={this.state.form.semestres}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
            <ConsultarPrograma
              error={this.state.errorData}
              careers={this.state.data}
              handleEdit={this.handleEdit}
            />
            {this.state.loadingData && <Loading />}
          </div>
        </div>
      </div>
    );
  }
}

export default Programa;
