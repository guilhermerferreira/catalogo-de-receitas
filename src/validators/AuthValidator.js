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

