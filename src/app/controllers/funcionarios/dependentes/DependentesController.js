const Funcionarios = require('../../../models/Funcionarios');
const Dependentes = require('../../../models/Dependentes');
const { date, age, formatPrice, birthDay } = require('../../../../libs/utils');

module.exports = {
 // EXIBE PÁGINA DE CADASTRO DE DEPENDENTES
 async formDependentes(req, res) {
  try {
    let resultsFuncionario = await Dependentes.allFuncionarios();
    const funcionarios = resultsFuncionario.rows;

    return res.render(`cadastros/funcionarios/dependentes/dependentes`, { funcionarios });
    
    } catch (error) {
      console.log(error);
    }
  },

  // CADASTRAR DEPENDENTE
  async postDependente(req, res) {
    try {
      const keys = Object.keys(req.body);

      for (key of keys) {
        if (req.body[key] == "") {
          return res.send("Por favor, preencha todos os campos.");
        }
      }

      let resultsFuncionario = await Funcionarios.findFuncionario(req.body.funcionario_id);
      const funcionarioId = resultsFuncionario.rows[0].id;

      let results = await Dependentes.postDependente(req.body);
      const dependenteId = results.rows[0].id_dep;

      return res.redirect(`/cadastros/funcionarios/show-funcionario/${funcionarioId}`);
      
    } catch (error) {
      console.log(error);
    }
  },

  // COMANDO DELETE PARA EXCLUSÃO DE UM DEPENDENTE
  async deleteDependente(req, res) {
    try {
      let resultsFuncionario = await Funcionarios.findFuncionario(req.body.funcionario_id);
      const funcionarioId = resultsFuncionario.rows[0].id;

      // let resultsDependente = await Funcionarios.dependentePorFunc(req.params.id);
      // const dependenteId = resultsDependente.rows[0].id;

      console.log('DELETE DEP.ID', req.body.id_dep);
      await Dependentes.deleteDependente(req.body.id_dep);

      return res.redirect(`/cadastros/funcionarios/show-funcionario/${funcionarioId}`);

    } catch (error) {
      console.log(error);
    }
  }

}