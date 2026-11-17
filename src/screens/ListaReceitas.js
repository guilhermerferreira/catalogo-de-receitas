import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import { useContext, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { conectarBanco } from "../database/database";
import { listarReceitas } from "../services/ReceitaService";
import  ReceitaCard  from "../components/ReceitaCard";
import { useFocusEffect } from "@react-navigation/native";

export default function ListaReceitas() {

  const { usuario } = useContext(AuthContext);
  const [listaDeReceitas, setListaDeReceita] = useState([]);
  const categorias = ['Doce', 'Salgado', 'Salada',   'Bebida'];
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  async function carregarReceitas() {
    if(!usuario) {
      return [];
    }

    try { 
      const db = await conectarBanco();
      const receitas = await listarReceitas(db, usuario);
      
      // Atribui a resposta de listarReceitas para a listaDeReceitas
      setListaDeReceita(receitas); 
    } catch (error) {
      console.log('Erro no Component ', error);
      return [];
    }
  }
  
  // EXECUTAVA A FUNÇÃO SEMPRE QUE RECEBER O FOCO
  // CALLBACK ARMAZENA A FUNÇÃO
  useFocusEffect(
    useCallback(() => {
      carregarReceitas()
    }, [])
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.titulo}> Minhas receitas </Text>
          <Text style={styles.subtitulo}> Receitas que você mesmo criou </Text>
        </View>

        {/* OPCOES DE FILTRO CATEGORIA */}
        <View style={styles.opcoes}>
          {categorias.map((categoria, index) => (
            <Pressable 
              key={index}
              onPress={() => setCategoriaSelecionada(categoria)}
              style={[styles.categoria, categoriaSelecionada === categoria && styles.categoriaSelecionada]}
            >
              <Text style={categoriaSelecionada === categoria && styles.textoCategoriaSelecionada}>
                {categoria}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* LISTA DE CARDS */}
        <FlatList 
          data={listaDeReceitas} // lista
          numColumns={2} // num de colunas
          renderItem={({ item }) => ( // como cada item sera renderizado
            <ReceitaCard receita={item} />
          )}
          keyExtractor={item => item.id.toString()} // KeyExtractor espera uma string então é necessario converter
          columnWrapperStyle={{ gap: 16, marginBottom: 20 }}
          contentContainerStyle={{ marginTop: 40 }}
          ListEmptyComponent={ <Text>Nada por aqui</Text> }
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6E7',
  },
  conteudo: {
    padding: 24,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    width: '100%',
    alignSelf: 'flex-start',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0C343E'
  },
  subtitulo: {
    fontSize: 11,
    marginTop: 5,
    color: '#0C343E'
  },
  opcoes: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  categoria: {
    borderWidth: 1,
    borderColor: '#E5E0D0',
    backgroundColor: '#FFFBF3',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 18
  },
  categoriaSelecionada: {
    backgroundColor: '#0C343E',
    borderWidth: 0
  },
  textoCategoriaSelecionada: {
    color: '#ffff'
  },
});