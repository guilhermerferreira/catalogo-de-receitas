import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function Configuracoes() {
    return <SafeAreaView style={styles.container}><View style={styles.conteudo}><Text style={styles.titulo}>Configurações</Text><Text style={styles.subtitulo}>Preferências do aplicativo</Text><View style={styles.card}><Ionicons name="funnel-outline" size={24} color="#0C343E" /><View style={styles.textos}><Text style={styles.nome}>Último filtro de categoria</Text><Text style={styles.descricao}>O PITADA memoriza automaticamente o último filtro usado no catálogo.</Text></View></View></View></SafeAreaView>;
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#FFF6E7' }, conteudo: { padding: 20 }, titulo: { fontSize: 25, fontWeight: 'bold', color: '#0C343E' }, subtitulo: { color: '#66767A', marginTop: 3 }, card: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#FFFBF3', borderWidth: 1, borderColor: '#E5E0D0', borderRadius: 14, padding: 16, marginTop: 30 }, textos: { flex: 1, marginLeft: 12 }, nome: { fontWeight: 'bold', color: '#0C343E' }, descricao: { color: '#66767A', lineHeight: 20, marginTop: 5 } });
