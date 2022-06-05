const express = require('express');
const routes = express.Router();

const financeiroController = require('../app/controllers/financeiro/FinanceiroController');


/* ==== DESPESAS ==== */
routes.get('/despesas', financeiroController.index);
routes.get('/despesas/form-inclui-pgto', financeiroController.formDespesa);

routes.post('/despesas', financeiroController.POST);

/* ==== RECEBIMENTOS ==== */

module.exports = routes;