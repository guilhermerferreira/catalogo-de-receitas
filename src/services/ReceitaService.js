import Receita from "../models/Receita";
import { criar, listar } from "../database/ReceitaRepository";

export async function criarReceita(db, receita) {

    if(!receita) {
        return;
    }

    const novaReceita = new Receita(
        null, // id - autoincrement
        receita.usuario_id,
        receita.nome,
        receita.categoria,
        receita.ingredientes,
        receita.modoDePreparo
    );  

    const receitaParaSalvar = {
        ...novaReceita,
        // CONVERTE O ARRAY EM STRING PARA INSERIR NO BANCO
        ingredientes: JSON.stringify(novaReceita.ingredientes),
        modoDePreparo: JSON.stringify(novaReceita.modoDePreparo),
    }

    await criar(db, receitaParaSalvar);
}

function formatarReceita(receita) {
    
    if (!receita) {
        return;
    }
    
    let listaIngredientes = [];
    let listaModoDePreparo = [];
    
    try {

        // CONVERTE OS INGREDIENTES E MODO DE PREPARO PARA LISTAS
        listaIngredientes = JSON.parse(receita.ingredientes);
        listaModoDePreparo = JSON.parse(receita.modo_de_preparo);
    } catch (error) {
        console.log('Erro aqui', error);
    }

    return ({
        ...receita,
        ingredientes: listaIngredientes,
        modoDePreparo: listaModoDePreparo
    });
}

export async function listarReceitas(db, usuario) {

    if(!usuario) {
        console.log('Nao chegou usario no Service')
        return [];
    }

    try {
        const receitasBrutas = await listar(db, usuario?.id);
        const receitasFormatadas = receitasBrutas.map((receita) => formatarReceita(receita));

        return receitasFormatadas;
    } catch (error) {
        console.log('ERRO no service: ', error.message);
        return [];
    }
}