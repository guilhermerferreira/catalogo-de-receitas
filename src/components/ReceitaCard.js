import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function ReceitaCard({
  receita,
  onPress,
  onFavorite,
  estilo = 'normal',
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.card, estilo === 'destaque' && styles.cardDestaque]}
    >
      <View style={styles.ilustracao}>
        <Ionicons name="restaurant-outline" size={42} color="#0C343E" />
        <Pressable
          accessibilityLabel={
            receita?.favorita
              ? 'Remover dos favoritos'
              : 'Adicionar aos favoritos'
          }
          hitSlop={10}
          onPress={(evento) => {
            evento.stopPropagation();
            onFavorite?.(receita);
          }}
          style={styles.coracao}
        >
          <Ionicons
            name={receita?.favorita ? 'heart' : 'heart-outline'}
            size={24}
            color={receita?.favorita ? '#C83E4D' : '#0C343E'}
          />
        </Pressable>
      </View>
      <View style={styles.informacoes}>
        <Text style={styles.nomeReceita} numberOfLines={1}>
          {receita?.nome}
        </Text>
        <Text style={styles.infoReceita}>
          {receita?.tempoPreparo || 0} min · {receita?.categoria}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 145,
    height: 170,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFE2A3',
  },
  cardDestaque: { width: '100%', height: 230 },
  ilustracao: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  coracao: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  informacoes: {
    backgroundColor: '#0C343E',
    minHeight: 62,
    padding: 10,
    justifyContent: 'center',
  },
  nomeReceita: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  infoReceita: { color: '#FFF', marginTop: 5, fontSize: 12 },
});
