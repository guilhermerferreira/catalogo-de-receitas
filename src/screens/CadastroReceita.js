import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import Label from "../components/Label";
import { useState } from "react";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function CadastroReceita() {
    const categorias = ['Doce', 'Salgado', 'Salada', 'Bebida'];
    const [categoriaSelecionada, SetCategoriaSelecionada] = useState('');
    const [ingredienteAtual, setIngredienteAtual] = useState('');
    const [ingredientes, setIngredientes] = useState([]);
    const [preparoAtual, setPreparoAtual] = useState('');
    const [modoDePreparo, setModoDePreparo] = useState([]);

    function adicionarIngrediente() {
        if (!ingredienteAtual.trim()) {
            return;
        }

        setIngredientes([...ingredientes, ingredienteAtual]);
    }

    function adicionarModoDePreparo() {
        if (!preparoAtual.trim()) {
            return;
        }

        setModoDePreparo([...modoDePreparo, preparoAtual]);
    }

    function removerModoDePreaparo(){

    }

    return (

        
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.titulo}> Nova receita </Text>
                <Text style={styles.subtitulo}> Compartilhe uma receita com a comunidade </Text>
            </View>

            {/* FORMULÁRIO */}
            <View style={styles.formContainer}>

                {/* AQUI VAI SER ONDE O USUARIO COLOCA A FOTO */}
                <View>

                </View>

                {/* NOME DA RECEITA */}
                <Label texto={'NOME DA RECEITA'}/>
                <Input placeholder="Ex: Bolo de cenoura"/>

                {/* CATEGORIAS */}
                <Label texto={'CATEGORIA'}/>
                <View style={styles.opcoes}>
                    {/* BOTÃO CATEGORIA */}
                    {categorias.map((categoria, index ) => (
                        <Pressable 
                            key={index} 
                            onPress={() => SetCategoriaSelecionada(categoria)}
                            style={[styles.categoria, 
                                categoriaSelecionada === categoria && styles.categoriaSelecionada
                            ]}
                        > 
                            {/* TEXTO BOTÃO CATEGORIA  */}
                            <Text 
                                style={[styles.textoCategoria,
                                     categoriaSelecionada === categoria && styles.textoCategoriaSelecionada
                                ]}
                            >
                                {categoria}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                {/* TEMPO DE PREPARO */}
                <Label texto={'TEMPO DE PREPARO (MIN)'}/>
                <Input 
                    style={{ height: 50 }}
                    placeholder="    Ex: 30"
                />

                {/* INGREDIENTES */}
                <View style={styles.secao}>

                    <Label texto={'INGREDIENTES'}/>
                    <View style={styles.linhaAdicionar}>
                        <Input 
                            style={{ width: '85%'}}
                            value={ingredienteAtual}
                            onChangeText={setIngredienteAtual}
                            placeholder="Liste ingredientes e quantidades..."
                        />
                        {/* BOTAO ADICIONAR */}
                        <Pressable style={styles.botaoAdicionar} onPress={adicionarIngrediente}>
                            <Text style={styles.textoBotao}> + </Text>
                        </Pressable>
                    </View>
                    {/* LISTA DE INGREDIENTES */}
                    {ingredientes.map((item, index) => (
                        <View style={styles.itemLista} key={index}> 
                            <Text style={styles.textoIem}> { item } </Text>
                        </View>
                    ))}
                </View>
                
                {/* MODO DE PREPARO */}
                <View style={styles.secao}>
                    <Label texto={'MODO DE PREPARO'}/>

                    <View style={styles.linhaAdicionar}>
                        <Input 
                            style={{ width: '85%'}}
                            value={preparoAtual}
                            onChangeText={setPreparoAtual}
                            placeholder="Descreva o passo a passo da receita..."
                        />
                        {/* BOTAO ADICIONAR */}
                        <Pressable style={styles.botaoAdicionar} onPress={adicionarModoDePreparo}>
                            <Text style={styles.textoBotao}> + </Text>
                        </Pressable>
                    </View>

                    {/* LISTA DO MODO DE PREPARO */}
                    {modoDePreparo.map((item, index) => (
                        <View style={styles.itemLista} key={index}> 
                            <Text style={styles.textoItem}> { item } </Text>
                            {/* BOTÃO REMOVER */}
                            <Pressable style={styles.iconeRemover} onPress={removerModoDePreaparo}>
                                <Ionicons name={'trash'} color={'red'} size={18} />
                            </Pressable>
                        </View>
                    ))}
                </View>
                
                {/* BOTAO DE ENVIAR FORMULARIO */}
                <TouchableOpacity 
                    style={styles.botaoPublicar} 
                    activeOpacity={0.7}>
                        <Text style={styles.textoBotaoPublicar}>Publicar Receita</Text>
                </TouchableOpacity>

            </View>      
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF6E7',
    },
    contentContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24
    },
    header: {
        width: '100%',
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
    formContainer: {
        flex: 1,
        width: '100%',
        marginTop: 40
    },
    opcoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
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
    secao: {
        width: '100%'
    },
    linhaAdicionar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    botaoAdicionar: {
        backgroundColor: '#FFBE31',
        width: 35,
        height: 35,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textoBotao: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0C343E',
    },
    itemLista: {
        display: 'flex',
        backgroundColor: '#E5E0D0',
        width: '100%',
        flexDirection: 'row',
        padding: 6,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 5
    },
    textoItem: {
        color: '#0C343E',
        marginLeft: 10
    },
    iconeRemover: {
        marginRight: 3
    },
    botaoPublicar: {
        width: '100%',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 12,
        backgroundColor: '#FFBE31'
    },
    textoBotaoPublicar: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0C343E',
    }
})