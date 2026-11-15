import { Pressable, StyleSheet, Text, View } from "react-native";
import Input from "../components/Input";
import Label from "../components/Label";
import { useState } from "react";

export default function CadastroReceita({navigation}) {
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

        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.titulo}> Nova receita </Text>
                <Text style={styles.subtitulo}> Compartilhe uma receita com a comunidade </Text>
            </View>

            {/* FORMULÁRIO */}
            <View style={styles.formContainer}>
                <Label texto={'NOME DA RECEITA'}/>
                <Input placeholder="Ex: Bolo de cenoura"/>

                <View style={styles.opcoes}>
                    <Label texto={'CATEGORIA'}/>
                    {/* SERÃO CARDS CLICÁVEIS */}
                </View>

                <Label texto={'TEMPO DE PREPARO (MIN)'}/>
                <Input placeholder="Ex: 30"/>

                {/* AQUI VAI SER UMA LISTA QUE VAI ACRESCENTAR CADA INGREDIENTE */}
                <View style={styles.secao}>
                    <Label texto={'INGREDIENTES'}/>
                    <View style={styles.linhaAdicionar}>
                        <Input 
                            style={{ width: '85%'}}
                            value={ingredienteAtual}
                            onChangeText={setIngredienteAtual}
                            placeholder="Liste ingredientes e quantidades..."
                        />
                        <Pressable style={styles.botaoAdicionar} onPress={adicionarIngrediente}>
                            <Text style={styles.textoBotao}> + </Text>
                        </Pressable>
                    </View>

                    {ingredientes.map((item, index) => (
                        <View style={styles.itemLista} key={index}> 
                            <Text style={styles.textoIem}> { item } </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.secao}>
                    <Label texto={'MODO DE PREPARO'}/>
                    <View style={styles.linhaAdicionar}>
                        <Input 
                            style={{ width: '85%'}}
                            value={preparoAtual}
                            onChangeText={setPreparoAtual}
                            placeholder="Descreva o passo a passo da receita..."
                        />
                        <Pressable style={styles.botaoAdicionar} onPress={adicionarModoDePreparo}>
                            <Text style={styles.textoBotao}> + </Text>
                        </Pressable>
                    </View>

                    {modoDePreparo.map((item, index) => (
                        <View style={styles.itemLista} key={index}> 
                            <Text style={styles.textoIem}> { item } 
                            </Text>
                            <Pressable style={styles.botaoRemover}  onPress={removerModoDePreaparo}>
                                <Text>  X </Text>
                            </Pressable>
                        </View>
                    ))}
                </View>

            </View>      

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#FFF6E7',
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
        marginTop: 50
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
        color: '#0C343E'
    },
    itemLista: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        padding: 7,
        borderRadius: 10,
        backgroundColor: '#FFFBF3',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textoIem: {
        color: '#0C343E',
        marginLeft: 10
    },
    botaoRemover: {
        backgroundColor: '#FFBE31',
        padding: 2,
        borderRadius: 5,
    }

})