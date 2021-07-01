const express = require('express');
const routes = express.Router();

const funcionariosController = require('../app/controllers/funcionarios/FuncionariosController');
const fornecedoresController = require('../app/controllers/fornecedores/FornecedoresController');
const clientesController = require('../app/controllers/clientes/ClientesController');

/* ==== FUNCIONÁRIOS ==== */
routes.get('/funcionarios/', funcionariosController.index);
routes.get('/funcionarios/form-funcionario', funcionariosController.formFunc);
routes.get('/funcionarios/funcionario/:id', funcionariosController.find);

routes.post('/funcionarios', funcionariosController.post);

/* ==== FORNECEDORES ==== */
routes.get('/fornecedores', fornecedoresController.index);

/* ==== CLIENTES ==== */
routes.get('/clientes', clientesController.index);

module.exports = routes;