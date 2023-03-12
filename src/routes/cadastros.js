const express = require('express');
const routes = express.Router();

const funcionariosController = require('../app/controllers/funcionarios/FuncionariosController');
const dependentesController = require('../app/controllers/funcionarios/dependentes/DependentesController');
const jobController = require('../app/controllers/funcionarios/jobs/JobsController');
const fornecedoresController = require('../app/controllers/fornecedores/FornecedoresController');
const clientesController = require('../app/controllers/clientes/ClientesController');

/* ==== FUNCIONÁRIOS ==== */
routes.get('/funcionarios/', funcionariosController.index);
routes.get('/funcionarios/form-funcionario', funcionariosController.formFunc);
routes.get('/funcionarios/show-funcionario/:id', funcionariosController.find);
routes.get('/funcionarios/edit-funcionario/:id/editar', funcionariosController.editValues);

routes.post('/funcionarios', funcionariosController.post);
routes.put('/funcionarios', funcionariosController.putFuncionario);
routes.delete('/funcionarios', funcionariosController.deleteFunc);
/* ---- DEPENDENTES ---- */
routes.get('/funcionarios/dependentes/dependentes', dependentesController.formDependentes);
routes.post('/funcionarios/dependentes', dependentesController.postDependente);
routes.delete('funcionarios/dependentes', dependentesController.deleteDependente);
/* ---- FUNÇÕES ---- */
routes.get('/funcionarios/jobs', jobController.index);
routes.get('/funcionarios/jobs/form-job', jobController.formJob);
routes.get('/funcionarios/jobs/show-job/:id', jobController.findJob);

routes.post('/funcionarios/jobs', jobController.postJob);
// routes.delete('funcionarios/jobs', dependentesController.deleteDependente);

/* ==== FORNECEDORES ==== */
routes.get('/fornecedores', fornecedoresController.index);
routes.get('/fornecedores/show-fornecedor/:id', fornecedoresController.find);
routes.get('/fornecedores/form-fornecedor', fornecedoresController.formFornecedor);
routes.get('/fornecedores/edit-fornecedor/:id/editar', fornecedoresController.editValues);

routes.post('/fornecedores', fornecedoresController.post);
routes.put('/fornecedores', fornecedoresController.putFornecedor);
routes.delete('/fornecedores', fornecedoresController.deleteFornecedor);

/* ==== CLIENTES ==== */
routes.get('/clientes', clientesController.index);
routes.get('/clientes/form-cliente', clientesController.formCentroCusto);
routes.get('/clientes/show-cliente/:id', clientesController.umCliente);
routes.get('/clientes/edit-cliente/:id/editar', clientesController.editValues);

routes.post('/clientes', clientesController.post);
routes.put('/clientes', clientesController.putCliente);
routes.delete('/clientes', clientesController.deleteCliente);

module.exports = routes;