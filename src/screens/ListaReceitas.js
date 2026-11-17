import { Text, View, StyleSheet } from "react-native";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { conectarBanco } from "../database/database";
import { listarReceitas } from "../services/ReceitaService";
import  ReceitaCard  from "../components/ReceitaCard";

export default function ListaReceitas() {

  const { usuario } = useContext(AuthContext);
  const [listaDeReceitas, setListaDeReceita] = useState([]);
  
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
  
  // EXECUTAVA A FUNÇÃO 1 UNICA VEZ QUANDO O COMPONENTE É ABERTO
  useEffect(() => {
    carregarReceitas()
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        <Text> LISTA RECEITA </Text>

        {listaDeReceitas.map( receita => (
          <View style={styles.containerCard}>
            <ReceitaCard key={receita.id} receita={receita} />
          </View>
        ))}

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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      marginTop: 40
  }
});