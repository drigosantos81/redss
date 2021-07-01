const express = require('express');
const routes = express.Router();

const financeiroController = require('../app/controllers/financeiro/FinanceiroController');

routes.get('/despesas', financeiroController.index);

module.exports = routes;