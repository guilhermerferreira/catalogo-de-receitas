import * as SQLite from 'expo-sqlite';


export async function conectarBanco() {
    const db = await SQLite.openDatabaseAsync('pitada.db');

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
            nome VARCHAR(100) NOT NULL,
            categoria VARCHAR(60) NOT NULL,
            tempo INTEGER NOT NULL,
            dificuldade VARCHAR(20) NOT NULL,
            ingreditentes TEXT NOT NULL,
            modo_de_preparo TEXT NOT NULL
        );
    `);

    return db;
}