export async function cadastrar(db, usuario) {
  return await db.runAsync(
    `INSERT INTO usuarios (nome, email, senha)
         VALUES (?, ?, ?)`,
    [usuario.nome, usuario.email, usuario.senha],
  );
}

export async function buscarEmail(db, email) {
  return await db.getFirstAsync('SELECT * FROM usuarios WHERE email = ?', [
    email,
  ]);
}

export async function atualizarPerfil(db, usuario) {
  return db.runAsync(
    'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
    usuario.nome,
    usuario.email,
    usuario.id,
  );
}
