const db = require('../../config/db');
const { date } = require('../../libs/utils');

module.exports = {
  // Retorna os dados de todos funcionários
  all() {
    try {
      return db.query(`
        SELECT funcionarios.*, centro_custo.nome AS SETOR FROM funcionarios
        LEFT JOIN centro_custo ON (funcionarios.centro_custo_id = centro_custo.id)
        ORDER BY setor ASC, funcionarios.data_admissao DESC
      `);

    } catch (error) {
      console.log(error);
    }
  },

  // Comando POST para um novo funcinário
  post(data) {
    try {
      const query = `
        INSERT INTO funcionarios (
          first_nome, sobrenome, cpf, rg, nascimento, ctps, serie_ctps, uf_ctps, titulo_eleitor, zona_titulo, secao_titulo,
          data_admissao, funcao, salario, pis, nacionalidade, naturalidade_id, uf, nome_mae, nome_pai, estado_civil,
          telefone, conjuge, cep, endereco, numero_end, bairro, tipo_contrato, centro_custo_id, created_at, updated_at,
          cidade_end, uf_end, dados_conta          
        )        
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
          $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
          $31, $32, $33, $34
          )
        RETURNING id
      `;

      const values = [
        data.first_nome, data.sobrenome, data.cpf, data.rg, data.nascimento, data.ctps, data.serie_ctps, data.uf_ctps, data.titulo_eleitor, data.zona_titulo, data.secao_titulo,
        data.data_admissao, data.funcao, data.salario, data.pis, data.nacionalidade, data.naturalidade_id, data.uf, data.nome_mae, data.nome_pai, data.estado_civil,
        data.telefone, data.conjuge, data.cep, data.endereco, data.numero_end, data.bairro, data.tipo_contrato, data.centro_custo_id, date(Date.now()).iso, date(Date.now()).iso,
        data.cidade_end, data.uf_end, data.dados_conta
      ]

      return db.query(query, values);
    } catch (error) {
      console.log(error);
    }	
  },

  // Retorna os dados de um Funcionário com nome do Centro de Custo e dependentes
	find(id) {
		try {
			return db.query(`
      SELECT funcionarios.*, centro_custo.nome AS CENCUSTO FROM funcionarios
      LEFT JOIN centro_custo ON (funcionarios.centro_custo_id = centro_custo.id)
      WHERE funcionarios.id = $1
			`, [id]
			);

		} catch (error) {
			console.log(error);
		}
  },

  // Atualiza um Funcionário
  updateFuncionario(data) {
		try {
			const query = (`
				UPDATE funcionarios SET
				sobrenome=($1), cpf=($2), rg=($3), nascimento=($4), ctps=($5), serie_ctps=($6), uf_ctps=($7), titulo_eleitor=($8),
        zona_titulo=($9), secao_titulo=($10), data_admissao=($11), funcao=($12), salario=($13), pis=($14), nacionalidade=($15), naturalidade_id=($16),
        uf=($17), nome_mae=($18), nome_pai=($19), estado_civil=($20), telefone=($21), conjuge=($22), cep=($23), endereco=($24), numero_end=($25), bairro=($26), tipo_contrato=($27),
        centro_custo_id=($28), dados_conta=($29), first_nome=($30)
        WHERE id = $31
			`);
      // created_at, updated_at
			const values = [
				data.sobrenome, data.cpf, data.rg, data.nascimento, data.ctps, data.serie_ctps, data.uf_ctps, data.titulo_eleitor,
        data.zona_titulo, data.secao_titulo, data.data_admissao, data.funcao, data.salario, data.pis, data.nacionalidade, data.naturalidade_id,
        data.uf, data.nome_mae, data.nome_pai, data.estado_civil, data.telefone, data.conjuge, data.cep, data.endereco, data.numero_end, data.bairro, data.tipo_contrato,
        data.centro_custo_id, data.dados_conta, data.first_nome,
        data.id
			]

			return db.query(query, values);

		} catch (error) {
			console.log(error);
		}
	},

  // Retorna os dados de um Funcionário
  findFuncionario(id) {
    try {
			return db.query(`
        SELECT id, first_nome FROM funcionarios
        WHERE id = $1
			`, [id]
			);

		} catch (error) {
			console.log(error);
		}
  },

  //  Deleta um Funcionário
  delete(id) {
    try {
      return db.query(`
        DELETE FROM funcionarios
        WHERE id = $1
      `, [id]);

    } catch (error) {
      console.log(error);
    }
  },

  dependentePorFunc(id) {
    try {
      return db.query(`
        SELECT dependente_func.* FROM dependente_func
        WHERE dependente_func.funcionario_id = $1 
      `, [id]);

    } catch (error) {
      console.log(error);
    }
  },

}