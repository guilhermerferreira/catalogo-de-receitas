import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function Usuario() {
    
    const { usuario, logout } = useContext(AuthContext);
    
    const iniciais = usuario?.nome
        ? usuario.nome.trim().split(/\s+/).slice(0, 2).map(nome => nome[0]).join('').toUpperCase()
        : 'U';

    function sair() {
        logout();

        router.replace('/login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.conteudo}>

                <Text style={styles.subtitulo}>
                    Seu cantinho na comunidade PITADA
                </Text>

                <View style={styles.perfil}>
                    <View style={styles.avatar}>
                        <Text style={styles.iniciais}>{iniciais}</Text>
                    </View>

                    <View>
                        <Text style={styles.nome}>
                            {usuario?.nome || 'Usuário'}
                        </Text>

                        <Text style={styles.descricao}>
                            Minhas receitas e descobertas
                        </Text>
                    </View>
                </View>

                <View style={styles.divisor} />

                <View style={styles.opcoes}>

                    <TouchableOpacity style={styles.opcao} onPress={() => router.push('/usuario/editar-perfil')}>
                        <Ionicons name="person-outline" size={20} color="#0C343E" />
                        <Text style={styles.textoOpcao}>Editar perfil</Text>
                        <Ionicons name="chevron-forward" size={20} color="#888" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opcao} onPress={() => router.push('/usuario/configuracoes')}>
                        <Ionicons name="settings-outline" size={20} color="#0C343E" />
                        <Text style={styles.textoOpcao}>Configurações</Text>
                        <Ionicons name="chevron-forward" size={20} color="#888" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opcao} onPress={() => router.push('/usuario/sobre')}>
                        <Ionicons name="information-circle-outline" size={20} color="#0C343E" />
                        <Text style={styles.textoOpcao}>Sobre o aplicativo</Text>
                        <Ionicons name="chevron-forward" size={20} color="#888" />
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={styles.botaoSair} onPress={sair}>
                    <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
                    <Text style={styles.textoSair}>Sair</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF6E7',
        
    },
    conteudo: {
        flex: 1,
        padding: 12,
    },
    subtitulo: {
        color: '#777',
        fontSize: 13,
        marginBottom: 12,
    },

    perfil: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFBE31',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    iniciais: {
        fontSize: 22,
        color: '#0C343E',
        fontWeight: 'bold',
    },

    nome: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0C343E',
        marginBottom: 5,
    },

    descricao: {
        fontSize: 13,
        color: '#777',
    },

    divisor: {
        height: 1,
        backgroundColor: '#E5DCCB',
        marginBottom: 20,
    },

    opcoes: {
        gap: 4,
    },

    opcao: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 10,
    },

    textoOpcao: {
        flex: 1,
        fontSize: 16,
        color: '#0C343E',
    },

    botaoSair: {
        backgroundColor: '#0C343E',
        height: 50,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 40,
    },

    textoSair: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
