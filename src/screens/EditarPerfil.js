import { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import { conectarBanco } from '../database/database';
import { editarUsuario } from '../services/AuthService';
import Input from '../components/Input';
import Label from '../components/Label';

export default function EditarPerfil() {
  const { usuario, atualizarUsuario } = useContext(AuthContext);
  const [nome, setNome] = useState(usuario?.nome || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [erro, setErro] = useState('');

  async function salvar() {
    if (nome.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setErro('Informe um nome e um e-mail válidos.');
      return;
    }
    try {
      const dados = {
        ...usuario,
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
      };
      await editarUsuario(await conectarBanco(), dados);
      atualizarUsuario(dados);
      Alert.alert('Perfil atualizado', 'Seus dados foram salvos.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Editar perfil</Text>
        <Text style={styles.subtitulo}>Atualize seus dados pessoais</Text>
        <View style={styles.form}>
          <Label texto="NOME" />
          <Input value={nome} onChangeText={setNome} />
          <Label texto="E-MAIL" />
          <Input
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {erro ? <Text style={styles.erro}>{erro}</Text> : null}
          <TouchableOpacity style={styles.botao} onPress={salvar}>
            <Text style={styles.textoBotao}>Salvar alterações</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF6E7' },
  conteudo: { padding: 20 },
  titulo: { fontSize: 25, fontWeight: 'bold', color: '#0C343E' },
  subtitulo: { color: '#66767A', marginTop: 3 },
  form: { marginTop: 35 },
  erro: { color: '#B3261E', marginBottom: 10 },
  botao: {
    height: 50,
    borderRadius: 12,
    backgroundColor: '#FFBE31',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textoBotao: { fontWeight: 'bold', color: '#0C343E' },
});
