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

/** Asignaturas */
api.get('/asignaturas', query.getAllSubjects);
api.get('/asignaturas/:id', query.getSingleSubject);
api.post('/asignaturas', query.createSubject);
api.put('/asignaturas/:id', query.updateSubject);
api.delete('/asignaturas/:id', query.deleteSubject);

/** Docentes */
api.get('/docentes', query.getAllTeachers);
api.get('/docentes/:id', query.getSingleTeacher);
api.post('/docentes', query.createTeacher);
api.put('/docentes/:id', query.updateTeacher);
api.delete('/docentes/:id', query.deleteTeacher);

/** Semestres */
api.get('/semestres', query.getAllSemesters);
api.get('/semestres/:id', query.getSingleSemester);
api.post('/semestres', query.createSemester);
api.put('/semestres/:id', query.updateSemester);
api.delete('/semestres/:id', query.deleteSemester);

/** Salones */
api.get('/salones', query.getAllClassRooms);
api.get('/salones/:id', query.getSingleClassRoom);
api.post('/salones', query.createClassRoom);
api.put('/salones/:id', query.updateClassRoom);
api.delete('/salones/:id', query.deleteClassRoom);

/** programas asignaturas */
api.get('/programas_asignaturas', query.getAllCareerSubjects);
api.get('/programas_asignaturas/:id', query.getSingleCareerSubject);
api.get('/asignaturas_programa/:id', query.getSingleSubjectFromCareer);
api.post('/programas_asignaturas', query.createCarrerSubject);
api.put('/programas_asignaturas/:id', query.updateCareerSubject);
api.delete('/programas_asignaturas/:id', query.deleteCareerSubject);

module.exports = api;
