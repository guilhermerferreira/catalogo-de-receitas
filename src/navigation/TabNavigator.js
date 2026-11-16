import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import TelaHome from '../screens/TelaHome';
import CadastroReceita from '../screens/CadastroReceita';
import ListaReceitasFavoritas from '../screens/ListaReceitasFavoritas';
import Usuario from '../screens/Usuario';
import ListaReceitas from '../screens/ListaReceitas';

export default function TabNavigator() {

    const Tab = createBottomTabNavigator();

    return (
        // ScreenOptions aplica uma configuração padrao a todas as abas de uma vez
        <Tab.Navigator initialRouteName='Home' screenOptions={{
            tabBarActiveTintColor: '#022730', 
            tabBarInactiveTintColor: '#022730', 
            tabBarStyle: { backgroundColor: '#FFFBF3', borderWidth: 1, borderColor: '#E5E0D0' }
        }}>

            {/* SCRENN HOME */}
            <Tab.Screen name='Home' component={TelaHome} options={{
                // tabBarIcon - recebe uma função que retorna o icone, conforme o estado: focada ou não
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name=
                        {focused ? 'home' : 'home-outline'} 
                        color={color} 
                        size={size} 
                    />
                )
            }} />

            {/* SCREEN DE RECEITAS FAVORITAS */}
            <Tab.Screen name='Favoritos' component={ListaReceitasFavoritas} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons 
                        name={focused ? 'heart' : 'heart-outline'}
                        color={color}
                        size={size}
                    />
                )
            }} />

            {/* SCREE de CADASTRO - icon recebe um estilo separado */}
            <Tab.Screen name='CadastroDeReceita' component={CadastroReceita} options={{ 
                tabBarLabel: () => null, // retira o texto do icone
                tabBarIcon: ({ focused, size  }) => (
                    <Ionicons 
                        name={focused ? 'add-circle' : 'add-circle'} 
                        color={focused ? '#FFBE31' : '#0C343E'} 
                        size={size + 34}
                    />
                ),
                tabBarIconStyle: {
                    overflow: 'visible',
                    width: 55,
                    height: 55,
                    alignItems: 'center',
                    marginTop: -20,
                }
            }} />

            <Tab.Screen name='Minhas' component={ListaReceitas} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons 
                        name={focused ? 'reader' : 'reader-outline'}
                        color={color}
                        size={size}
                    />
                )
            }} />

            {/* SCREEN DE USUARIO */}
            <Tab.Screen name='Usuário' component={Usuario} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons 
                        name={focused ? 'person' : 'person-outline'}
                        color={color}
                        size={size}
                    />
                )
            }} />


            
        </Tab.Navigator>
    );
}