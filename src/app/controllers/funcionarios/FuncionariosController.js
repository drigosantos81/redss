const Funcionarios = require('../../models/Funcionarios');
const Dependentes = require('../../models/Dependentes');
const CentroCusto = require('../../models/CentroCusto');
const { date, age, formatPrice, birthDay } = require('../../../libs/utils');

module.exports = {
  // LISTA DOS FUNCIONÁRIOS
  async index(req, res) {
    try {
      // Retorna os dados de todos os Funcionários
      let results = await Funcionarios.all();
      const funcionarios = results.rows;

      const formatPromise = funcionarios.map(async funcionario => {
        funcionario.nascimento = age(funcionario.nascimento);
        funcionario.data_admissao = date(funcionario.data_admissao).format;
        funcionario.salario = formatPrice(funcionario.salario);

        return funcionario;
      });
      const allFuncionarios = await Promise.all(formatPromise);
      
      return res.render('cadastros/funcionarios/index', { funcionarios: allFuncionarios });
      
    } catch (error) {
      console.log(error);
    }
  },

  // EXIBE O FORMULÁRIO
  async formFunc(req, res) {
    try {
      let results = await CentroCusto.clienteSelector();
      const clienteName = results.rows;

      return res.render('cadastros/funcionarios/form-funcionario', { clienteName });
      
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

      req.body.salario = req.body.salario.replace(/\D/g,"");

      let results = await Funcionarios.post(req.body);
      const funcionarioId = results.rows[0].id;

      return res.redirect(`/cadastros/funcionarios/show-funcionario/${funcionarioId}`);
      
    } catch (error) {
      console.log(error);
    }
  },

  // RETORNA UM FUNCIONÁRIO
  async find(req, res) {
    try {
      let results = await Funcionarios.find(req.params.id);
      const funcionario = results.rows[0];

      funcionario.data_admissao = date(funcionario.data_admissao).format;
      funcionario.nascimento = date(funcionario.nascimento).format;
      funcionario.idade = age(funcionario.nascimento);
      funcionario.salario = formatPrice(funcionario.salario);
      
      console.log('FUNCIONÁRIO: ', funcionario);

      return res.render('cadastros/funcionarios/show-funcionario', { funcionario });
      
    } catch (error) {
      console.log(error);
    }
  },

  // RETORNA OS DADOS DE UM FUNCIONÁRIO PARA OS CAMPOS DE EDIÇÃO
  async editValues(req, res) {
    try {
      let resultsCliente = await CentroCusto.clienteSelector();
      const clienteName = resultsCliente.rows;

      let results = await Funcionarios.find(req.params.id);
      const funcionario = results.rows[0];

      funcionario.data_admissao = date(funcionario.data_admissao).format;
      funcionario.nascimento = date(funcionario.nascimento).format;
      funcionario.idade = age(funcionario.nascimento);
      funcionario.salario = formatPrice(funcionario.salario);
      
      return res.render('cadastros/funcionarios/edit-funcionario', { funcionario, clienteName });

    } catch (error) {
      console.log(error);
    }
  },

  // COMANDO PUT PARA ATUALIZAÇÃO DO FUNCIONÁRIO
  async putFuncionario(req, res) {
    try {
			const keys = Object.keys(req.body);
			// Verifica se todos os campos estão preenchidos
			for (key of keys) {
				if ((req.body.path == '') || req.body[key] == '') {
					return res.send('Preencha todos os campos.');
				}
			}

      req.body.salario = req.body.salario.replace(/\D/g,"");
      
      await Funcionarios.updateFuncionario(req.body);

      return res.redirect(`/cadastros/funcionarios/show-funcionario/${req.body.id}`);
    
    } catch (error) {
      console.log(error);
    }
  },

  // COMANDO DELE PARA EXCLUSÃO DE UM FUNCIONÁRIO
  async deleteFunc(req, res) {
    try {
      await Funcionarios.delete(req.body.id);

      return res.redirect('/cadastros/funcionarios');
    } catch (error) {
      console.log(error);
    }
  }

}