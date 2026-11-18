import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_FILTRO = '@pitada:ultimo-filtro';

export async function salvarUltimoFiltro(categoria) {
    await AsyncStorage.setItem(CHAVE_FILTRO, categoria);
}

export async function carregarUltimoFiltro() {
    return (await AsyncStorage.getItem(CHAVE_FILTRO)) || 'Todos';
}
