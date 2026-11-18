export function validarReceita({ nome, categoria, tempoPreparo, ingredientes, modoDePreparo }) {
    const erros = {};

    if (!nome.trim()) erros.nome = 'Informe o nome da receita.';
    if (!categoria) erros.categoria = 'Selecione uma categoria.';
    if (!tempoPreparo.trim()) {
        erros.tempoPreparo = 'Informe o tempo de preparo.';
    } else if (!/^\d+$/.test(tempoPreparo) || Number(tempoPreparo) <= 0) {
        erros.tempoPreparo = 'Use um número inteiro maior que zero.';
    }
    if (ingredientes.length === 0) erros.ingredientes = 'Adicione pelo menos um ingrediente.';
    if (modoDePreparo.length === 0) erros.modoDePreparo = 'Adicione pelo menos uma etapa.';

    return erros;
}
