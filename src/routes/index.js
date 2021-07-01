const express = require('express');
const routes = express.Router();

const home = require('../app/controllers/HomeController');

const cadastros = require('./cadastros');
const graficos = require('./graficos');
const financeiro = require('./financeiro');

/* -- NAVEGAÇÃO -- */
routes.get('/', home.index);
// routes.get('/rh/funcionarios', cadastros.formFunc);

/* -- PAGES -- */
routes.use('/cadastros', cadastros);
routes.use('/graficos', graficos);
routes.use('/financeiro', financeiro);

module.exports = routes;