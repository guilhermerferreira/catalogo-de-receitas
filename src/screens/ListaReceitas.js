import { Text, View, StyleSheet } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TelaHome() {

const { usuario } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        <Text> LISTA RECEITA </Text>
        <Text>{ usuario?.nome }</Text>
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