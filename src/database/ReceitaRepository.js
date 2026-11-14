export async function criar(db, receita) {
    return await db.runAsync(`
        INSERT INTO receitas( nome, categoria, tempo, dificuldade, ingredientes, modo_de_preparo)
        VALUES (?, ?, ?, ?, ?, ? )`,
        [
            receita.nome, 
            receita.categoria, 
            receita.tempo, 
            receita.dificuldade, 
            receita.ingredientes, 
            receita.modoDePreparo
        ]
    ); 
}
