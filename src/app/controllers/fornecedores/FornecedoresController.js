const Fornecedores = require('../../models/Fornecedores');
const { date, age, formatPrice, birthDay } = require('../../../libs/utils');

module.exports = {
  // LISTA DOS FORNECEDORES
  async index(req, res) {
    try {
      // Retorna os dados de todos os Fornecedores
      let results = await Fornecedores.all();
      const fornecedores = results.rows;
      
      return res.render('cadastros/fornecedores/index', { fornecedores });
      
    } catch (error) {
      console.log(error);
    }
  },

  // EXIBE O FORMULÁRIO
  async formFornecedor(req, res) {
    try {
      let results = await Fornecedores.fornecedorSelector();
      const fornecedorName = results.rows;

      return res.render('cadastros/fornecedores/form-fornecedor', { fornecedorName });
      
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

      // req.body.salario = req.body.salario.replace(/\D/g,"");

      let results = await Fornecedores.post(req.body);
      const fornecedorId = results.rows[0].id;

      // return res.redirect(`/cadastros/funcionarios/show-funcionario/${fornecedorId}`);
      return res.redirect(`/cadastros/funcionarios/index`);
      
    } catch (error) {
      console.log(error);
    }
  },

  // RETORNA UM FUNCIONÁRIO
  async find(req, res) {
    try {
      let results = await Fornecedores.findFornecedor(req.params.id);
      const fornecedor = results.rows[0];
      
      console.log('FUNCIONÁRIO: ', fornecedor);
      
      return res.render('cadastros/fornecedores/show-fornecedor', { fornecedor });
      
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