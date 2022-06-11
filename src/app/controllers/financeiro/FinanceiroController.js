const Financeiro = require('../../models/financeiro/Saldos');
const Despesa = require('../../models/financeiro/Despesas');
const { date, age, formatPrice, birthDay } = require('../../../libs/utils');

module.exports = {
  // ÍNICIO
  async index(req, res) {
    try {
      // Retorna os dados de todas as Despesas
      let results = await Despesa.allExpense();
      const expenses = results.rows;

      var sumOverDue = Number('');
      for (let i = 0; i < expenses.length; i++) {
        const overDue = expenses[i].valor;
        sumOverDue = sumOverDue + overDue;
      }
      sumOverDue = formatPrice(sumOverDue);

      const formartPromise = expenses.map(async expense => {
        expense.data_vencimento = date(expense.data_vencimento).format;
        expense.data_pagamento = date(expense.data_pagamento).format;
        expense.valor = formatPrice(expense.valor);

        return expense;
      });
      const allExpense = await Promise.all(formartPromise);

      return res.render('financeiro/despesas/index', { expenses: allExpense, sumOverDue });
    } catch (error) {
      console.log(error);
    }
  },
  
  async formDespesa(req, res) {
    try {
      let resultsProvider = await Despesa.providerSelector();
      const providerName = resultsProvider.rows;

      let resultsDocument = await Despesa.docSelector();
      const docName = resultsDocument.rows;

      let resultsCostCenter = await Despesa.costCenterSelector();
      const costCenterName = resultsCostCenter.rows;

      let resultsAccounting = await Despesa.accountingSelector();
      const accountingName = resultsAccounting.rows;

      return res.render('financeiro/despesas/form-inclui-pgto', { providerName, docName, costCenterName, accountingName });
      
    } catch (error) {
      console.log(error);
    }
  },

  async POST(req, res) {
    try {
      // const keys = Object.keys(req.body);

      // for (key of keys) {
      //   if (req.body[key] == "") {
      //     return res.send("Por favor, preencha todos os campos.");
      //   }
      // }

      req.body.valor = req.body.valor.replace(/\D/g,"");

      let results = await Despesa.post(req.body);
      const despesaId = results.rows/*[0].id*/;

      console.log(req.body);
      return res.redirect(`/financeiro/despesas`);
      
    } catch (error) {
      console.log(error);
    }
  },

  async findOneExpense(req, res) {
    try {
      let results = await Despesa.findExpense(req.params.id);
      const expense = results.rows[0];

      expense.valor = formatPrice(expense.valor);
      expense.data_vencimento = date(expense.data_vencimento).format;
      expense.data_emissao = date(expense.data_emissao).format;
      expense.data_pagamento = date(expense.data_pagamento).format;
      expense.created_at = date(expense.created_at).format;
      expense.updated_at = date(expense.updated_at).format;

      console.log(expense);

      return res.render('financeiro/despesas/show-despesa', { expense });

    } catch (error) {
      console.log(error);
    }
  },

  async saldoPorSetor(req, res) {
    try {
      
    } catch (error) {
      console.log(error);
    }
  }

}