import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';


export default function TelaInicial() {
    return (
        <SafeAreaView style={styles.container}>

            <Image // é necessario que seja o primeiro elemento, para ser a base e não sobrepor
                source={require('../../assets/fundo-pagina-inicial.png')}
                resizeMode="cover"
                style={styles.backgroundImage}
            />

            <View style={styles.overlay}>

                {/* CONTAINER IMAGEM */}
                <View style={styles.containerImagem}>
                    <Image style={styles.imagem} source={require('../../assets/logo.png')} />
                </View>

                {/* CONTEUDO */}
                <View style={styles.conteudo}>
                    <>
                        <Text style={styles.titulo}>SUA PRÓXIMA RECEITA COMEÇA AQUI.</Text>
                        <Text style={styles.subtitulo}>Receitas para descobrir, guardar e compartilhar.</Text>
                    </>

                    {/* BOTÃO */}
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={() => router.push('/login')}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.textoBotao}>Entrar</Text>
                    </TouchableOpacity>
                </View>

                {/* FOOTER */}
                <View style={styles.footer}>
                    <Text style={styles.textoFooter}>
                        Ainda não tem conta? 
                        <Text style={styles.link} onPress={() => router.push('/cadastro')} > Crie uma conta! </Text>
                    </Text>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {    
        flex: 1, // tela inteira
        backgroundColor: '#0C343E', // Cor de fundo de segurança
    },
    backgroundImage: {
        position: 'absolute', // Retira o elemento do fluxo normal e o fixa nas bordas do elemento pai (IMAGEM DE FUNDO)
        width: '100%',
        height: '100%',
    },
    overlay: { // herdou oque havia no container, responsavel pelo conteudo
        flex: 1, // garente que ira ocupar a tela inteira
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24, 
        marginTop: 40 
    },
    containerImagem: {
        width: '100%',
        padding: 30,
        alignItems: 'center'
    },
    imagem: {
        width: 300,
        height: 300
    },
    conteudo: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF9E9'
    },
    subtitulo: {
        color: '#FFF9E9',
        marginTop: 5,
        fontSize: 12,
    },
    botao: {
        width: '100%',
        padding: 12,
        borderRadius: 8,
        marginTop: 80,
        alignItems: 'center',
        backgroundColor: '#FFBE31',
    },
    textoBotao: {
        fontWeight: 'bold',
        color: '#0C343E'
    },
    footer: {
        fontSize: 13,
        alignItems: 'center'
    },
    textoFooter: {
        color: '#FFF9E9',
    },
    link: {
        fontWeight: 'bold',
        color: '#ffff'
    }
})
