import {
  atualizarPerfil,
  buscarEmail,
  cadastrar,
} from '../database/UsuarioRepository';
import Usuario from '../models/Usuario';

export async function cadastrarUsuario(db, dadosUsuario) {
  const usuarioExistente = await buscarEmail(db, dadosUsuario.email);

  console.log('2. USUARIO EXISTENTE:', usuarioExistente);

  if (usuarioExistente) {
    throw new Error('E-mail já cadastrado.');
  }

  const novoUsuario = new Usuario(
    null, // id - autoincrement
    dadosUsuario.nome,
    dadosUsuario.email,
    dadosUsuario.senha,
  );

  await cadastrar(db, novoUsuario);
}

export async function realizarLogin(db, dadosLogin) {
  const usuario = await buscarEmail(db, dadosLogin.email);

  if (!usuario) {
    throw new Error('E-mail ou senha incorretos.');
  }

  if (usuario.senha !== dadosLogin.senha) {
    throw new Error('E-mail ou senha incorretos.');
  }

  return usuario;
}

export async function editarUsuario(db, usuario) {
  const donoDoEmail = await buscarEmail(db, usuario.email);
  if (donoDoEmail && donoDoEmail.id !== usuario.id) {
    throw new Error('E-mail já cadastrado.');
  }
  await atualizarPerfil(db, usuario);
  return usuario;
}
