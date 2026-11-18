import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SobreAplicativo() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        <View style={styles.marca}>
          <Text style={styles.logo}>Pitada</Text>
          <Text style={styles.versao}>
            Versão {Constants.expoConfig?.version || '1.0.0'}
          </Text>
        </View>
        <Text style={styles.titulo}>Seu livro de receitas</Text>
        <Text style={styles.texto}>
          Descubra, organize e compartilhe receitas. Busque pelo nome, filtre
          por categoria e guarde suas favoritas para encontrar depois.
        </Text>
        <Text style={styles.rodape}>Grupo 2 · Catálogo de receitas</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF6E7' },
  conteudo: { flex: 1, padding: 24 },
  marca: {
    backgroundColor: '#0C343E',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  logo: { color: '#FFF6E7', fontSize: 42, fontWeight: 'bold' },
  versao: { color: '#FFBE31', marginTop: 8 },
  titulo: { color: '#0C343E', fontSize: 22, fontWeight: 'bold', marginTop: 30 },
  texto: { color: '#52666B', fontSize: 16, lineHeight: 24, marginTop: 12 },
  rodape: { color: '#66767A', marginTop: 'auto', textAlign: 'center' },
});
