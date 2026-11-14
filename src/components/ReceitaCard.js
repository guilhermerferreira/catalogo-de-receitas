import { Pressable, Image, View, Text, StyleSheet } from "react-native";

export default function ReceitaCard({ receita, onPress, estilo = 'normal' }) {
    return (
        <Pressable onPress={onPress} style={[styles.card, estilo === 'destaque' && styles.cardDestaque]} >
            <Image 
                style={styles.imagem}
                source={require('../../assets/macarrao-vermelho.png')}
            />

            <View style={styles.informacoes}>
                <Text style={styles.nomeReceita}> { receita?.nome } Macarrão</Text>
                <Text style={styles.infoReceita}>
                    { receita?.tempo && receita?.dificuldade }
                    30 min  * Dificil
                </Text>
            </View>

        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 170,
        height: 170,
        borderTopEndRadius: 12,
    },
    imagem: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },  
    informacoes: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#0C343E',
        height: 60,
        justifyContent: 'center',
    },
    nomeReceita: {
        color: '#ffff',
        fontWeight: 'bold'
    },  
    infoReceita: {
        color: '#ffff',
        marginTop: 5,
        marginLeft: 5,
        fontSize: 13
    },
    cardDestaque: {
        width: 300,
        height: 250,
    }
})