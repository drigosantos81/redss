const Financeiro = require('../models/financeiro/saldos');
const { date, age, formatPrice, birthDay } = require('../../libs/utils');

module.exports = {
  // ÍNICIO
  async index(req, res) {
    try {
      // Contas vencidas
      let results = await Financeiro.allDespesasAberto();
      const contasVencidas = results.rows[0];

      // Saldo
      let recebimentosResults = await Financeiro.totalRecebimentos();
      const totalRecebido = recebimentosResults.rows[0].sum;

      let pgtoResults = await Financeiro.totalPago();
      const totalPagamentos = pgtoResults.rows[0].sum;

      // Formatação
      const saldo = formatPrice(totalRecebido - totalPagamentos);
      contasVencidas.sum = formatPrice(contasVencidas.sum);
      
      return res.render('home-search/index', { contasVencidas, saldo });
      
    } catch (error) {
      console.log(error);
    }
  },

  header(req, res) {
    try {      
      return res.render('parts/header');
      
    } catch (error) {
      console.log(error);
    }
  }
}