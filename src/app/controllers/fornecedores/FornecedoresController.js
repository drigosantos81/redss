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

      let results = await Fornecedores.post(req.body);
      const fornecedorId = results.rows[0].id;

      return res.redirect(`/cadastros/fornecedores/show-fornecedor/${fornecedorId}`);
      
    } catch (error) {
      console.log(error);
    }
  },

  // RETORNA UM FORNECEDOR
  async find(req, res) {
    try {
      let results = await Fornecedores.findFornecedor(req.params.id);
      const fornecedor = results.rows[0];
      
      return res.render('cadastros/fornecedores/show-fornecedor', { fornecedor });
      
    } catch (error) {
      console.log(error);
    }
  },

  // RETORNA OS DADOS DE UM FUNCIONÁRIO PARA OS CAMPOS DE EDIÇÃO
  async editValues(req, res) {
    try {
      let results = await Fornecedores.findFornecedor(req.params.id);
      const fornecedor = results.rows[0];

      return res.render('cadastros/fornecedores/edit-fornecedor', { fornecedor });

    } catch (error) {
      console.log(error);
    }
  },

  // COMANDO PUT PARA ATUALIZAÇÃO DO FUNCIONÁRIO
  async putFornecedor(req, res) {
    try {
			const keys = Object.keys(req.body);
			// Verifica se todos os campos estão preenchidos
			for (key of keys) {
				if ((req.body.path == '') || req.body[key] == '') {
					return res.send('Preencha todos os campos.');
				}
			}

      await Fornecedores.updateFornecedor(req.body);

      return res.redirect(`/cadastros/fornecedores/show-fornecedor/${req.body.id}`);
    
    } catch (error) {
      console.log(error);
    }
  },

  // COMANDO DELE PARA EXCLUSÃO DE UM FUNCIONÁRIO
  async deleteFornecedor(req, res) {
    try {
      await Fornecedores.delete(req.body.id);

      return res.redirect('/cadastros/fornecedores');
    } catch (error) {
      console.log(error);
    }
  }

}