import Receita from "../models/Receita";
import { criar } from "../database/ReceitaRepository";

export async function criarReceita(db, receita) {
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