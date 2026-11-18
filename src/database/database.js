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

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS favoritos (
            usuario_id INTEGER NOT NULL,
            receita_id INTEGER NOT NULL,
            PRIMARY KEY (usuario_id, receita_id),
            FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
            FOREIGN KEY(receita_id) REFERENCES receitas(id) ON DELETE CASCADE
        );
    `);

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS migracoes (
            nome TEXT PRIMARY KEY
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

  if (!nomesDasColunas.has('imagem')) {
    await db.execAsync('ALTER TABLE receitas ADD COLUMN imagem TEXT;');
  }

  const migracaoFavoritos = await db.getFirstAsync(
    'SELECT nome FROM migracoes WHERE nome = ?',
    'favoritos_por_usuario',
  );

  if (!migracaoFavoritos) {
    // Preserva uma única vez os favoritos antigos e passa a separá-los por usuário.
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT OR IGNORE INTO favoritos (usuario_id, receita_id)
         SELECT usuarios.id, receitas.id
           FROM usuarios
           CROSS JOIN receitas
          WHERE receitas.favorita = 1`,
      );
      await db.runAsync(
        'INSERT INTO migracoes (nome) VALUES (?)',
        'favoritos_por_usuario',
      );
    });
  }

  // Mantem um pequeno catalogo inicial disponivel para todos os usuarios.
  const migracaoReceitasIniciais = await db.getFirstAsync(
    'SELECT nome FROM migracoes WHERE nome = ?',
    'receitas_iniciais_brasileiras',
  );

  if (!migracaoReceitasIniciais) {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT OR IGNORE INTO usuarios (nome, email, senha)
         VALUES (?, ?, ?)`,
        'Cozinha Pitada',
        'catalogo@pitada.local',
        'conta-interna-do-catalogo',
      );
      const autor = await db.getFirstAsync(
        'SELECT id FROM usuarios WHERE email = ?',
        'catalogo@pitada.local',
      );

      const receitasIniciais = [
        {
          nome: 'Coxinha tradicional',
          categoria: 'Salgado',
          tempo: 90,
          imagem: 'coxinha',
          ingredientes: [
            '500 g de peito de frango cozido e desfiado',
            '1 litro do caldo do cozimento do frango',
            '500 g de farinha de trigo',
            '2 colheres (sopa) de manteiga',
            '1 cebola pequena picada',
            '2 dentes de alho picados',
            'Sal, pimenta-do-reino e cheiro-verde a gosto',
            '2 ovos batidos e farinha de rosca para empanar',
            'Oleo para fritar',
          ],
          preparo: [
            'Refogue a cebola e o alho, junte o frango, tempere e finalize com cheiro-verde.',
            'Ferva o caldo com a manteiga e o sal. Adicione a farinha de uma vez e mexa ate a massa soltar da panela.',
            'Deixe a massa amornar, sove ate ficar lisa e divida em porcoes.',
            'Abra cada porcao, recheie com o frango e modele no formato de coxinha.',
            'Passe no ovo, depois na farinha de rosca, e frite em oleo quente ate dourar.',
          ],
        },
        {
          nome: 'Brigadeiro tradicional',
          categoria: 'Doce',
          tempo: 60,
          imagem: 'brigadeiro',
          ingredientes: [
            '1 lata de leite condensado',
            '20 g de chocolate em po 50% cacau',
            '40 g de manteiga sem sal',
            '200 g de chocolate granulado',
          ],
          preparo: [
            'Misture o leite condensado, o chocolate em po e a manteiga em uma panela de fundo grosso.',
            'Cozinhe em fogo medio, mexendo sempre, ate a massa desgrudar do fundo da panela.',
            'Transfira para um prato untado, cubra e deixe esfriar completamente.',
            'Unte as maos, modele bolinhas e passe cada uma no chocolate granulado.',
          ],
        },
        {
          nome: 'Caipirinha tradicional',
          categoria: 'Bebida',
          tempo: 5,
          imagem: 'caipirinha',
          ingredientes: [
            '60 ml de cachaca',
            '1 limao cortado em gomos pequenos',
            '4 colheres (cha) de acucar',
            'Gelo quebrado a gosto',
          ],
          preparo: [
            'Coloque os gomos de limao e o acucar em um copo baixo e macere suavemente.',
            'Preencha o copo com gelo quebrado.',
            'Adicione a cachaca e mexa suavemente para integrar os ingredientes.',
          ],
        },
      ];

      for (const receita of receitasIniciais) {
        await db.runAsync(
          `INSERT INTO receitas
             (usuario_id, nome, categoria, tempo_preparo, ingredientes,
              modo_de_preparo, favorita, imagem)
           VALUES (?, ?, ?, ?, ?, ?, 0, ?)`,
          autor.id,
          receita.nome,
          receita.categoria,
          receita.tempo,
          JSON.stringify(receita.ingredientes),
          JSON.stringify(receita.preparo),
          receita.imagem,
        );
      }

      await db.runAsync(
        'INSERT INTO migracoes (nome) VALUES (?)',
        'receitas_iniciais_brasileiras',
      );
    });
  }

  return db;
}
