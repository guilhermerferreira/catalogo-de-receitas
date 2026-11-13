import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Label from "../components/Label";
import Input from "../components/Input";
import { useState } from "react";
import { validarCadastro } from "../validators/AuthValidator";

export default function TelaCadastro({navigation}) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [erros, setErros] = useState({
        nome: '', email: '', senha: '', confirmaSenha: ''
    })
    
    function enviaCadastro() {
        const resultado = validarCadastro(nome, email, senha, confirmaSenha);
        setErros(resultado);

        const possuiErros = Object.values(resultado)
            .some( erro => erro !== '' );

        if (possuiErros) {
            return;
        }

        alert('Formulario Cadastrado com sucesso!');
        setTimeout(300);
        navigation.navigate('Login');
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Crie sua conta</Text>
                <Text style={styles.subtitulo}>Entre para a comunidade PITADA</Text>
            </View>

            <View style={styles.formContainer}>

                <Label texto={'NOME'} />
                <Input
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Como podemos te chamar?"
                    error={erros.nome}
                />                
                <Label texto={'E-MAIL'} />
                <Input
                    value={email}
                    onChangeText={setEmail}
                    placeholder="seuemail@exemplo.com"
                    error={erros.email}
                    keyboardType="email-address"
                />                
                <Label texto={'SENHA'} />
                <Input
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="Crie uma senha"
                    error={erros.senha}
                    secureTextEntry
                />   
                <Label texto={'CONFIRMAR SENHA'} />
                <Input
                    value={confirmaSenha}
                    onChangeText={setConfirmaSenha}
                    placeholder="Digite novamente"
                    error={erros.confirmaSenha}
                    secureTextEntry
                />        

                {/* BOTÃO */}
                <TouchableOpacity 
                    style={styles.botao}
                    onPress={() => enviaCadastro()}
                    activeOpacity={0.7}
                >
                    <Text style={styles.textoBotao}>Criar minha conta</Text>
                </TouchableOpacity>                                     
            </View>

            <View style={styles.footer}>
                <Text style={styles.textoFooter}>Já tem conta?
                    <Text style={styles.link} onPress={() => navigation.navigate('Login')}> Entrar</Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF6E7',
        padding: 24,
        justifyContent: 'space-between',
        alignItems: 'center'
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
        marginTop: 80
    },
    botao: {
        alignItems: 'center',
        backgroundColor: '#FFBE31',
        padding: 12,
        borderRadius: 8,
        marginTop: 40,
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
})