const Funcionarios = require('../../models/Funcionarios');
const { date, age, formatPrice, birthDay } = require('../../../libs/utils');

module.exports = {
  // LISTA DOS FUNCIONÁRIOS
  async index(req, res) {
    try {
      // Retorna os dados de todos os Funcionários
      let results = await Funcionarios.all();
      const funcionarios = results.rows;

      funcionarios.nascimento = birthDay(funcionarios.nascimento).iso;
      funcionarios.formatData_admissao = date(funcionarios.data_admissao).format;
      funcionarios.salario = formatPrice(funcionarios.salario);

      console.log('LISTA DOS FUNCIONÁRIOS: ', funcionarios);
      
      return res.render('cadastros/funcionarios/index', { funcionarios });
      
    } catch (error) {
      console.log(error);
    }
  },
  // EXIBE O FORMULÁRIO
  async formFunc(req, res) {
    try {      
      return res.render('cadastros/funcionarios/form-funcionario');
      
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

      let results = await Funcionarios.post(req.body);
      const funcionarioId = results.rows[0].id;

      console.log('DADOS DO FUNCIONÁRIO: ');
      
      return res.redirect(`/cadastros/funcionarios`);
      // return res.redirect(`/cadastros/funcionarios/form-funcionario/${funcionarioId}`);
      
    } catch (error) {
      console.log(error);
    }
  },
  // RETORNA UM FUNCIONÁRIO
  async find(req, res) {
    try {
      let results = await Funcionarios.find(req.params.id);
      const funcionario = results.rows[0];

      funcionario.nascimento = age(funcionario.nascimento);
      funcionario.data_admissao = date(funcionario.data_admissao).format;
      funcionario.salario = formatPrice(funcionario.salario);
      
      return res.render('cadastros/funcionarios/show-funcionario', { funcionario });
      
    } catch (error) {
      console.log(error);
    }
  }
}