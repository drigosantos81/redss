const db = require('../../config/db');
const { date } = require('../../libs/utils');

module.exports = {
  // Retorna os dados de todos funcionários
  allJobs() {
    try {
      return db.query(`
        SELECT * FROM job
      `);

    } catch (error) {
      console.log(error);
    }
  },
  // Insere os dados de uma nova função
  postJob(data) {
    try {
      const query = `
        INSERT INTO job (job_name, salary)
        VALUES ($1, $2)
        RETURNING id
      `;

      const values = [
        data.job_name, data.salary
      ]

      return db.query(query, values);
    } catch (error) {
      console.log(error);
    }
  },
  // Retorna os dados de uma função a partir de um ID específico
  findJobId(id) {
    try {
      return db.query(`
        SElECT * FROM job
        WHERE id = $1
      `, [id]
      );

    } catch (error) {
      console.log(error);
    }
  }

}