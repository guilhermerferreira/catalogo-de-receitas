import { useCallback, useContext, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import Ionicons from '@react-native-vector-icons/ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import ReceitaCard from '../components/ReceitaCard';
import { conectarBanco } from '../database/database';
import {
  alternarFavorita,
  listarCatalogoReceitas,
} from '../services/ReceitaService';
import {
  carregarUltimoFiltro,
  salvarUltimoFiltro,
} from '../services/PreferenciasService';

const CATEGORIAS = ['Todos', 'Doce', 'Salgado', 'Salada', 'Bebida'];

export default function TelaHome() {
  const { usuario } = useContext(AuthContext);
  const [receitas, setReceitas] = useState([]);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  const carregar = useCallback(async () => {
    // Recupera o filtro salvo e todas as receitas do catálogo.
    const db = await conectarBanco();
    const filtro = await carregarUltimoFiltro();
    setCategoria(CATEGORIAS.includes(filtro) ? filtro : 'Todos');
    setReceitas(await listarCatalogoReceitas(db));
  }, []);

  useFocusEffect(
    // Recarrega ao voltar para a tela após criar ou editar uma receita.
    useCallback(() => {
      carregar();
    }, [carregar]),
  );

  const filtradas = useMemo(
    // Evita recalcular a busca enquanto os dados não mudarem.
    () =>
      receitas.filter((receita) => {
        const correspondeNome = receita.nome
          .toLowerCase()
          .includes(busca.trim().toLowerCase());
        const correspondeCategoria =
          categoria === 'Todos' || receita.categoria === categoria;
        return correspondeNome && correspondeCategoria;
      }),
    [busca, categoria, receitas],
  );

  async function escolherCategoria(valor) {
    setCategoria(valor);
    await salvarUltimoFiltro(valor);
  }

  async function favoritar(receita) {
    // Atualiza o SQLite e depois reflete o novo estado na interface.
    const favorita = await alternarFavorita(await conectarBanco(), receita);
    setReceitas((lista) =>
      lista.map((item) =>
        item.id === receita.id ? { ...item, favorita } : item,
      ),
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={filtradas}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        columnWrapperStyle={styles.linha}
        contentContainerStyle={styles.conteudo}
        ListHeaderComponent={
          <>
            <Text style={styles.titulo}>
              Olá, {usuario?.nome?.split(' ')[0] || 'cozinheira'}!
            </Text>
            <Text style={styles.subtitulo}>O que vamos preparar hoje?</Text>
            <View style={styles.busca}>
              <Ionicons name="search-outline" size={19} color="#777" />
              <TextInput
                value={busca}
                onChangeText={setBusca}
                placeholder="Buscar receitas..."
                style={styles.campoBusca}
              />
            </View>
            <Text style={styles.secaoTitulo}>Categorias</Text>
            <View style={styles.categorias}>
              {CATEGORIAS.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => escolherCategoria(item)}
                  style={[
                    styles.categoria,
                    categoria === item && styles.categoriaAtiva,
                  ]}
                >
                  <Text style={categoria === item && styles.textoAtivo}>
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Text style={styles.secaoTitulo}>Receitas</Text>
          </>
        }
        renderItem={({ item }) => (
          <ReceitaCard
            receita={item}
            onFavorite={favoritar}
            onPress={() =>
              router.push({
                pathname: '/receita/[id]',
                params: { id: item.id },
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma receita encontrada.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF6E7' },
  conteudo: { padding: 18, paddingBottom: 30 },
  titulo: { fontSize: 25, fontWeight: 'bold', color: '#0C343E' },
  subtitulo: { color: '#66767A', marginTop: 2 },
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBF3',
    borderWidth: 1,
    borderColor: '#E5E0D0',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginTop: 24,
  },
  campoBusca: { flex: 1, paddingVertical: 12, marginLeft: 8 },
  secaoTitulo: {
    color: '#0C343E',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 12,
  },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoria: {
    borderWidth: 1,
    borderColor: '#E5E0D0',
    backgroundColor: '#FFFBF3',
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 18,
  },
  categoriaAtiva: { backgroundColor: '#0C343E', borderColor: '#0C343E' },
  textoAtivo: { color: '#FFF' },
  linha: { gap: 14, marginBottom: 14 },
  vazio: { color: '#66767A', textAlign: 'center', marginTop: 35 },
});
