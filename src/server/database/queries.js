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
  var usrID = parseInt(req.params.cedula);
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
  var usrID = parseInt(req.params.cedula);
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
