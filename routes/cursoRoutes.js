const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

//  Rutas del CRUD de cursos
router.get('/', cursoController.obtenerCursos);
router.post('/', cursoController.crearCurso);
router.put('/:id', cursoController.actualizarCurso);
router.delete('/:id', cursoController.eliminarCurso);

module.exports = router;
