import { Tabs } from 'expo-router';
import Ionicons from '@react-native-vector-icons/ionicons';
import { StyleSheet, View } from 'react-native';

function icone(ativo, inativo) {
  // Retorna um componente de ícone adaptado ao estado da aba.
  return function IconeDaAba({ focused, color, size }) {
    return (
      <Ionicons name={focused ? ativo : inativo} color={color} size={size} />
    );
  };
}

function BotaoPublicar({ focused }) {
  // O botão central troca as cores quando a aba está selecionada.
  return (
    <View style={[styles.botaoPublicar, focused && styles.botaoPublicarAtivo]}>
      <Ionicons name="add" color={focused ? '#0C343E' : '#FFBE31'} size={32} />
    </View>
  );
}

export default function TabLayout() {
  // Tabs mantém as áreas principais acessíveis pela barra inferior.
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0C343E',
        tabBarInactiveTintColor: '#66767A',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#FFFBF3',
          borderTopColor: '#E5E0D0',
          overflow: 'visible',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: icone('home', 'home-outline'),
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: 'Favoritos',
          tabBarIcon: icone('heart', 'heart-outline'),
        }}
      />
      <Tabs.Screen
        name="publicar"
        options={{
          title: 'Publicar',
          tabBarLabel: () => null,
          tabBarIcon: BotaoPublicar,
          tabBarIconStyle: styles.iconePublicar,
          tabBarItemStyle: styles.itemPublicar,
        }}
      />
      <Tabs.Screen
        name="minhas"
        options={{
          title: 'Minhas',
          tabBarIcon: icone('reader', 'reader-outline'),
        }}
      />
      <Tabs.Screen
        name="usuario"
        options={{
          title: 'Perfil',
          tabBarIcon: icone('person', 'person-outline'),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  itemPublicar: {
    overflow: 'visible',
  },
  iconePublicar: {
    width: 70,
    height: 70,
    marginTop: -22,
    overflow: 'visible',
  },
  botaoPublicar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0C343E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#FFF6E7',
  },
  botaoPublicarAtivo: {
    backgroundColor: '#FFBE31',
  },
});
