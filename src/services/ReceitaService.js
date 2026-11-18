import Receita from '../models/Receita';
import {
  atualizar,
  buscarPorId,
  criar,
  definirFavorita,
  excluir,
  listar,
  listarCatalogo,
} from '../database/ReceitaRepository';

function serializar(receita) {
  // SQLite armazena as listas como texto JSON.
  return {
    ...receita,
    ingredientes: JSON.stringify(receita.ingredientes),
    modoDePreparo: JSON.stringify(receita.modoDePreparo),
  };
}

export function formatarReceita(receita) {
  if (!receita) return null;

  // Converte o JSON do banco novamente em arrays usados pelas telas.
  const converterLista = (valor) => {
    try {
      const lista = JSON.parse(valor || '[]');
      return Array.isArray(lista) ? lista : [];
    } catch {
      return [];
    }
  };

  return {
    ...receita,
    tempoPreparo: Number(receita.tempo_preparo) || 0,
    ingredientes: converterLista(receita.ingredientes),
    modoDePreparo: converterLista(receita.modo_de_preparo),
    favorita: Boolean(receita.favorita),
  };
}

function montarReceita(dados) {
  // Centraliza a criação do objeto de domínio Receita.
  return new Receita(
    dados.id ?? null,
    dados.usuario_id,
    dados.nome.trim(),
    dados.categoria,
    Number(dados.tempoPreparo),
    dados.ingredientes,
    dados.modoDePreparo,
    Boolean(dados.favorita),
  );
}

export async function criarReceita(db, dados) {
  return criar(db, serializar(montarReceita(dados)));
}

export async function atualizarReceita(db, dados) {
  return atualizar(db, serializar(montarReceita(dados)));
}

export async function listarReceitas(db, usuario) {
  if (!usuario) return [];
  const receitas = await listar(db, usuario.id);
  return receitas.map(formatarReceita);
}

export async function listarCatalogoReceitas(db, usuario) {
  if (!usuario) return [];
  const receitas = await listarCatalogo(db, usuario.id);
  return receitas.map(formatarReceita);
}

export async function buscarReceita(db, id, usuario) {
  if (!usuario) return null;
  return formatarReceita(await buscarPorId(db, Number(id), usuario.id));
}

export async function alternarFavorita(db, receita, usuario) {
  if (!usuario) throw new Error('Faça login para favoritar uma receita.');
  const novoEstado = !receita.favorita;
  await definirFavorita(db, receita.id, usuario.id, novoEstado);
  return novoEstado;
}

export async function excluirReceita(db, receita, usuario) {
  // Impede que um usuário apague a receita criada por outra pessoa.
  if (!receita || receita.usuario_id !== usuario?.id) {
    throw new Error('Você só pode excluir suas próprias receitas.');
  }
  const resultado = await excluir(db, receita.id, usuario.id);
  if (!resultado.changes) throw new Error('A receita não foi encontrada.');
}
