import { useCallback, useContext, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import ReceitaCard from '../components/ReceitaCard';
import { conectarBanco } from '../database/database';
import { alternarFavorita, listarReceitas } from '../services/ReceitaService';

const CATEGORIAS = ['Todos', 'Doce', 'Salgado', 'Salada', 'Bebida'];

export default function ListaReceitas({ navigation }) {
  const { usuario } = useContext(AuthContext);
  const [receitas, setReceitas] = useState([]);
  const [categoria, setCategoria] = useState('Todos');

  useFocusEffect(
    // Mantém a lista sincronizada após cadastro, edição ou exclusão.
    useCallback(() => {
      async function carregar() {
        const db = await conectarBanco();
        setReceitas(await listarReceitas(db, usuario));
      }
      carregar();
    }, [usuario]),
  );

  const filtradas = useMemo(
    () =>
      receitas.filter(
        (item) => categoria === 'Todos' || item.categoria === categoria,
      ),
    [categoria, receitas],
  );

  async function favoritar(receita) {
    const favorita = await alternarFavorita(
      await conectarBanco(),
      receita,
      usuario,
    );
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
            <Text style={styles.titulo}>Minhas receitas</Text>
            <Text style={styles.subtitulo}>Receitas que você criou</Text>
            <View style={styles.opcoes}>
              {CATEGORIAS.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setCategoria(item)}
                  style={[styles.categoria, categoria === item && styles.ativa]}
                >
                  <Text style={categoria === item && styles.textoAtivo}>
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        }
        renderItem={({ item }) => (
          <ReceitaCard
            receita={item}
            onFavorite={favoritar}
            onPress={() =>
              navigation.getParent()?.navigate('DetalhesReceita', {
                id: item.id,
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Você ainda não publicou receitas nesta categoria.
          </Text>
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
  opcoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 24,
  },
  categoria: {
    borderWidth: 1,
    borderColor: '#E5E0D0',
    backgroundColor: '#FFFBF3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  ativa: { backgroundColor: '#0C343E' },
  textoAtivo: { color: '#FFF' },
  linha: { gap: 14, marginBottom: 14 },
  vazio: { color: '#66767A', textAlign: 'center', marginTop: 40 },
});
