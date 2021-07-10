-- PASSO 1 - CRIAÇÃO DO BANCO DE DADOS
CREATE DATABASE "redss";

-- PASSO 2 - CRIAÇÃO DAS TABELAS DO BANCO DE DADOS
CREATE TABLE "funcinoarios" (
  "id" SERIAL PRIMARY KEY,
  "nome" text NOT NULL,
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
  "nome_mae" text NOT NULL,
  "nome_pai" text,
  "estado_civil" text NOT NULL,
  "telefone" text[] NOT NULL,
  "conjuge" int,
  "cep" text NOT NULL,
  "endereco" text,
  "numero_end" text NOT NULL,
  "bairro" text,
  "tipo_contrato" text,
  "filhos" text[],
  "nasc_filho" timestamp,
  "centro_custo_id" int,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "fornecedor" (
  "id" SERIAL PRIMARY KEY,
  "nome" int NOT NULL,
  "cnpj" int,
  "centro_custo_id" int,
  "telefone" text[] NOT NULL,
  "email" text,
  "created_at" timestamp DEFAULT (now())
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
  "competencia" datetime NOT NULL,
  "descricao" text,
  "centro_custo_id" int,
  "valor" float
);

CREATE TABLE "centro_custo" (
  "id" SERIAL PRIMARY KEY,
  "nome" text NOT NULL,
  "cei" text NOT NULL,
  "cnpj_cpf" text NOT NULL,
  "cep" text,
  "endereco" text,
  "numero_end" text NOT NULL,
  "bairro" text
);

CREATE TABLE "ordem_pagamento" (
  "id" SERIAL PRIMARY KEY,
  "fornecedor_id" int,
  "competencia" datetime NOT NULL,
  "descricao" text,
  "valor" int,
  "status" boolean
);

-- PASSO 3 - CRIAR OS RELACIONAMENTOS
ALTER TABLE "funcinoarios" ADD FOREIGN KEY ("centro_custo_id") REFERENCES "centro_custo" ("id");

ALTER TABLE "fornecedor" ADD FOREIGN KEY ("centro_custo_id") REFERENCES "centro_custo" ("id");

ALTER TABLE "folha_pgto" ADD FOREIGN KEY ("centro_custo_id") REFERENCES "centro_custo" ("id");

ALTER TABLE "folha_pgto" ADD FOREIGN KEY ("ordem_pagamento_id") REFERENCES "ordem_pagamento" ("id");

ALTER TABLE "recebimentos" ADD FOREIGN KEY ("centro_custo_id") REFERENCES "centro_custo" ("id");

ALTER TABLE "ordem_pagamento" ADD FOREIGN KEY ("fornecedor_id") REFERENCES "fornecedor" ("id");


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