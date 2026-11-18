import * as SQLite from 'expo-sqlite';

export async function conectarBanco() {
  // Abre ou cria o arquivo local do SQLite no aparelho.
  const db = await SQLite.openDatabaseAsync('pitada.db');

  // Habilita o relacionamento entre usuários e receitas.
  await db.execAsync('PRAGMA foreign_keys = ON;');

  /*  CRIA TABELA DE USUARIOS */
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            senha TEXT  NOT NULL   
        );    
    `);

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS receitas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER NOT NULL,
            nome VARCHAR(100) NOT NULL,
            categoria VARCHAR(60) NOT NULL,
            tempo_preparo INTEGER NOT NULL DEFAULT 0,
            ingredientes TEXT NOT NULL,
            modo_de_preparo TEXT NOT NULL,
            favorita INTEGER NOT NULL DEFAULT 0,

            FOREIGN KEY(usuario_id)
                REFERENCES usuarios(id)
                ON DELETE CASCADE
        );
    `);

  // Verifica a estrutura existente antes de executar migrações.
  const colunas = await db.getAllAsync('PRAGMA table_info(receitas)');
  const nomesDasColunas = new Set(colunas.map((coluna) => coluna.name));

  if (!nomesDasColunas.has('tempo_preparo')) {
    // Preserva bancos antigos adicionando somente a coluna ausente.
    await db.execAsync(
      `ALTER TABLE receitas
       ADD COLUMN tempo_preparo INTEGER NOT NULL DEFAULT 0;`,
    );
  }

  if (!nomesDasColunas.has('favorita')) {
    await db.execAsync(
      'ALTER TABLE receitas ADD COLUMN favorita INTEGER NOT NULL DEFAULT 0;',
    );
  }

  return db;
}
