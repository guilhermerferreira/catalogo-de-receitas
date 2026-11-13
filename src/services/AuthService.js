import { conectarBanco } from "../database/database";
import { buscarEmail, cadastrar } from "../database/UsuarioRepository";
import Usuario from "../models/Usuario";

const db = await conectarBanco();

export async function cadastrarUsuario(dadosUsuario) {

    const usuarioExistente = await buscarEmail(db, dadosUsuario.email);

    if(usuarioExistente) {
        throw new Error('E-mail já cadastrado.');
    }
    
    const novoUsuario = new Usuario(
        null, // id - autoincrement
        dadosUsuario.nome,
        dadosUsuario.email,
        dadosUsuario.senhaHash
    );

    await cadastrar(db, novoUsuario);
}