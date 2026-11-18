import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { validarCadastro } from '../validators/AuthValidator';
import { conectarBanco } from '../database/database';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cadastrarUsuario } from '../services/AuthService';
import Label from '../components/Label';
import Input from '../components/Input';

export default function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erros, setErros] = useState({
    nome: '',
    email: '',
    senhaHash: '',
    confirmaSenha: '',
  });

  async function enviaCadastro() {
    const resultado = validarCadastro(nome, email, senha, confirmaSenha);
    setErros(resultado);

    const possuiErros = Object.values(resultado).some((erro) => erro !== '');

    if (possuiErros) {
      return;
    }

    // Tenta cadastrar o usuario, Se encontrar erro cai no catch
    try {
      const db = await conectarBanco();

      const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha,
      };
      // insere o novo usuario no banco
      await cadastrarUsuario(db, novoUsuario);

      // navega para a pagina de login
      navigation.replace('Login');
    } catch (error) {
      // recebe varios erros, e altera apenas o valor do 'email'
      setErros({
        ...erros,
        email: error.message, // Erro: E-mail já cadastrado
      });
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <View style={styles.conteudo}>
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.titulo}>Crie sua conta</Text>
              <Text style={styles.subtitulo}>
                Entre para a comunidade PITADA
              </Text>
            </View>

            {/* FORMULÁRIO */}
            <View style={styles.formContainer}>
              {/* NOME */}
              <Label texto={'NOME'} />
              <Input
                value={nome}
                onChangeText={setNome}
                placeholder="Como podemos te chamar?"
                error={erros.nome}
              />

              {/* E-MAIL */}
              <Label texto={'E-MAIL'} />
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="seuemail@exemplo.com"
                error={erros.email}
                keyboardType="email-address"
              />

              {/* SENHA */}
              <Label texto={'SENHA'} />
              <Input
                value={senha}
                onChangeText={setSenha}
                placeholder="Crie uma senha"
                error={erros.senha}
                secureTextEntry
              />

              {/* CONFIRMAR SENHA */}
              <Label texto={'CONFIRMAR SENHA'} />
              <Input
                value={confirmaSenha}
                onChangeText={setConfirmaSenha}
                placeholder="Digite novamente"
                error={erros.confirmaSenha}
                secureTextEntry
              />

              {/* BOTÃO */}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => enviaCadastro()}
                activeOpacity={0.7}
              >
                <Text style={styles.textoBotao}>Criar minha conta</Text>
              </TouchableOpacity>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={styles.textoFooter}>
                Já tem conta?
                <Text
                  style={styles.link}
                  onPress={() => navigation.replace('Login')}
                >
                  {' '}
                  Entrar
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6E7',
  },
  conteudo: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    width: '100%',
    alignSelf: 'flex-start',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0C343E',
  },
  subtitulo: {
    fontSize: 11,
    marginTop: 5,
    color: '#0C343E',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    marginTop: 40,
  },
  botao: {
    alignItems: 'center',
    backgroundColor: '#FFBE31',
    padding: 12,
    borderRadius: 8,
    marginTop: 40,
  },
  textoBotao: {
    fontWeight: 'bold',
    color: '#0C343E',
  },
  footer: {
    fontSize: 13,
    alignItems: 'center',
    marginTop: 30,
  },
  textoFooter: {
    color: '#0C343E',
  },
  link: {
    fontWeight: 'bold',
    color: 'blue',
  },
});
