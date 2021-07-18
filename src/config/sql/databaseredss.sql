-- PASSO 1 - CRIAÇÃO DO BANCO DE DADOS
CREATE DATABASE "redss";

-- PASSO 2 - CRIAÇÃO DAS TABELAS DO BANCO DE DADOS
CREATE TABLE "funcionarios" (
  "id" SERIAL PRIMARY KEY,
  "first_nome" text NOT NULL,
  "sobrenome" text NOT NULL,
  "cpf" text NOT NULL,
  "rg" text NOT NULL,
  "nascimento" timestamp NOT NULL,
  "ctps" text NOT NULL,
  "serie_ctps" text NOT NULL,
  "uf_ctps" text NOT NULL,
  "titulo_eleitor" text NOT NULL,
  "zona_titulo" text NOT NULL,
  "secao_titulo" text NOT NULL,
  "data_admissao" timestamp NOT NULL,
  "funcao" text NOT NULL,
  "salario" int NOT NULL,
  "pis" text NOT NULL,
  "nacionalidade" text NOT NULL,
  "naturalidade_id" text NOT NULL,
  "uf" text NOT NULL,
  "centro_custo_id" int,
  "nome_mae" text NOT NULL,
  "nome_pai" text,
  "estado_civil" text NOT NULL,
  "telefone" text[] NOT NULL,
  "conjuge" text,
  "cep" text,
  "endereco" text,
  "numero_end" text NOT NULL,
  "bairro" text,
  "cidade_end" text,
  "uf_end" text,
  "tipo_contrato" text,
  "dados_conta" text[],
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "dependente_func" (
  "id" SERIAL PRIMARY KEY,
  "nome" text NOT NULL,
  "cpf" text NOT NULL,
  "nascimento" timestamp NOT NULL,
  "funcionario_id" int
);

CREATE TABLE "fornecedor" (
  "id" SERIAL PRIMARY KEY,
  "pj_pf" text NOT NULL,
  "nome_razao" text NOT NULL,
  "nome_fantasia" int,
  "cnpj_cpf" int,
  "ie" text,
  "i_municipal" text,
  "email" text,
  "telefone" text[] NOT NULL,
  "whatsapp" text,
  "celular" text[],
  "contato" text,
  "endereco" text,
  "numero_end" text NOT NULL,
  "bairro" text,
  "cidade_end" text,
  "uf_end" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "folha_pgto" (
  "id" SERIAL PRIMARY KEY,
  "nome" text NOT NULL,
  "centro_custo_id" int,
  "ordem_pagamento_id" int
);

CREATE TABLE "recebimentos" (
  "id" SERIAL PRIMARY KEY,
  "nome_aporte" text NOT NULL,
  "data_pgto" timestamp NOT NULL,
  "descricao" text,
  "documento" text,
  "centro_custo_id" int,
  "valor" int
);

CREATE TABLE "centro_custo" (
  "id" SERIAL PRIMARY KEY,
  "nome" text NOT NULL,
  "cei" text NOT NULL,
  "cnpj_cpf" text NOT NULL,
  "cep" text,
  "endereco" text,
  "numero_end" text NOT NULL,
  "bairro" text,
  "pais" text NOT NULL,
  "uf" text NOT NULL,
  "cidade" text NOT NULL,
  "data_contrato" timestamp NOT NULL,
  "data_fim_contrato" timestamp NOT NULL,
  "valor_contrato" int NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "ordem_pagamento" (
  "id" SERIAL PRIMARY KEY,
  "vencimento" timestamp NOT NULL,
  "dt_pgto" timestamp,
  "centro_custo_id" int NOT NULL,
  "fornecedor_id" int NOT NULL,
  "descricao" text,
  "competencia" text NOT NULL,
  "documento" text,
  "status" text,
  "valor" int NOT NULL
);

CREATE TABLE "saldo" (
  "id" SERIAL PRIMARY KEY,
  "entrada" int,
  "saida" int,
  "total" int
);

-- PASSO 3 - CRIAR OS RELACIONAMENTOS
ALTER TABLE "funcionarios" ADD FOREIGN KEY ("centro_custo_id") REFERENCES "centro_custo" ("id");

ALTER TABLE "dependente_func" ADD FOREIGN KEY ("funcionario_id") REFERENCES "funcionarios" ("id");

ALTER TABLE "folha_pgto" ADD FOREIGN KEY ("centro_custo_id") REFERENCES "centro_custo" ("id");

ALTER TABLE "folha_pgto" ADD FOREIGN KEY ("ordem_pagamento_id") REFERENCES "ordem_pagamento" ("id");

ALTER TABLE "recebimentos" ADD FOREIGN KEY ("centro_custo_id") REFERENCES "centro_custo" ("id");

ALTER TABLE "ordem_pagamento" ADD FOREIGN KEY ("id") REFERENCES "centro_custo" ("id");

ALTER TABLE "ordem_pagamento" ADD FOREIGN KEY ("fornecedor_id") REFERENCES "fornecedor" ("id");

ALTER TABLE "saldo" ADD FOREIGN KEY ("entrada") REFERENCES "recebimentos" ("id");

ALTER TABLE "saldo" ADD FOREIGN KEY ("saida") REFERENCES "ordem_pagamento" ("id");


/* PASSO 4: Criar Procedure para atualização automática do campo "updated_at" */

/* Passo 4.1 ==== CRIAÇÃO DA PROCEDURE ==== */
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$function$

/* PASSO 5: Aplicar a Trigger nas tabelas seleionadas */

/* ==== CONFIGURAÇÃO DA TRIGGER  ==== */

/* Trigger para tabela centro_custo */
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON centro_custo
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

/* Trigger para tabela funcionarios */
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON funcionarios
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

/* Trigger para tabela fornecedores */
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON fornecedor
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

/* PASSO 6: ==== TABELA PARA CONTROLE DA SESSÃO DO USUÁRIO */
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" 
ADD CONSTRAINT "session_pkey" 
PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;