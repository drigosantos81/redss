const db = require('../../config/db');
const { date } = require('../../libs/utils');

module.exports = {
  // Retorna os dados de todos Fornecedores
  all() {
    try {
      return db.query(`
        SELECT * FROM fornecedor
        ORDER BY nome_fantasia ASC
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
          contato, endereco, numero_end, bairro, cidade_end, uf_end, created_at, updated_at, cep
          )
          VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16, $17, $18, $19
          ) RETURNING id
      `;

      const values = [
        data.pj_pf, data.nome_razao, data.nome_fantasia, data.ie, data.cnpj_cpf, data.i_municipal, data.email, data.telefone, data.whatsapp, data.celular,
        data.contato, data.endereco, data.numero_end, data.bairro, data.cidade_end, data.uf_end, date(Date.now()).iso, date(Date.now()).iso, data.cep
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
				UPDATE fornecedor SET
				pj_pf=($1), nome_razao=($2), nome_fantasia=($3), cnpj_cpf=($4), ie=($5), i_municipal=($6), email=($7), telefone=($8), whatsapp=($9), celular=($10),
        contato=($11), numero_end=($12), bairro=($13), cidade_end=($14), uf_end=($15), cep=($16)
				WHERE id = $17
			`);
      
			const values = [
				data.pj_pf, data.nome_razao, data.nome_fantasia, data.cnpj_cpf, data.ie, data.i_municipal, data.email, data.telefone, data.whatsapp, data.celular,
        data.contato, data.numero_end, data.bairro, data.cidade_end, data.uf_end, data.cep,
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
