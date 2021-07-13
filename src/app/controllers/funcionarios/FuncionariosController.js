const Funcionarios = require('../../models/Funcionarios');
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
        funcionario.nascimento = birthDay(funcionario.nascimento).iso;
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

      let { nome, cpf, rg, nascimento, ctps, serie_ctps, uf_ctps, titulo_eleitor, zona_titulo, secao_titulo,
        data_admissao, funcao, salario, pis, nacionalidade, naturalidade_id, uf, nome_mae, nome_pai, estado_civil,
        telefone, conjuge, cep, endereco, numero_end, bairro, tipo_contrato, centro_custo_id,
        nasc_filho, cpf_filho, cidade_end, uf_end, dados_conta } = req.body;

      salario = salario.replace(/\D/g,"");

      const funcionarioId = await Funcionarios.post({
        nome, cpf, rg, nascimento, ctps, serie_ctps, uf_ctps, titulo_eleitor, zona_titulo, secao_titulo,
        data_admissao, funcao, salario, pis, nacionalidade, naturalidade_id, uf, nome_mae, nome_pai, estado_civil,
        telefone, conjuge, cep, endereco, numero_end, bairro, tipo_contrato, centro_custo_id,
        nasc_filho, cpf_filho, cidade_end, uf_end, dados_conta
      });
      
      // const funcionarioId = results.rows[0].id;
      
      // return res.redirect(`/cadastros/funcionarios`);
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
      
      return res.render('cadastros/funcionarios/show-funcionario', { funcionario });
      
    } catch (error) {
      console.log(error);
    }
  },

  // RETORNA OS DADOS DE UM FUNCIONÁRIO PARA OS CAMPOS DE EDIÇÃO
  async editValues(req, res) {
    try {
      let results = await Funcionarios.find(req.params.id);
      const funcionario = results.rows[0];

      funcionario.data_admissao = date(funcionario.data_admissao).format;
      funcionario.nascimento = date(funcionario.nascimento).format;
      funcionario.idade = age(funcionario.nascimento);
      funcionario.salario = formatPrice(funcionario.salario);
      
      return res.render('cadastros/funcionarios/edit-funcionario', { funcionario });

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

      await Funcionarios.updateFuncionario(req.body);

      return res.redirect(`/cadastros/funcionarios/show-funcionario/${req.body.id}`);
    
    } catch (error) {
      console.log(error);
    }
  }

}