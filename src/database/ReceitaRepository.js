export async function criar(db, receita) {
    return await db.runAsync(`
        INSERT INTO receitas( nome, usuario_id, categoria, ingredientes, modo_de_preparo)
        VALUES (?, ?, ?, ?, ?)`,
        [
            receita.nome, 
            receita.usuario_id,
            receita.categoria, 
            receita.ingredientes, 
            receita.modoDePreparo
        ]
    ); 
}

export async function listar(db, usuarioId) {
    return await db.getAllAsync(`
        SELECT * FROM receitas 
        WHERE usuario_id = ?
        ORDER BY nome    
    `, [usuarioId]
    );
}