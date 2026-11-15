import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaLogin from './src/screens/TelaLogin';
import { NavigationContainer } from '@react-navigation/native';
import TelaHome from './src/screens/TelaHome';
import TelaCadastro from './src/screens/TelaCadastro';
import TelaInicial from './src/screens/TelaInicial';
import CadastroReceita from './src/screens/CadastroReceita';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='CadastroReceita'>
        <Stack.Screen name='CadastroReceita' component={CadastroReceita} />
        <Stack.Screen name='Inicial' component={TelaInicial} />
        <Stack.Screen name='Login' component={TelaLogin} />
        <Stack.Screen name='Home' component={TelaHome} />
        <Stack.Screen name='Cadastro' component={TelaCadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

