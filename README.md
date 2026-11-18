# PITADA - Catálogo de Receitas

O PITADA é um aplicativo móvel acadêmico para descobrir, cadastrar, organizar e compartilhar receitas. O projeto foi desenvolvido pelo Grupo 2 com React Native e Expo, seguindo a organização e os recursos trabalhados em aula.

## Integrantes

- [Preencher nome do integrante]
- [Preencher nome do integrante]
- [Preencher nome do integrante]

Os nomes ficaram como campos de preenchimento porque não há uma lista confirmada de integrantes no repositório.

## Objetivo

Oferecer um catálogo local de receitas no qual cada usuário possa criar uma conta, publicar e gerenciar suas próprias receitas, consultar receitas da comunidade e manter uma lista pessoal de favoritas.

## Tecnologias

- JavaScript
- React Native 0.88
- Expo SDK 58
- React Navigation (Stack Navigator e Bottom Tabs)
- SQLite com `expo-sqlite`
- AsyncStorage
- Ionicons

## Funcionalidades

- Cadastro, login, edição de perfil e logout.
- Catálogo com busca por nome e filtro por categoria.
- Cadastro, consulta, edição e exclusão de receitas.
- Validação de nome, categoria, tempo, ingredientes e modo de preparo.
- Favoritos separados por usuário e agrupados por categoria.
- Persistência das receitas e dos favoritos no SQLite.
- Persistência do último filtro escolhido no AsyncStorage.

## Estrutura de pastas

```text
App.js                         Stack Navigator principal
index.js                       entrada registrada pelo Expo
assets/                        imagens e ícone do aplicativo
src/
  components/                  componentes reutilizáveis
  context/                     estado do usuário autenticado
  database/                    conexão, esquema e repositories SQLite
  models/                      modelos de usuário e receita
  navigation/                  Bottom Tabs
  screens/                     telas do aplicativo
  services/                    regras de negócio
  validators/                  validações de formulários
```

## Instalação e execução

Requisitos: Node.js, npm e o aplicativo Expo Go compatível com o SDK 58.

```bash
npm install
npx expo start
```

Depois de iniciar o servidor, leia o QR Code com o Expo Go. O computador e o celular devem conseguir se comunicar pela mesma rede. Para limpar o cache do bundler:

```bash
npx expo start --clear
```

Verificações do projeto:

```bash
npx expo install --check
npx expo lint
npx tsc --noEmit
npx expo-doctor
```

## Persistência

O arquivo `pitada.db` é aberto pelo `expo-sqlite`. As tabelas `usuarios`, `receitas` e `favoritos` guardam os dados no aparelho. Ingredientes e etapas são convertidos para JSON porque o SQLite não possui um tipo de coluna para arrays. Os comandos SQL recebem parâmetros, sem concatenar os valores digitados pelo usuário.

O AsyncStorage não substitui o banco. Ele guarda apenas uma preferência simples: o último filtro de categoria selecionado no catálogo.

## Capturas de tela

Adicionar aqui capturas reais feitas no dispositivo ou emulador antes da entrega:

- [ ] Tela inicial e login
- [ ] Catálogo e filtros
- [ ] Detalhes da receita
- [ ] Cadastro ou edição
- [ ] Favoritos agrupados
- [ ] Perfil

## Observação de segurança

As senhas das contas locais ainda são armazenadas em texto simples para preservar a compatibilidade com as contas acadêmicas já criadas. Em um aplicativo de produção, seria obrigatório aplicar hash seguro e uma migração das credenciais existentes.
