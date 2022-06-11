const db = require('../../../config/db');
const { date } = require('../../../libs/utils');

module.exports = {
  allExpense() {
    try {
      return db.query(`
        SELECT despesas.*,
          fornecedor.nome_fantasia,
          centro_custo.nome_setor,
          documento.nome
        FROM despesas
        LEFT JOIN fornecedor ON (fornecedor.id = despesas.id_fornecedor)
        LEFT JOIN centro_custo ON (centro_custo.id = despesas.id_centro_custo)
        LEFT JOIN documento ON (documento.id = despesas.id_documento)
        WHERE status_pgto IN ('EM ABERTO', 'VENCIDO')
        ORDER BY data_pagamento ASC, status_pgto DESC
      `);
    } catch (error) {
      console.log(error);
    }
  },
  post(data) {
    try {
      const query = `
        INSERT INTO despesas (
          id_documento, data_emissao, cpf_cnpj, data_vencimento, categoria, xml,
          valor, numero_doc, data_pagamento, id_centro_custo, id_classe_contabil,
          status_pgto, created_at, updated_at, id_fornecedor
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
        )
        RETURNING id
      `;

      const values = [
        data.id_documento, data.data_emissao, data.cpf_cnpj, data.data_vencimento,
        data.categoria, data.xml, data.valor, data.numero_doc, data.data_pagamento, data.id_centro_custo,
        data.id_classe_contabil, data.status_pgto, date(Date.now()).iso, date(Date.now()).iso, data.id_fornecedor
      ]

      return db.query(query, values);
    } catch (error) {
      console.log(error);
    }
  },

  // Retorna os dados de uma Despesa
	findExpense(id) {
		try {
			return db.query(`
        SELECT despesas.*,
          fornecedor.nome_fantasia,
          centro_custo.nome_setor,
          documento.nome,
          classe_contabil.nome_contabil
        FROM despesas
        LEFT JOIN fornecedor ON (fornecedor.id = despesas.id_fornecedor)
        LEFT JOIN centro_custo ON (centro_custo.id = despesas.id_centro_custo)
        LEFT JOIN documento ON (documento.id = despesas.id_documento)
        LEFT JOIN classe_contabil ON (classe_contabil.id = despesas.id_classe_contabil)
        WHERE despesas.id = $1
			`, [id]
			);

		} catch (error) {
			console.log(error);
		}
  },

  providerSelector() {
    try {
      return db.query(`
        SELECT nome_fantasia, id FROM fornecedor
        ORDER BY nome_fantasia ASC
      `);
  } catch (error) {
    console.log(error);
    }
  },

  docSelector() {
    try {
      return db.query(`
        SELECT nome, id FROM documento
        ORDER BY nome ASC
      `);
  } catch (error) {
    console.log(error);
    }
  },
  
  accountingSelector() {
    try {
      return db.query(`
        SELECT nome, id FROM classe_contabil
        ORDER BY nome ASC
      `);
  } catch (error) {
    console.log(error);
    }
  },

  costCenterSelector() {
    try {
      return db.query(`
        SELECT nome_setor, id FROM centro_custo
        ORDER BY nome_setor ASC
      `);
  } catch (error) {
    console.log(error);
    }
  }

}