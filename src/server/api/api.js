const express = require('express');
const query = require('../database/queries');
const api = express.Router();
const bodyParser = require('body-parser');

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

/** Usuarios */
/*
api.get('/usuarios', query.getAllUsers);
api.get('/usuarios/:cedula', query.getSingleUser);
api.post('/usuarios', query.createUser);
api.put('/usuarios/:cedula', query.updateUser);
api.delete('/usuarios/:cedula', query.deleteUser);
*/
