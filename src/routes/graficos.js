const express = require('express');
const routes = express.Router();

const graficosController = require('../app/controllers/graficos/index');

routes.get('/', graficosController.index);
// routes.get('/funcionarios', cadastrosController.formFunc);

module.exports = routes;