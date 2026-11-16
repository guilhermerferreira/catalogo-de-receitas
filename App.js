import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TelaLogin from './src/screens/TelaLogin';
import TelaCadastro from './src/screens/TelaCadastro';
import TelaInicial from './src/screens/TelaInicial';
import TabNavigator from './src/navigation/TabNavigator';

const Stack = createNativeStackNavigator();

// Navegador Principal
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Principal'>
        {/* Telas de autenticação */}
        <Stack.Screen name='Inicial' component={TelaInicial} />
        <Stack.Screen name='Login' component={TelaLogin} />
        <Stack.Screen name='Cadastro' component={TelaCadastro} />

        {/* Screen após o LOGIN */}
        <Stack.Screen name='Principal' component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

