import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useState, useContext } from 'react';
import { validarLogin } from '../validators/AuthValidator';
import { conectarBanco } from '../database/database';
import { realizarLogin } from '../services/AuthService';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/Input';
import Label from '../components/Label';
import { router } from 'expo-router';

export default function TelaLogin() {
  // Permite acesso a função do Context
  const { definirUsuario } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({ email: '', senha: '' });
  const [erroLogin, setErroLogin] = useState('');

  async function enviarLogin() {
    const resultado = validarLogin(email, senha);
    setErros(resultado);

    // compara se o valor do erro retornado é diferente de ''
    const possuiErros = Object.values(resultado).some((erro) => erro !== '');

    if (possuiErros) {
      return;
    }

    try {
      const db = await conectarBanco();

      const usuario = {
        email: email,
        senha: senha,
      };

      const usuario_logado = await realizarLogin(db, usuario);
      if (usuario_logado) {
        definirUsuario({
          id: usuario_logado.id,
          nome: usuario_logado.nome,
          email: usuario_logado.email,
        });

        router.replace('/(tabs)');
      }
    } catch (error) {
      setErroLogin(error.message);
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
              <Text style={styles.titulo}>Faça seu login</Text>
              <Text style={styles.subtitulo}>
                É um prazer ter você de volta!
              </Text>
            </View>

            {/* FORMULÁRIO */}
            <View style={styles.formContainer}>
              {/* EMAIL */}
              <Label texto={'E-MAIL'} />
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="seuemail@exemplo.com"
                keyboardType="email-address"
                error={erros.email}
              />

              {/* SENHA */}
              <Label texto={'SENHA'} />
              <Input
                value={senha}
                onChangeText={setSenha}
                placeholder="senha_exemplo123"
                secureTextEntry
                error={erros.senha}
              />

              {erroLogin ? (
                <Text style={styles.msgErroLogin}>{erroLogin}</Text>
              ) : null}

              {/* BOTÃO */}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => enviarLogin()}
                activeOpacity={0.7}
              >
                <Text style={styles.textoBotao}>Entrar</Text>
              </TouchableOpacity>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={styles.textoFooter}>
                Não tem uma conta?
                <Text
                  style={styles.link}
                  onPress={() => router.push('/cadastro')}
                >
                  Crie sua conta!
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
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
    marginTop: 70,
  },
  botao: {
    padding: 12,
    borderRadius: 8,
    marginTop: 80,
    backgroundColor: '#FFBE31',
    alignItems: 'center',
    color: '#0C343E',
  },
  textoBotao: {
    fontWeight: 'bold',
    color: '#0C343E',
  },
  footer: {
    fontSize: 13,
    alignItems: 'center',
    marginTop: 40,
  },
  textoFooter: {
    color: '#0C343E',
  },
  link: {
    fontWeight: 'bold',
    color: 'blue',
  },
  msgErroLogin: {
    textAlign: 'center',
    color: '#e53935',
    fontSize: 14,
    marginTop: 10, // -10, porque o input da um marginBottom de 10
  },
});
