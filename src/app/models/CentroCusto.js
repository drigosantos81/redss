const db = require('../../config/db');
const { date } = require('../../libs/utils');

module.exports = {
  // Retorna os dados de todos Clientes / Centro de Custo
  all() {
    try {
      return db.query(`
        SELECT * FROM centro_custo
      `);

    } catch (error) {
      console.log(error);
    }
  },

  // Comando POST para um novo Cliente / Centro de Custo
  post(data) {
    try {
      const query = `
        INSERT INTO centro_custo (nome_setor, cei, cnpj_cpf, cep, endereco, numero_end, bairro, pais, uf,
          cidade, data_contrato, data_fim_contrato, created_at, updated_at, valor_contrato
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING id
      `;

      const values = [
        data.nome_setor, data.cei, data.cnpj_cpf, data.cep, data.endereco, data.numero_end, data.bairro, data.pais, data.uf,
        data.cidade, data.data_contrato, data.data_fim_contrato, date(Date.now()).iso, date(Date.now()).iso, data.valor_contrato
      ]

      return db.query(query, values);

    } catch (error) {
      console.log(error);
    }	
  },

  // Retorna os dados de um Cliente / Centro de Custo
	find(id) {
		try {
			return db.query(`
				SELECT * FROM centro_custo 
				WHERE id = $1
			`, [id]
			);

		} catch (error) {
			console.log(error);
		}
  },

  // Retorna os Clientes / Centro de Custo no Selector
  clienteSelector() {
    try {
      return db.query(`
        SELECT nome_setor, id FROM centro_custo
        ORDER BY nome_setor ASC
      `);

    } catch (error) {
      console.log(error);
    }
  },

  updateCliente(data) {
		try {
			const query = (`
				UPDATE centro_custo SET
				nome_setor=($1), cei=($2), cnpj_cpf=($3), cep=($4), endereco=($5), numero_end=($6), bairro=($7), pais=($8), uf=($9),
        cidade=($10), data_contrato=($11), data_fim_contrato=($12), valor_contrato=($13)
				WHERE id = $14
			`);
      // created_at, updated_at
			const values = [
				data.nome_setor, data.cei, data.cnpj_cpf, data.cep, data.endereco, data.numero_end, data.bairro, data.pais, data.uf,
        data.cidade, data.data_contrato, data.data_fim_contrato, data.valor_contrato,
        data.id
			]

			return db.query(query, values);

		} catch (error) {
			console.log(error);
		}
	},

  // Delete de um Centro de Custo
  delete(id) {
    try {
      return db.query(`
        DELETE FROM centro_custo
        WHERE id = $1
      `, [id]);
      
    } catch (error) {
      console.log(error);
    }
  }

}
