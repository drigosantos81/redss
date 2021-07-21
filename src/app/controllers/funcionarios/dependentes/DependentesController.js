// const Funcionarios = require('../../../models/Funcionarios');
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

      let results = await Dependentes.postDependente(req.body);
      const dependenteId = results.rows[0].id;

      return res.redirect(`/cadastros/funcionarios/dependentes/dependentes`);
      
    } catch (error) {
      console.log(error);
    }
  }

}