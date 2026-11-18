import { useCallback, useContext, useMemo, useState } from 'react';
import { SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReceitaCard from '../components/ReceitaCard';
import { AuthContext } from '../context/AuthContext';
import { conectarBanco } from '../database/database';
import {
  alternarFavorita,
  listarCatalogoReceitas,
} from '../services/ReceitaService';

const ORDEM = ['Doce', 'Salgado', 'Salada', 'Bebida'];

export default function ListaReceitasFavoritas({ navigation }) {
  const { usuario } = useContext(AuthContext);
  const [receitas, setReceitas] = useState([]);
  const [busca, setBusca] = useState('');

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        const db = await conectarBanco();
        setReceitas(
          (await listarCatalogoReceitas(db, usuario)).filter(
            (item) => item.favorita,
          ),
        );
      }
      carregar();
    }, [usuario]),
  );

  const secoes = useMemo(
    // SectionList recebe uma seção separada para cada categoria.
    () =>
      ORDEM.map((categoria) => ({
        title: categoria,
        data: receitas.filter(
          (item) =>
            item.categoria === categoria &&
            item.nome.toLowerCase().includes(busca.trim().toLowerCase()),
        ),
      })).filter((secao) => secao.data.length),
    [busca, receitas],
  );

  async function removerFavorita(receita) {
    await alternarFavorita(await conectarBanco(), receita, usuario);
    setReceitas((lista) => lista.filter((item) => item.id !== receita.id));
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionList
        sections={secoes}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.conteudo}
        ListHeaderComponent={
          <>
            <Text style={styles.titulo}>Meus favoritos</Text>
            <Text style={styles.subtitulo}>
              Receitas que você guardou para depois
            </Text>
            <View style={styles.busca}>
              <Ionicons name="search-outline" size={19} color="#777" />
              <TextInput
                value={busca}
                onChangeText={setBusca}
                placeholder="Buscar nos favoritos"
                style={styles.campo}
              />
            </View>
          </>
        }
        renderSectionHeader={({ section }) => (
          <Text style={styles.categoria}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <ReceitaCard
              receita={item}
              estilo="destaque"
              onFavorite={removerFavorita}
              onPress={() =>
                navigation.getParent()?.navigate('DetalhesReceita', {
                  id: item.id,
                })
              }
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma receita favorita encontrada.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF6E7' },
  conteudo: { padding: 18, paddingBottom: 30 },
  titulo: { fontSize: 25, fontWeight: 'bold', color: '#0C343E' },
  subtitulo: { color: '#66767A', marginTop: 3 },
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBF3',
    borderWidth: 1,
    borderColor: '#E5E0D0',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginTop: 22,
    marginBottom: 12,
  },
  campo: { flex: 1, paddingVertical: 12, marginLeft: 8 },
  categoria: {
    fontSize: 17,
    color: '#0C343E',
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 10,
    backgroundColor: '#FFF6E7',
  },
  cardContainer: { marginBottom: 14 },
  vazio: { color: '#66767A', textAlign: 'center', marginTop: 40 },
});
