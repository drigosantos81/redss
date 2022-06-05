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
      let results = await Despesa.providerSelector();
      const providerName = results.rows;

      return res.render('financeiro/despesas/form-inclui-pgto', { providerName });
      
    } catch (error) {
      console.log(error);
    }
  }
}