import React, { Component, Fragment } from 'react';
import AgregarPrograma from '../../components/programas/AgregarPrograma';
import ConsultarPrograma from '../../components/programas/ConsultarPrograma';
import Loading from '../../components/loading/Loading';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class Programa extends Component {
  MySwal = withReactContent(Swal);
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addPrograms = this.addPrograms.bind(this);
  }
  state = {
    semestres: this.semestres(),
    data: [],
    loadingData: true,
    errorData: null,
    loadingPost: false,
    errorPost: null,
    form: {
      nombre: '',
      semestres: ''
    },
    api_programas: '/api/programas',
    desarrollo: [{ id: 5, nombre: 'Ingeniería de algo', semestres: 7 }]
  };
  semestres() {
    let arr = new Array();
    arr.push(<option key={0} />);
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
      const response = await fetch(this.state.api_programas, {
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
    if (this.state.form.nombre != '') {
      try {
        const response = await fetch(this.state.api_programas, {
          method: 'POST',
          body: JSON.stringify(this.state.form),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
        this.setState({
          loadingData: true
        });
        this.clear();
        this.fetchProgramas();
        if (response.status === 200) {
          this.MySwal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Se ha guardado el programa satsfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          this.MySwal.fire({
            type: 'error',
            position: 'top-end',
            title: 'Oops...',
            text: 'No se ha podido crear el programa ',
            showConfirmButton: false,
            timer: 1500
          });
          this.setState({
            loadingData: false,
            errorPost: error
          });
          return false;
        }
        return true;
      } catch (error) {
        this.setState({
          loadingData: false,
          errorPost: error
        });
        return false;
      }
    } else {
      this.MySwal.fire({
        type: 'error',
        position: 'top-end',
        title: 'Oops...',
        text: 'No se ha podido crear el programa ',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  clear = () => {
    this.setState({
      form: {
        nombre: '',
        semestres: ''
      }
    });
  };
  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };
  handleRemove = (e, data) => {
    this.MySwal.fire({
      title: '¿Está seguro?',
      text: '¿Está seguro que desea eliminar este programa?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#808080',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.value) {
        this.remove(data.id);
      }
    });
  };
  handleEdit = async (e, data) => {
    await this.MySwal.fire({
      title: 'Editar programa',
      html:
        '<label>Nombre:</label>' +
        `<input id="nombre_programa" class="swal2-input" placeholder="Nombre" value="${
          data.nombre
        }"/>` +
        '<label>Número de semestres:</label>' +
        `<input id="semestres_programa" class="swal2-input" placeholder="Semestres" value="${
          data.semestres
        }"/>`,
      focusConfirm: false,
      preConfirm: () => {
        const nombres = document.getElementById('nombre_programa').value;
        const semestres = document.getElementById('semestres_programa').value;
        this.setState({
          form: {
            nombres: nombres,
            semestres: semestres
          }
        });
      }
    });
    if (this.state.form.nombre != '' && !this.state.form.semestres.isNaN) {
      this.edit(data.id);
    }
  };
  edit = async id => {
    this.setState({
      loading: true,
      errorPost: null
    });
    if (this.state.form.nombre != '') {
      try {
        const response = await fetch(`${this.state.api_programas}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(this.state.form),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
        this.setState({
          loadingData: true
        });
        this.clear();
        this.fetchProgramas();
        if (response.status === 200) {
          this.MySwal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Se ha actualizado el programa satsfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          this.MySwal.fire({
            type: 'error',
            position: 'top-end',
            title: 'Oops...',
            text: 'No se ha podido editar el programa ',
            showConfirmButton: false,
            timer: 1500
          });
          this.setState({
            loadingData: false,
            errorPost: error
          });
        }
      } catch (error) {
        this.setState({
          loadingData: false,
          errorPost: error
        });
      }
    } else {
      this.MySwal.fire({
        type: 'error',
        position: 'top-end',
        title: 'Oops...',
        text: 'No se ha podido editar el programa ',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  remove = async id => {
    await fetch(`${this.state.api_programas}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            loadingData: true
          });
          this.fetchProgramas();
          this.MySwal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Se ha eliminado el programa satsfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          this.MySwal.fire({
            type: 'error',
            position: 'top-end',
            title: 'Oops...',
            text: 'No se ha podido eliminar el programa seleccionado',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(error => {
        this.MySwal.fire({
          type: 'error',
          position: 'top-end',
          title: 'Oops...',
          text: 'No se ha podido eliminar el programa seleccionado',
          showConfirmButton: false,
          timer: 1500
        });
      });
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <AgregarPrograma
              semestres={this.state.semestres}
              formNombre={this.state.form.nombre}
              formSemestres={this.state.form.semestres}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
            {this.state.loadingData && <Loading />}
            <ConsultarPrograma
              api={this.state.api_programas}
              error={this.state.errorData}
              careers={this.state.data}
              handleEdit={this.handleEdit}
              openModal={this.openModal}
              handleRemove={this.handleRemove}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Programa;
