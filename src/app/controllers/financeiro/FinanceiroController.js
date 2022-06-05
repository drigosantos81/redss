const Financeiro = require('../../models/financeiro/Saldos');
const Despesa = require('../../models/financeiro/Despesas');
const { date, age, formatPrice, birthDay } = require('../../../libs/utils');

module.exports = {
  // ÍNICIO
  index(req, res) {
    try {      
      return res.render('financeiro/despesas/index');
      
    } catch (error) {
      console.log(error);
    }
  },
  
  async saldoPorSetor(req, res) {
    try {
      
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
  }
}