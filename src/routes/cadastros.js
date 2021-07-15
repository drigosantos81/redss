const express = require('express');
const routes = express.Router();

const funcionariosController = require('../app/controllers/funcionarios/FuncionariosController');
const fornecedoresController = require('../app/controllers/fornecedores/FornecedoresController');
const clientesController = require('../app/controllers/clientes/ClientesController');

/* ==== FUNCIONÁRIOS ==== */
routes.get('/funcionarios/', funcionariosController.index);
routes.get('/funcionarios/form-funcionario', funcionariosController.formFunc);
routes.get('/funcionarios/show-funcionario/:id', funcionariosController.find);
routes.get('/funcionarios/edit-funcionario/:id/editar', funcionariosController.editValues);
routes.get('/funcionarios/dependentes', funcionariosController.formDependentes);

routes.post('/funcionarios', funcionariosController.post);
routes.put('/funcionarios', funcionariosController.putFuncionario);

/* ==== FORNECEDORES ==== */
routes.get('/fornecedores', fornecedoresController.index);

/* ==== CLIENTES ==== */
routes.get('/clientes', clientesController.index);
routes.get('/clientes/form-cliente', clientesController.formCentroCusto);
routes.get('/clientes/show-cliente/:id', clientesController.umCliente);
routes.get('/clientes/edit-cliente/:id/editar', clientesController.editValues);

routes.post('/clientes', clientesController.post);
routes.put('/clientes', clientesController.putCliente);
routes.delete('/clientes', clientesController.deleteCliente);

module.exports = routes;