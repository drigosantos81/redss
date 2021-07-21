const db = require('../../config/db');
const { date } = require('../../libs/utils');

module.exports = {
  // Retorna os dados de todos funcionários
  allFuncionarios() {
    try {
      return db.query(`
        SELECT * FROM funcionarios
      `);

    } catch (error) {
      console.log(error);
    }
  },

  dependentePorFunc(id) {
    try {
      return db.query(`
        SELECT funcionarios.first_nome, dependente_func.* FROM funcionarios
        INNER JOIN dependente_func ON (funcionarios.id = dependente_func.funcionario_id)
        WHERE funcionarios.id = $1 
      `, [id]);

    } catch (error) {
      console.log(error);
    }
  },

  // Comando POST para os dependentes
  postDependente(data) {
    try {
      const query = `
        INSERT INTO dependente_func (
          nome, cpf, nascimento, funcionario_id
        )        
        VALUES (
          $1, $2, $3, $4
          )
        RETURNING id
      `;

      const values = [
        data.nome, data.cpf, data.nascimento, data.funcionario_id
      ]

      return db.query(query, values);
    } catch (error) {
      console.log(error);
    }	
  }

}
