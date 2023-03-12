const Funcionarios = require('../../../models/Funcionarios');
const Dependentes = require('../../../models/Dependentes');
const Jobs = require('../../../models/Jobs');
const { formatPrice } = require('../../../../libs/utils');

module.exports = {
  // EXIBE TODAS AS FUNÇÕES
  async index(req, res) {
    try {
      // Retorna os dados de todas as Funções
      let results = await Jobs.allJobs();
      const jobs = results.rows;

      const formatPromise = jobs.map(async job => {
        job.salary = formatPrice(job.salary);

        return job;
      });
      const allJobs = await Promise.all(formatPromise);

      return res.render('cadastros/funcionarios/jobs/index', { jobs: allJobs });
      
    } catch (error) {
      console.log(error);
    }
  },

  // EXIBE PÁGINA DA LISTA DAS FUNÇÕES CADASTRADAS
  async formJob(req, res) {
    try {
      return res.render('cadastros/funcionarios/jobs/form-job');

    } catch (error) {
      console.log(error);
    }
  },

  async postJob(req, res) {
    try {
      const keys = Object.keys(req.body);

      for (key of keys) {
        if (req.body[key] == "") {
          return res.send("Por favor, preencha todos os campos.");
        }
      }

      req.body.salary = req.body.salary.replace(/\D/g,"");

      let results = await Jobs.postJob(req.body);
      const jobId = results.rows[0].id;

      return res.redirect(`/cadastros/funcionarios/jobs`/*/${jobId} */);

    } catch (error) {
      console.log(error);
    }
  },

  async findJob(req, res) {
    try {
      let results = await Jobs.findJobId(req.params.id);
      const job = results.rows[0];

      // req.body.salary = req.body.salary.replace(/\D/g,"");
      job.salary = formatPrice(job.salary);
      console.log('JOB: ', job);

      return res.render('cadastros/funcionarios/jobs/show-job', { job });

    } catch (error) {
      console.log(error);
    }
  }

}