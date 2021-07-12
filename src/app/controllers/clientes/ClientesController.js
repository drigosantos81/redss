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

      let { nome, cei, cnpj_cpf, cep, endereco, numero_end, bairro, pais, uf,
        cidade, data_contrato, data_fim_contrato, valor_contrato } = req.body;

      valor_contrato = valor_contrato.replace(/\D/g,"");

      const clienteId = await CentroCusto.post({
        nome, cei, cnpj_cpf, cep, endereco, numero_end, bairro, pais, uf,
        cidade, data_contrato, data_fim_contrato, valor_contrato
      });
      
      return res.redirect(`/cadastros/clientes`);
      // return res.redirect(`/cadastros/clientes/form-cliente/${clienteId}`);
      
    } catch (error) {
      console.log(error);
    }
  },

  // RETORNA UM CLIENTE
  async umCliente(req, res) {
    try {
      let results = await CentroCusto.find(req.params.id);
      const cliente = results.rows[0];

      cliente.data_contrato = date(cliente.data_contrato).format;
      cliente.valor_contrato = formatPrice(cliente.valor_contrato);
      cliente.data_fim_contrato = date(cliente.data_fim_contrato).format;
      
      return res.render('cadastros/clientes/show-cliente', { cliente });
      
    } catch (error) {
      console.log(error);
    }
  },

  // RETORNA OS DADOS DE UM CLIENTE PARA OS CAMPOS DE EDIÇÃO
  async editValues(req, res) {
    try {
      let results = await CentroCusto.find(req.params.id);
      const cliente = results.rows[0];

      cliente.data_contrato = date(cliente.data_contrato).format;
      cliente.valor_contrato = formatPrice(cliente.valor_contrato);
      cliente.data_fim_contrato = date(cliente.data_fim_contrato).format;
      
      return res.render('cadastros/clientes/edit-cliente', { cliente });

    } catch (error) {
      console.log(error);
    }
  },

  // COMANDO PUT PARA ATUALIZAÇÃO DO CLIENTE / CENTRO DE CUSTO
	async putCliente(req, res) {
		try {
			const keys = Object.keys(req.body);
			// Verifica se todos os campos estão preenchidos
			for (key of keys) {
				if ((req.body.path == '') || req.body[key] == '') {
					return res.send('Preencha todos os campos.');
				}
			}

      req.body.valor_contrato = req.body.valor_contrato.replace(/\D/g,"");

      await CentroCusto.updateCliente(req.body);
      
      return res.redirect(`/cadastros/clientes/show-cliente/${req.body.id}`);

    } catch (error) {
      console.error(error);
      // req.session.error = 'Erro inesperado, tente novamente.'
      return res.redirect(`/cadastros/clientes/show-cliente/${req.body.id}`);
    }
	},

  // COMANDO DELETE PARA EXCLUSÃO DE UM CENTRO DE CUSTO
  async deleteCliente(req, res) {
    try {
      await CentroCusto.delete(req.body.id);

      // req.session.success = 'Receita excluída do FoodFy com sucesso.';

      return res.redirect('/cadastros/clientes');

    } catch (error) {
      console.error(error);
      // req.session.error = 'Erro inesperado, tente novamente.'
      return res.redirect(`/cadastros/clientes`);
    }
  },

}