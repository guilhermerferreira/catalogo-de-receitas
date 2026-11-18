const IMAGENS_RECEITAS = {
  coxinha: require('../../assets/receitas/coxinha.png'),
  brigadeiro: require('../../assets/receitas/brigadeiro.png'),
  caipirinha: require('../../assets/receitas/caipirinha.png'),
};

export function obterImagemReceita(chave) {
  return IMAGENS_RECEITAS[chave] || null;
}
