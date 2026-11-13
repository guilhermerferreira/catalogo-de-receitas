import * as SQLite from 'expo-sqlite';


export async function conectarBanco() {
    const db = await SQLite.openDatabaseAsync('pitada.db');

    /*  CRIA TABELA DE USUARIOS */
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR (100) NOT NULL UNIQUE,
            senha_hash VARCHAR (30) NOT NULL   
        );    
    `);
    return db;
}