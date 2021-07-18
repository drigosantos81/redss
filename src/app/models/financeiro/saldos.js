const db = require('../../../config/db'); // ../../config/db
const { date } = require('../../../libs/utils');

module.exports = {
  // Retorna
  allDespesasAberto() {
    try {
      return db.query(`
        SELECT SUM(valor)
        FROM ordem_pagamento
        WHERE status = 'Vencido'
      `);

    } catch (error) {
      console.log(error);
    }
  },

  totalRecebimentos() {
    try {
      return db.query(`
        SELECT SUM(valor)
        FROM recebimentos
      `);

    } catch (error) {
      console.log(error);
    }
  },

  totalPago() {
    try {
      return db.query(`
        SELECT SUM(valor)
        FROM ordem_pagamento
        WHERE status = 'Pago'
      `);

    } catch (error) {
      console.log(error);
    }
  },

  // Pesquisa Saldos
  calculaSaldo() {
		try {
			const { entradas, saidas, saldo } = params;

			let query = ``,
				filterQuery = `WHERE`

			if (chef) {
				filterQuery = `${filterQuery} recipes.chef_id = ${chef}
					AND`
			}

			filterQuery = `${filterQuery} recipes.title ILIKE '%${filter}%'
				OR chefs.name ILIKE '%${filter}%'`

			let total_query = `(
				SELECT count(*) FROM recipes
				${filterQuery}
			) AS total`
			
			query = `
				SELECT recipes.*, ${total_query}, chefs.name AS chef_name
				FROM recipes
				INNER JOIN chefs ON (chefs.id = recipes.chef_id)
				${filterQuery}
				GROUP BY recipes.id, chefs.name
				ORDER BY recipes.updated_at DESC
			`			
			return db.query(query);

		} catch (error) {
			console.log(error);
		}
	},

  // Pesquisa
	search(params) {
		try {
			const { filter, chef } = params;

			let query = ``,
				filterQuery = `WHERE`

			if (chef) {
				filterQuery = `${filterQuery} recipes.chef_id = ${chef}
					AND`
			}

			filterQuery = `${filterQuery} recipes.title ILIKE '%${filter}%'
				OR chefs.name ILIKE '%${filter}%'`

			let total_query = `(
				SELECT count(*) FROM recipes
				${filterQuery}
			) AS total`
			
			query = `
				SELECT recipes.*, ${total_query}, chefs.name AS chef_name
				FROM recipes
				INNER JOIN chefs ON (chefs.id = recipes.chef_id)
				${filterQuery}
				GROUP BY recipes.id, chefs.name
				ORDER BY recipes.updated_at DESC
			`			
			return db.query(query);

		} catch (error) {
			console.log(error);
		}
	}

}