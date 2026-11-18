// Repository contém somente comandos SQL e não conhece componentes visuais.
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
    `SELECT receitas.*,
            EXISTS(
              SELECT 1 FROM favoritos
               WHERE favoritos.receita_id = receitas.id
                 AND favoritos.usuario_id = ?
            ) AS favorita
       FROM receitas
      WHERE receitas.usuario_id = ?
      ORDER BY receitas.nome COLLATE NOCASE`,
    usuarioId,
    usuarioId,
  );
}

export async function listarCatalogo(db, usuarioId) {
  return db.getAllAsync(
    `SELECT receitas.*,
            EXISTS(
              SELECT 1 FROM favoritos
               WHERE favoritos.receita_id = receitas.id
                 AND favoritos.usuario_id = ?
            ) AS favorita
       FROM receitas
      ORDER BY receitas.nome COLLATE NOCASE`,
    usuarioId,
  );
}

export async function buscarPorId(db, id, usuarioId) {
  return db.getFirstAsync(
    `SELECT receitas.*,
            EXISTS(
              SELECT 1 FROM favoritos
               WHERE favoritos.receita_id = receitas.id
                 AND favoritos.usuario_id = ?
            ) AS favorita
       FROM receitas
      WHERE receitas.id = ?`,
    usuarioId,
    id,
  );
}

export async function definirFavorita(db, id, usuarioId, favorita) {
  if (favorita) {
    return db.runAsync(
      'INSERT OR IGNORE INTO favoritos (usuario_id, receita_id) VALUES (?, ?)',
      usuarioId,
      id,
    );
  }
  return db.runAsync(
    'DELETE FROM favoritos WHERE usuario_id = ? AND receita_id = ?',
    usuarioId,
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
