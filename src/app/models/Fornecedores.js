const db = require('../../config/db');
const { date } = require('../../libs/utils');

module.exports = {
  // Retorna os dados de todos Fornecedores
  all() {
    try {
      return db.query(`
        SELECT * FROM fornecedor
      `);

    } catch (error) {
      console.log(error);
    }
  },

  // POST para um novo Fornecedor
  post(data) {
    try {
      const query = `
        INSERT INTO fornecedor (
          pj_pf, nome_razao, nome_fantasia, cnpj_cpf, ie, i_municipal, email, telefone, whatsapp, celular,
          contato, endereco, numero_end, bairro, cidade_end, uf_end, created_at, updated_at)
          VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10',
          $11, $12, $13, $14, $15, $16, $17, $18)
          RETURNING id
      `;

      const values = [
        data.pj_pf, data.nome_razao, data.nome_fantasia, data.ie, data.i_municipal, data.email, data.telefone, data.whatsapp, data.celular,
        data.contato, data.endereco, data.numero_end, data.bairro, data.cidade_end, data.uf_end, date(Date.now()).iso, date(Date.now()).iso
      ]

      return db.query(query, values);

    } catch (error) {
      console.log(error);
    }	
  },

  // Retorna os dados de um Fornecedor
	findFornecedor(id) {
		try {
			return db.query(`
				SELECT * FROM fornecedor 
				WHERE id = $1
			`, [id]
			);

		} catch (error) {
			console.log(error);
		}
  },

  // Retorna os Fornecedores no Selector
  fornecedorSelector() {
    try {
      return db.query(`
        SELECT nome_razao, id FROM fornecedor
        ORDER BY nome_razao ASC
      `);

    } catch (error) {
      console.log(error);
    }
  },
  // PUT de atualzação de um Fornecedor
  updateFornecedor(data) {
		try {
			const query = (`
				UPDATE centro_custo SET
				nome=($1), cei=($2), cnpj_cpf=($3), cep=($4), endereco=($5), numero_end=($6), bairro=($7), pais=($8), uf=($9),
        cidade=($10), data_contrato=($11), data_fim_contrato=($12), valor_contrato=($13)
				WHERE id = $14
			`);
      // created_at, updated_at
			const values = [
				data.nome, data.cei, data.cnpj_cpf, data.cep, data.endereco, data.numero_end, data.bairro, data.pais, data.uf,
        data.cidade, data.data_contrato, data.data_fim_contrato, data.valor_contrato,
        data.id
			]

			return db.query(query, values);

		} catch (error) {
			console.log(error);
		}
	},

  // DELETE de um Fornecedor
  delete(id) {
    try {
      return db.query(`
        DELETE FROM fornecedor
        WHERE id = $1
      `, [id]);
      
    } catch (error) {
      console.log(error);
    }
  }

}
