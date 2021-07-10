const db = require('../../config/db');
const { date } = require('../../libs/utils');

module.exports = {
  // Retorna os dados de todos funcionários
  all() {
    try {
      return db.query(`
        SELECT funcionarios.*, centro_custo.nome AS SETOR FROM funcionarios
        LEFT JOIN centro_custo ON (funcionarios.centro_custo_id = centro_custo.id)
      `);
// WHERE funcionarios.id = $1

      // SELECT * FROM funcionarios
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
        INSERT INTO funcionarios (nome, cpf, rg, nascimento, ctps, serie_ctps, uf_ctps, titulo_eleitor,
          zona_titulo, secao_titulo, data_admissao, funcao, salario, pis, nacionalidade, naturalidade_id,
          uf, nome_mae, nome_pai, estado_civil, telefone, conjuge, cep, endereco, numero_end, bairro, tipo_contrato,
          created_at, updated_at, filhos, centro_custo_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
          $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31)
        RETURNING id
      `;

      const values = [
        data.nome, data.cpf, data.rg, data.nascimento, data.ctps, data.serie_ctps, data.uf_ctps, data.titulo_eleitor,
        data.zona_titulo, data.secao_titulo, data.data_admissao, data.funcao, data.salario, data.pis, data.nacionalidade,
        data.naturalidade_id, data.uf, data.nome_mae, data.nome_pai, data.estado_civil, data.telefone, data.conjuge,
        data.cep, data.endereco, data.numero_end, data.bairro, data.tipo_contrato, date(Date.now()).iso, date(Date.now()).iso,
        data.filhos, data.centro_custo_id
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
				SELECT * FROM funcionarios 
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
