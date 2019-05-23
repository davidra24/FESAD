const express = require('express');
const query = require('../database/queries');
const api = express.Router();
const bodyParser = require('body-parser');

api.use(bodyParser.json({ limit: '100mb' }));
api.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
api.use(bodyParser.urlencoded({ extended: false }));

/** Usuarios */

api.get('/usuarios', query.getAllUsers);
api.get('/usuarios/:id', query.getSingleUser);
api.post('/usuarios', query.createUser);
api.put('/usuarios/:id', query.updateUser);
api.delete('/usuarios/:id', query.deleteUser);

/** Programas */
api.get('/programas', query.getAllCareers);
api.get('/programas/:id', query.getSingleCareer);
api.post('/programas', query.createCareer);
api.put('/programas/:id', query.updateCareer);
api.delete('/programas/:id', query.deleteCareer);

module.exports = api;
