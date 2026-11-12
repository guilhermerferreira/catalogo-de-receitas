import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import  Input  from "../components/Input";
import Label from "../components/Label";
import { useState } from "react";

export default function TelaLogin({ navigation }) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function validarformulario() {
        if (!email || !senha) {
            alert('Preencha os campos corretamente.');
            return false;
        }

        alert('Formulario enviado com sucesso');
        return true;
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
                />
                <Label texto={'SENHA'} />
                <Input
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="senha_exemplo123"
                    secureTextEntry
                />

                <TouchableOpacity 
                    style={styles.botao}
                    // onPress={() => navigation.navigate('Home')} 
                    activeOpacity={0.7}
                    onPress={() => validarformulario()}
                >
                    <Text>Entrar</Text>
                </TouchableOpacity>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
                <Text>Não tem uma conta? Cadastre-se</Text>
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
    marginTop: 40,
    backgroundColor: '#FFBE31',
    alignItems: 'center'
  }
});