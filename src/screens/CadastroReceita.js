import { useContext, useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Ionicons from '@react-native-vector-icons/ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import { conectarBanco } from '../database/database';
import { atualizarReceita, buscarReceita, criarReceita } from '../services/ReceitaService';
import { validarReceita } from '../validators/ReceitaValidator';
import Input from '../components/Input';
import Label from '../components/Label';

const CATEGORIAS = ['Doce', 'Salgado', 'Salada', 'Bebida'];

export default function CadastroReceita() {
    const { id } = useLocalSearchParams();
    const receitaId = Array.isArray(id) ? id[0] : id;
    const editando = Boolean(receitaId);
    const { usuario } = useContext(AuthContext);
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [tempoPreparo, setTempoPreparo] = useState('');
    const [ingredienteAtual, setIngredienteAtual] = useState('');
    const [ingredientes, setIngredientes] = useState([]);
    const [preparoAtual, setPreparoAtual] = useState('');
    const [modoDePreparo, setModoDePreparo] = useState([]);
    const [erros, setErros] = useState({});
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        if (!receitaId) return;
        async function carregar() {
            const receita = await buscarReceita(await conectarBanco(), receitaId);
            if (!receita || receita.usuario_id !== usuario?.id) {
                Alert.alert('Receita não encontrada', 'Você só pode editar suas próprias receitas.', [{ text: 'Voltar', onPress: () => router.back() }]);
                return;
            }
            setNome(receita.nome);
            setCategoria(receita.categoria);
            setTempoPreparo(String(receita.tempoPreparo));
            setIngredientes(receita.ingredientes);
            setModoDePreparo(receita.modoDePreparo);
        }
        carregar();
    }, [receitaId, usuario?.id]);

    function adicionar(valor, definirValor, definirLista) {
        const item = valor.trim();
        if (!item) return;
        definirLista(lista => [...lista, item]);
        definirValor('');
    }

    function remover(indice, definirLista) {
        definirLista(lista => lista.filter((_, index) => index !== indice));
    }

    async function salvar() {
        const dados = { id: Number(receitaId), usuario_id: usuario?.id, nome, categoria, tempoPreparo, ingredientes, modoDePreparo };
        const novosErros = validarReceita(dados);
        setErros(novosErros);
        if (Object.keys(novosErros).length || !usuario) return;

        try {
            setSalvando(true);
            const db = await conectarBanco();
            if (editando) await atualizarReceita(db, dados);
            else await criarReceita(db, dados);
            Alert.alert(editando ? 'Receita atualizada!' : 'Receita publicada!', 'Os dados foram salvos com sucesso.', [
                { text: 'OK', onPress: () => router.replace('/(tabs)/minhas') },
            ]);
        } catch {
            Alert.alert('Não foi possível salvar', 'Tente novamente em instantes.');
        } finally {
            setSalvando(false);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <SafeAreaView style={styles.container} edges={['top']}>
                <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
                    <Text style={styles.titulo}>{editando ? 'Editar receita' : 'Nova receita'}</Text>
                    <Text style={styles.subtitulo}>{editando ? 'Atualize os dados da sua receita' : 'Compartilhe uma receita com a comunidade'}</Text>

                    <View style={styles.formulario}>
                        <Label texto="NOME DA RECEITA" />
                        <Input value={nome} onChangeText={setNome} placeholder="Ex.: Bolo de cenoura" error={erros.nome} />

                        <Label texto="CATEGORIA" />
                        <View style={styles.categorias}>
                            {CATEGORIAS.map(item => <Pressable key={item} onPress={() => setCategoria(item)} style={[styles.categoria, categoria === item && styles.ativa]}><Text style={categoria === item && styles.textoAtivo}>{item}</Text></Pressable>)}
                        </View>
                        {erros.categoria ? <Text style={styles.erro}>{erros.categoria}</Text> : null}

                        <Label texto="TEMPO DE PREPARO (MIN)" />
                        <Input value={tempoPreparo} onChangeText={setTempoPreparo} keyboardType="number-pad" placeholder="Ex.: 30" error={erros.tempoPreparo} />

                        <ListaEditavel
                            titulo="INGREDIENTES"
                            valor={ingredienteAtual}
                            setValor={setIngredienteAtual}
                            itens={ingredientes}
                            aoAdicionar={() => adicionar(ingredienteAtual, setIngredienteAtual, setIngredientes)}
                            aoRemover={indice => remover(indice, setIngredientes)}
                            placeholder="Ex.: 500 g de farinha"
                            erro={erros.ingredientes}
                        />
                        <ListaEditavel
                            titulo="MODO DE PREPARO"
                            valor={preparoAtual}
                            setValor={setPreparoAtual}
                            itens={modoDePreparo}
                            aoAdicionar={() => adicionar(preparoAtual, setPreparoAtual, setModoDePreparo)}
                            aoRemover={indice => remover(indice, setModoDePreparo)}
                            placeholder="Descreva uma etapa..."
                            erro={erros.modoDePreparo}
                        />

                        <TouchableOpacity disabled={salvando} style={[styles.botao, salvando && styles.desabilitado]} onPress={salvar}>
                            <Ionicons name="save-outline" size={20} color="#0C343E" />
                            <Text style={styles.textoBotao}>{salvando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Publicar receita'}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

function ListaEditavel({ titulo, valor, setValor, itens, aoAdicionar, aoRemover, placeholder, erro }) {
    return <View style={styles.secao}>
        <Label texto={titulo} />
        <View style={styles.linhaAdicionar}>
            <Input style={styles.inputLista} value={valor} onChangeText={setValor} placeholder={placeholder} onSubmitEditing={aoAdicionar} />
            <Pressable accessibilityLabel={`Adicionar em ${titulo}`} style={styles.adicionar} onPress={aoAdicionar}><Ionicons name="add" size={25} color="#0C343E" /></Pressable>
        </View>
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        {itens.map((item, index) => <View style={styles.item} key={`${item}-${index}`}><Text style={styles.textoItem}>{item}</Text><Pressable onPress={() => aoRemover(index)}><Ionicons name="trash-outline" color="#B3261E" size={19} /></Pressable></View>)}
    </View>;
}

const styles = StyleSheet.create({
    flex: { flex: 1 }, container: { flex: 1, backgroundColor: '#FFF6E7' }, conteudo: { padding: 20, paddingBottom: 45 },
    titulo: { fontSize: 25, fontWeight: 'bold', color: '#0C343E' }, subtitulo: { color: '#66767A', marginTop: 3 }, formulario: { marginTop: 26 },
    categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 }, categoria: { borderWidth: 1, borderColor: '#E5E0D0', backgroundColor: '#FFFBF3', padding: 9, paddingHorizontal: 14, borderRadius: 18 },
    ativa: { backgroundColor: '#0C343E' }, textoAtivo: { color: '#FFF' }, erro: { color: '#B3261E', fontSize: 12, marginBottom: 10 },
    secao: { marginTop: 10 }, linhaAdicionar: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 }, inputLista: { flex: 1 },
    adicionar: { width: 42, height: 42, borderRadius: 10, backgroundColor: '#FFBE31', justifyContent: 'center', alignItems: 'center' },
    item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEE5D5', padding: 10, borderRadius: 12, marginBottom: 6 }, textoItem: { flex: 1, color: '#0C343E' },
    botao: { marginTop: 32, height: 52, borderRadius: 12, backgroundColor: '#FFBE31', flexDirection: 'row', gap: 8, justifyContent: 'center', alignItems: 'center' }, textoBotao: { color: '#0C343E', fontSize: 16, fontWeight: 'bold' }, desabilitado: { opacity: 0.6 },
});
