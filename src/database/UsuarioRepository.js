export async function cadastrar(db, usuario) {
    return await db.runAsync(
        `INSERT INTO usuarios (nome, email, senha_hash)
         VALUES (?, ?, ?)`,
         [usuario.nome, usuario.email, usuario.senhaHash]
    )
}

export async function buscarEmail(db, email) {
    return await db.getFirstAsync (
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
    )
}