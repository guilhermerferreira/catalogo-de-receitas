import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import  Input  from "../components/Input";
import Label from "../components/Label";
import { validarLogin } from "../validators/AuthValidator";
import { useState } from "react";

export default function TelaLogin({ navigation }) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erros, setErros] = useState({ email: '', senha: '' });
    
    function enviarLogin() {
        const resultado = validarLogin(email, senha);
        setErros(resultado);

        // compara se o valor do erro retornado é diferente de ''
        const possuiErros = Object.values(resultado)
            .some(erro => erro !== '');

        if (possuiErros) {
            return;
        }

        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.titulo}>Faça seu login</Text>
                <Text style={styles.subtitulo}>É um prazer ter você de volta!</Text>
            </View>

            {/* FORMULÁRIO */}
            <View style={styles.formContainer}>
                <Label texto={'E-MAIL'}/>
                <Input 
                    value={email}
                    onChangeText={setEmail}
                    placeholder='seuemail@exemplo.com'
                    keyboardType="email-address"
                    error={erros.email}
                />

                <Label texto={'SENHA'} />
                <Input
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="senha_exemplo123"
                    secureTextEntry
                    error={erros.senha}
                />

                {/* BOTÃO */}
                <TouchableOpacity 
                    style={styles.botao}
                    onPress={() => enviarLogin()}
                    activeOpacity={0.7}
                >
                    <Text style={styles.textoBotao}>Entrar</Text>
                </TouchableOpacity>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
                <Text style={styles.textoFooter}>
                    Não tem uma conta? 
                    <Text style={styles.link} onPress={() => navigation.navigate('Cadastro')} > Crie sua conta! </Text>
                </Text>
            </View>
        </View>
    );  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF6E7',
        alignItems: 'center',
        justifyContent: 'space-between',    
        padding: 24,
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
    formContainer: {
        flex: 1,
        width: '100%',
        marginTop: 150
    },
    botao: {
        padding: 12,
        borderRadius: 8,
        marginTop: 80,
        backgroundColor: '#FFBE31',
        alignItems: 'center',
        color: '#0C343E'
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
        color: '#0C343E',
    },
    link: {
        fontWeight: 'bold',
        color: 'blue'
    }
});