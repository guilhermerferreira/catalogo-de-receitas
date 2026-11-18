import { useCallback, useContext, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import { conectarBanco } from '../database/database';
import {
  alternarFavorita,
  buscarReceita,
  excluirReceita,
} from '../services/ReceitaService';
import { obterImagemReceita } from '../utils/receitaImagens';

export default function DetalhesReceita({ navigation, route }) {
  // O id vem da rota dinâmica receita/[id].
  const receitaId = route.params?.id;
  const { usuario } = useContext(AuthContext);
  const [receita, setReceita] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useFocusEffect(
    // Atualiza os detalhes quando o usuário retorna da edição.
    useCallback(() => {
      async function carregar() {
        try {
          setCarregando(true);
          setErro('');
          setReceita(
            await buscarReceita(await conectarBanco(), receitaId, usuario),
          );
        } catch {
          setErro('Não foi possível consultar esta receita.');
        } finally {
          setCarregando(false);
        }
      }
      carregar();
    }, [receitaId, usuario]),
  );

  async function favoritar() {
    try {
      const favorita = await alternarFavorita(
        await conectarBanco(),
        receita,
        usuario,
      );
      setReceita((atual) => ({ ...atual, favorita }));
    } catch (error) {
      Alert.alert('Não foi possível favoritar', error.message);
    }
  }

  function confirmarExclusao() {
    // A exclusão exige confirmação porque não pode ser desfeita.
    Alert.alert('Excluir receita?', 'Esta ação não poderá ser desfeita.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await excluirReceita(await conectarBanco(), receita, usuario);
            navigation.navigate('Principal', { screen: 'MinhasReceitas' });
          } catch (error) {
            Alert.alert('Não foi possível excluir', error.message);
          }
        },
      },
    ]);
  }

  if (carregando)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.carregando}>Carregando receita...</Text>
      </SafeAreaView>
    );

  if (erro || !receita)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.carregando}>
          {erro || 'Receita não encontrada.'}
        </Text>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.voltarErro}
        >
          <Text style={styles.textoVoltarErro}>Voltar</Text>
        </Pressable>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.acoesTopo}>
          <Pressable onPress={() => navigation.goBack()} style={styles.icone}>
            <Ionicons name="arrow-back" size={24} color="#0C343E" />
          </Pressable>
          <Pressable onPress={favoritar} style={styles.icone}>
            <Ionicons
              name={receita.favorita ? 'heart' : 'heart-outline'}
              size={25}
              color={receita.favorita ? '#C83E4D' : '#0C343E'}
            />
          </Pressable>
        </View>
        <View style={styles.ilustracao}>
          {obterImagemReceita(receita.imagem) ? (
            <Image
              source={obterImagemReceita(receita.imagem)}
              style={styles.imagem}
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="restaurant-outline" size={72} color="#0C343E" />
          )}
        </View>
        <Text style={styles.titulo}>{receita.nome}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaTexto}>{receita.tempoPreparo} min</Text>
          <Text style={styles.metaTexto}>{receita.categoria}</Text>
        </View>

        <Text style={styles.secao}>Ingredientes</Text>
        {receita.ingredientes.map((item, index) => (
          <View style={styles.linha} key={`${item}-${index}`}>
            <View style={styles.bolinha} />
            <Text style={styles.texto}>{item}</Text>
          </View>
        ))}

        <Text style={styles.secao}>Modo de preparo</Text>
        {receita.modoDePreparo.map((item, index) => (
          <View style={styles.passo} key={`${item}-${index}`}>
            <View style={styles.circuloNumero}>
              <Text style={styles.numero}>{index + 1}</Text>
            </View>
            <Text style={styles.texto}>{item}</Text>
          </View>
        ))}

        {receita.usuario_id === usuario?.id ? (
          <View style={styles.acoesReceita}>
            <Pressable
              style={styles.editar}
              onPress={() =>
                navigation.navigate('EditarReceita', { id: receita.id })
              }
            >
              <Ionicons name="create-outline" size={20} color="#FFF" />
              <Text style={styles.textoEditar}>Editar receita</Text>
            </Pressable>
            <Pressable style={styles.excluir} onPress={confirmarExclusao}>
              <Ionicons name="trash-outline" size={20} color="#B3261E" />
              <Text style={styles.textoExcluir}>Excluir receita</Text>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF6E7' },
  conteudo: { padding: 20, paddingBottom: 45 },
  carregando: { margin: 24, color: '#0C343E' },
  voltarErro: {
    marginHorizontal: 24,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#FFBE31',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoVoltarErro: { color: '#0C343E', fontWeight: 'bold' },
  acoesTopo: { flexDirection: 'row', justifyContent: 'space-between' },
  icone: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFBF3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ilustracao: {
    height: 160,
    borderRadius: 20,
    backgroundColor: '#FFE2A3',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    overflow: 'hidden',
  },
  imagem: { width: '100%', height: '100%' },
  titulo: { fontSize: 27, fontWeight: 'bold', color: '#0C343E', marginTop: 20 },
  meta: { flexDirection: 'row', gap: 12, marginTop: 10 },
  metaTexto: {
    backgroundColor: '#EEE5D5',
    color: '#0C343E',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  secao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0C343E',
    marginTop: 28,
    marginBottom: 12,
  },
  linha: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 9 },
  bolinha: {
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFBE31',
    marginTop: 5,
    marginRight: 10,
  },
  texto: { flex: 1, color: '#314A50', lineHeight: 20 },
  passo: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  circuloNumero: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFBE31',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexShrink: 0,
  },
  numero: {
    color: '#0C343E',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
  },
  acoesReceita: { marginTop: 28, gap: 10 },
  editar: {
    backgroundColor: '#0C343E',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoEditar: { color: '#FFF', fontWeight: 'bold' },
  excluir: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B3261E',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoExcluir: { color: '#B3261E', fontWeight: 'bold' },
});
