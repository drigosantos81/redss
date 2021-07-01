const CentroCusto = require('../../models/CentroCusto');
const { date, age, formatPrice } = require('../../../libs/utils');

module.exports = {
  // EXIBE TODOS OS CLIENTES / CENTRO DE CUSTO
  async index(req, res) {
    try {
      // Retorna os dados de todos os Clientes/Centro de Custo
      let results = await CentroCusto.all();
      const clientes = results.rows;

      clientes.valor_contrato = formatPrice(clientes.valor_contrato);

      console.log('LISTA DOS CLIENTES: ', clientes);

      return res.render('cadastros/clientes/index', { clientes });
      
    } catch (error) {
      console.log(error);
    }
  },

  // EXIBE O FORMULÁRIO
  async formCentroCusto(req, res) {
    try {      
      return res.render('cadastros/clientes/form-cliente');
      
    } catch (error) {
      console.log(error);
    }
  },
  // CADASTRA NOVO FUNCIONÁRIO
  async post(req, res) {
    try {
      // const keys = Object.keys(req.body);

      // for (key of keys) {
      //   if (req.body[key] == "") {
      //     return res.send("Por favor, preencha todos os campos.");
      //   }
      // }
      // date(Date.now()).iso, date(Date.now()).iso, 

      let { nome, cei, cnpj_cpf, cep, endereco, numero_end, bairro, pais, uf,
        cidade, data_contrato, data_fim_contrato, valor_contrato } = req.body;

      valor_contrato = valor_contrato.replace(/\D/g,"");

      const clienteId = await CentroCusto.post({
        nome, cei, cnpj_cpf, cep, endereco, numero_end, bairro, pais, uf,
        cidade, data_contrato, data_fim_contrato, valor_contrato
      });

      // let results = await CentroCusto.post(req.body);
      // const clienteId = results.rows[0].id;

      console.log('DADOS DO CLIENTE: ');
      
      return res.redirect(`/cadastros/clientes`);
      // return res.redirect(`/cadastros/clientes/form-cliente/${clienteId}`);
      
    } catch (error) {
      console.log(error);
    }
  },
}