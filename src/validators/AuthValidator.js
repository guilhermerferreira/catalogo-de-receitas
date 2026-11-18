export function validarLogin(email, senha) {

    const erros = { email: '', senha: '' };
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
        erros.email = 'O campo e-mail deve ser preenchido.';
            
    } else if (!emailValido.test(email)) {
        erros.email = 'Insira um e-mail válido.';
    }

    if(!senha.trim()) {
        erros.senha = 'O campo senha deve ser preenchido.';
    } else if (senha.length < 6) {
        erros.senha = 'A senha deve conter pelo menos 6 caracteres';
    }

    return erros;
}

export function validarCadastro(nome, email, senha, confirmaSenha) {

    const erros = {nome: '', email: '', senha: '', confirmaSenha: '' };
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome.trim()) {
        erros.nome = 'O campo nome deve ser preenchido';
    } else if (nome.length < 2) {
        erros.nome = 'O nome deve conter pelo menos 2 caracteres.';
    }

    if (!email.trim()) {
        erros.email = 'O campo e-mail deve ser preenchido.';
    } else if (!emailValido.test(email)) {
        erros.email = 'Insira um e-mail válido.';
    }

    if (!senha.trim()) {
        erros.senha = 'O campo senha deve ser preenchido.';
    } else if (senha.length < 6) {
        erros.senha = 'A senha deve conter pelo menos 6 caracteres';
    }

    if(!confirmaSenha.trim()) {
        erros.confirmaSenha = 'É necessário confirmar a senha.';
    } else if (confirmaSenha !== senha) {
        erros.confirmaSenha = 'As senhas devem ser iguais.';
    }

    return erros;
    
}

