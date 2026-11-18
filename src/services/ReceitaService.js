import Receita from '../models/Receita';
import {
    atualizar,
    buscarPorId,
    criar,
    definirFavorita,
    listar,
    listarCatalogo,
} from '../database/ReceitaRepository';

function serializar(receita) {
    return {
        ...receita,
        ingredientes: JSON.stringify(receita.ingredientes),
        modoDePreparo: JSON.stringify(receita.modoDePreparo),
    };
}

export function formatarReceita(receita) {
    if (!receita) return null;

    const converterLista = valor => {
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
    return new Receita(
        dados.id ?? null,
        dados.usuario_id,
        dados.nome.trim(),
        dados.categoria,
        Number(dados.tempoPreparo),
        dados.ingredientes,
        dados.modoDePreparo,
        Boolean(dados.favorita)
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

export async function listarCatalogoReceitas(db) {
    const receitas = await listarCatalogo(db);
    return receitas.map(formatarReceita);
}

export async function buscarReceita(db, id) {
    return formatarReceita(await buscarPorId(db, Number(id)));
}

export async function alternarFavorita(db, receita) {
    const novoEstado = !receita.favorita;
    await definirFavorita(db, receita.id, novoEstado);
    return novoEstado;
}
