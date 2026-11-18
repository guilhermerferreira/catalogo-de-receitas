export async function criar(db, receita) {
  return db.runAsync(
    `INSERT INTO receitas
            (
              nome,
              usuario_id,
              categoria,
              tempo_preparo,
              ingredientes,
              modo_de_preparo,
              favorita
            )
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
    receita.nome,
    receita.usuario_id,
    receita.categoria,
    receita.tempoPreparo,
    receita.ingredientes,
    receita.modoDePreparo,
    receita.favorita ? 1 : 0,
  );
}

export async function atualizar(db, receita) {
  return db.runAsync(
    `UPDATE receitas
         SET nome = ?,
             categoria = ?,
             tempo_preparo = ?,
             ingredientes = ?,
             modo_de_preparo = ?
         WHERE id = ? AND usuario_id = ?`,
    receita.nome,
    receita.categoria,
    receita.tempoPreparo,
    receita.ingredientes,
    receita.modoDePreparo,
    receita.id,
    receita.usuario_id,
  );
}

export async function listar(db, usuarioId) {
  return db.getAllAsync(
    'SELECT * FROM receitas WHERE usuario_id = ? ORDER BY nome COLLATE NOCASE',
    usuarioId,
  );
}

export async function listarCatalogo(db) {
  return db.getAllAsync('SELECT * FROM receitas ORDER BY nome COLLATE NOCASE');
}

export async function buscarPorId(db, id) {
  return db.getFirstAsync('SELECT * FROM receitas WHERE id = ?', id);
}

export async function definirFavorita(db, id, favorita) {
  return db.runAsync(
    'UPDATE receitas SET favorita = ? WHERE id = ?',
    favorita ? 1 : 0,
    id,
  );
}

export async function excluir(db, id, usuarioId) {
  return db.runAsync(
    'DELETE FROM receitas WHERE id = ? AND usuario_id = ?',
    id,
    usuarioId,
  );
}
