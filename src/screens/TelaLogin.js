import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import { validarLogin } from "../validators/AuthValidator";
import { conectarBanco } from "../database/database";
import { realizarLogin } from "../services/AuthService";
import  { AuthContext } from "../context/AuthContext";
import  Input  from "../components/Input";
import Label from "../components/Label";

export default function TelaLogin({ navigation }) {

    // Permite acesso a função do Context
    const { definirUsuario } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erros, setErros] = useState({ email: '', senha: '' });
    const [erroLogin, setErroLogin] = useState('');
    
    async function enviarLogin() {
        const resultado = validarLogin(email, senha);
        setErros(resultado);

        // compara se o valor do erro retornado é diferente de ''
        const possuiErros = Object.values(resultado)
            .some(erro => erro !== '');

        if (possuiErros) {
            return;
        }
        
        try{
            const db = await conectarBanco();
            
            const usuario = {
                email: email,
                senha: senha
            }

            const usuario_logado = await realizarLogin(db, usuario)    
            if(usuario_logado) {
                definirUsuario({
                    id: usuario_logado.id,
                    nome: usuario_logado.nome,
                    email: usuario_logado.email
                });

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Principal' }]
                })
            }

        } catch (error) {
            setErroLogin(error.message);
        }

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
                {/* EMAIL */}
                <Label texto={'E-MAIL'}/>
                <Input 
                    value={email}
                    onChangeText={setEmail}
                    placeholder='seuemail@exemplo.com'
                    keyboardType="email-address"
                    error={erros.email}
                />

                {/* SENHA */}
                <Label texto={'SENHA'} />
                <Input
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="senha_exemplo123"
                    secureTextEntry
                    error={erros.senha}
                />

                {erroLogin ? <Text style={styles.msgErroLogin}>{ erroLogin }</Text> : null}


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
    },
    msgErroLogin: {
        textAlign: 'center',
        color: '#e53935',
        fontSize: 14,
        marginTop: 10, // -10, porque o input da um marginBottom de 10
    }
});