const db = require('../../../config/db');
const { date } = require('../../../libs/utils');

module.exports = {

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
        ORDER BY documento ASC
      `);
  } catch (error) {
    console.log(error);
    }
  }

}