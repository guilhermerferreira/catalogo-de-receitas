export async function cadastrar(db, usuario) {
    return await db.runAsync(
        `INSERT INTO usuarios (nome, email, senha)
         VALUES (?, ?, ?)`,
         [usuario.nome, usuario.email, usuario.senha]
    );
}

export async function buscarEmail(db, email) {
    return await db.getFirstAsync (
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
    );
}

export async function listarTodos(db) {
    return await db.getAllAsync(
        'SELECT * FROM usuarios'
    );
}