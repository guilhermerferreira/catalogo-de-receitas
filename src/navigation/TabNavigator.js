import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import { StyleSheet, View } from 'react-native';
import TelaHome from '../screens/TelaHome';
import ListaReceitasFavoritas from '../screens/ListaReceitasFavoritas';
import CadastroReceita from '../screens/CadastroReceita';
import ListaReceitas from '../screens/ListaReceitas';
import Usuario from '../screens/Usuario';

const Tab = createBottomTabNavigator();

function icone(ativo, inativo) {
  return function IconeDaAba({ focused, color, size }) {
    return (
      <Ionicons name={focused ? ativo : inativo} color={color} size={size} />
    );
  };
}

function BotaoPublicar({ focused }) {
  return (
    <View style={[styles.botaoPublicar, focused && styles.botaoPublicarAtivo]}>
      <Ionicons name="add" color={focused ? '#0C343E' : '#FFBE31'} size={32} />
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
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
      <Tab.Screen
        name="Inicio"
        component={TelaHome}
        options={{ title: 'Início', tabBarIcon: icone('home', 'home-outline') }}
      />
      <Tab.Screen
        name="Favoritos"
        component={ListaReceitasFavoritas}
        options={{ tabBarIcon: icone('heart', 'heart-outline') }}
      />
      <Tab.Screen
        name="PublicarReceita"
        component={CadastroReceita}
        options={{
          title: 'Publicar receita',
          tabBarLabel: () => null,
          tabBarIcon: BotaoPublicar,
          tabBarIconStyle: styles.iconePublicar,
          tabBarItemStyle: styles.itemPublicar,
        }}
      />
      <Tab.Screen
        name="MinhasReceitas"
        component={ListaReceitas}
        options={{
          title: 'Minhas receitas',
          tabBarIcon: icone('reader', 'reader-outline'),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Usuario}
        options={{ tabBarIcon: icone('person', 'person-outline') }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  itemPublicar: { overflow: 'visible' },
  iconePublicar: { width: 70, height: 70, marginTop: -22, overflow: 'visible' },
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
  botaoPublicarAtivo: { backgroundColor: '#FFBE31' },
});
