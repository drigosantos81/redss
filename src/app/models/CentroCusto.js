const db = require('../../config/db');
const { date } = require('../../libs/utils');

module.exports = {
  // Retorna os dados de todos funcionários
  all() {
    try {
      return db.query(`
        SELECT * FROM centro_custo
      `);
      // SELECT recipes.*, chefs.name AS chef_name FROM recipes
      //   LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      //   ORDER BY recipes.created_at DESC
    } catch (error) {
      console.log(error);
    }
  },
  // Comando POST para um novo funcinário
  post(data) {
    try {
      const query = `
        INSERT INTO centro_custo (nome, cei, cnpj_cpf, cep, endereco, numero_end, bairro, pais, uf,
          cidade, data_contrato, data_fim_contrato, created_at, updated_at, valor_contrato
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING id
      `;

      const values = [
        data.nome, data.cei, data.cnpj_cpf, data.cep, data.endereco, data.numero_end, data.bairro, data.pais, data.uf,
        data.cidade, data.data_contrato, data.data_fim_contrato, date(Date.now()).iso, date(Date.now()).iso, data.valor_contrato
      ]

      return db.query(query, values);
    } catch (error) {
      console.log(error);
    }	
  },
  // Retorna os dados de um Funcionário
	find(id) {
		try {
			return db.query(`
				SELECT * FROM centro_custo 
				WHERE id = $1
			`, [id]
			);

      // SELECT recipes.*, chefs.name AS chef_name FROM recipes 
      // LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      // WHERE recipes.id = $1

		} catch (error) {
			console.log(error);
		}
},
}
