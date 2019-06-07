require('dotenv/config');
const promise = require('bluebird');
const options = {
  promiseLib: promise
};
const pgp = require('pg-promise')(options);
const connectionString = `${process.env.DATABASE_URL}?ssl=true`;
const db = pgp(connectionString);
const bcrypt = require('bcrypt');

/** USUARIOS */
module.exports.getAllUsers = (req, res, next) => {
  db.any('select * from usuarios')
    .then(usuarios => {
      res.status(200).json(usuarios);
    })
    .catch(err => next(err));
};

module.exports.getSingleUser = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.one('select * from usuarios where id = $1', usrID)
    .then(function(usuario) {
      res.status(200).json(usuario);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.createUser = async (req, res, next) => {
  const pass = await bcrypt.hash(req.body.clave, 10);
  db.none(
    'insert into usuarios(nombre,correo,clave, tipo)' +
      'values($1, $2, $3, $4)',
    [req.body.nombre, req.body.correo, pass, req.body.tipo]
  )
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Inserted one user'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.deleteUser = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.result('delete from usuarios where id = $1', usrID)
    .then(function(result) {
      res.status(200).json({
        status: 'success',
        message: `Removed ${result.rowCount} User`
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.updateUser = async (req, res, next) => {
  const pass = await bcrypt.hash(req.body.clave, 10);
  db.none(
    'update usuarios set nombre=$1, correo=$2, clave=$3, tipo=$4 ' +
      ' where id=$5',
    [
      req.body.nombre,
      req.body.correo,
      pass,
      req.body.tipo,
      parseInt(req.params.id)
    ]
  )
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Updated User'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};
/** PROGRAMAS */
module.exports.getAllCareers = (req, res, next) => {
  db.any('select * from programas')
    .then(programas => {
      res.status(200).json(programas);
    })
    .catch(err => next(err));
};

module.exports.getSingleCareer = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.one('select * from programas where id = $1', usrID)
    .then(function(programa) {
      res.status(200).json(programa);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.createCareer = (req, res, next) => {
  db.none(
    'insert into programas (nombre, semestres)' +
      'values(${nombre}, ${semestres})',
    req.body
  )
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Inserted one user'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.deleteCareer = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.result('delete from programas where id = $1', usrID)
    .then(function(result) {
      res.status(200).json({
        status: 'success',
        message: `Removed ${result.rowCount} Career`
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.updateCareer = (req, res, next) => {
  db.none('update programas set nombre=$1, semestres=$2 where id=$3', [
    req.body.nombres,
    req.body.semestres,
    parseInt(req.params.id)
  ])
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Updated Career'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

/** ASIGNATURAS */
module.exports.getAllSubjects = (req, res, next) => {
  db.any('select * from asignautas')
    .then(programas => {
      res.status(200).json(programas);
    })
    .catch(err => next(err));
};

module.exports.getSingleSubject = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.one('select * from asignaturas where id = $1', usrID)
    .then(function(asignatura) {
      res.status(200).json(asignatura);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.createSubject = (req, res, next) => {
  db.none('insert into asignaturas (nombre)' + 'values(${nombre})', req.body)
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Inserted one user'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.deleteSubject = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.result('delete from asignaturas where id = $1', usrID)
    .then(function(result) {
      res.status(200).json({
        status: 'success',
        message: `Removed ${result.rowCount} Subject`
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.updateSubject = (req, res, next) => {
  db.none('update asignaturas set nombre=$1 where id=$2', [
    req.body.nombres,
    parseInt(req.params.id)
  ])
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Updated Career'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

/** ASIGNATURAS */
module.exports.getAllSubjects = (req, res, next) => {
  db.any('select * from asignaturas')
    .then(asignaturas => {
      res.status(200).json(asignaturas);
    })
    .catch(err => next(err));
};

module.exports.getSingleSubject = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.one('select * from asignaturas where id = $1', usrID)
    .then(function(asignatura) {
      res.status(200).json(asignatura);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.createSubject = (req, res, next) => {
  db.none('insert into asignaturas (nombre)' + 'values(${nombre})', req.body)
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Inserted one user'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.deleteSubject = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.result('delete from asignaturas where id = $1', usrID)
    .then(function(result) {
      res.status(200).json({
        status: 'success',
        message: `Removed ${result.rowCount} Subject`
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.updateSubject = (req, res, next) => {
  db.none('update asignaturas set nombre=$1 where id=$2', [
    req.body.nombres,
    parseInt(req.params.id)
  ])
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Updated Subject'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

/** DOCENTES */
module.exports.getAllTeachers = (req, res, next) => {
  db.any('select * from docentes')
    .then(docentes => {
      res.status(200).json(docentes);
    })
    .catch(err => next(err));
};

module.exports.getSingleTeacher = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.one('select * from docentes where id = $1', usrID)
    .then(function(docente) {
      res.status(200).json(docente);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.createTeacher = (req, res, next) => {
  db.none(
    'insert into docentes (nombre, correo, telefono)' +
      'values(${nombre}, ${correo}, ${telefono})',
    req.body
  )
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Inserted one teacher'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.deleteTeacher = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.result('delete from docentes where id = $1', usrID)
    .then(function(result) {
      res.status(200).json({
        status: 'success',
        message: `Removed ${result.rowCount} Teacher`
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.updateTeacher = (req, res, next) => {
  db.none('update docentes set nombre=$1, correo=$2, telefono=$3 where id=$4', [
    req.body.nombre,
    req.body.correo,
    req.body.telefono,
    parseInt(req.params.id)
  ])
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Updated Teacher'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

/** SEMESTRES */
module.exports.getAllSemesters = (req, res, next) => {
  db.any('select * from semestres')
    .then(semestres => {
      res.status(200).json(semestres);
    })
    .catch(err => next(err));
};

module.exports.getSingleSemester = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.one('select * from semestres where id = $1', usrID)
    .then(function(semestres) {
      res.status(200).json(semestres);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.createSemester = (req, res, next) => {
  db.none(
    'insert into semestres (id, titulo)' + 'values(${id}, ${titulo})',
    req.body
  )
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Inserted one semester'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.deleteSemester = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.result('delete from semestres where id = $1', usrID)
    .then(function(result) {
      res.status(200).json({
        status: 'success',
        message: `Removed ${result.rowCount} Semester`
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.updateSemester = (req, res, next) => {
  db.none('update semestres set titulo=$1 where id=$2', [
    req.body.titulo,
    parseInt(req.params.id)
  ])
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Updated Semester'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

/** SALONES */
module.exports.getAllClassRooms = (req, res, next) => {
  db.any('select * from salones')
    .then(salones => {
      res.status(200).json(salones);
    })
    .catch(err => next(err));
};

module.exports.getSingleClassRoom = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.one('select * from salones where id = $1', usrID)
    .then(function(salones) {
      res.status(200).json(salones);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.createClassRoom = (req, res, next) => {
  db.none(
    'insert into salones (nombre, ubicacion)' +
      'values(${nombre}, ${ubicacion})',
    req.body
  )
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Inserted one class room'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.deleteClassRoom = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.result('delete from salones where id = $1', usrID)
    .then(function(result) {
      res.status(200).json({
        status: 'success',
        message: `Removed ${result.rowCount} class room`
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.updateClassRoom = (req, res, next) => {
  db.none('update salones set nombre=$1, ubicacion=$2 where id=$3', [
    req.body.nombre,
    req.body.ubicacion,
    parseInt(req.params.id)
  ])
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Updated class room'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

/** PROGRAMA_ASIGNATURA */
module.exports.getAllCareerSubjects = (req, res, next) => {
  db.any('select * from programas_asignaturas')
    .then(salones => {
      res.status(200).json(salones);
    })
    .catch(err => next(err));
};

module.exports.getSingleCareerSubject = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.one('select * from programas_asignaturas where id = $1', usrID)
    .then(function(salones) {
      res.status(200).json(salones);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.getSingleSubjectFromCareer = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.any('select * from programas_asignaturas where id_programa = $1', usrID)
    .then(function(salones) {
      res.status(200).json(salones);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.createCarrerSubject = (req, res, next) => {
  db.none(
    'insert into programas_asignaturas (id, id_programa, id_asignatura, creditos, semestre)' +
      'values(${id}, ${id_programa}, ${id_asignatura}, ${creditos}, ${semestre})',
    req.body
  )
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Inserted one career subject'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.deleteCareerSubject = (req, res, next) => {
  var usrID = parseInt(req.params.id);
  db.result('delete from programas_asignaturas where id = $1', usrID)
    .then(function(result) {
      res.status(200).json({
        status: 'success',
        message: `Removed ${result.rowCount} carrer subject`
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.updateCareerSubject = (req, res, next) => {
  db.none(
    'update programas_asignaturas set id_programa=$1, id_asignatura=$2, creditos=$3, semestre=$4 where id=$5',
    [
      req.body.id_programa,
      req.body.id_asignatura,
      req.body.creditos,
      req.body.semestre,
      parseInt(req.params.id)
    ]
  )
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Updated career subject'
      });
    })
    .catch(function(err) {
      return next(err);
    });
};
