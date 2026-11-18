import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import TelaLogin from './src/screens/TelaLogin';
import TelaCadastro from './src/screens/TelaCadastro';
import TelaInicial from './src/screens/TelaInicial';
import TabNavigator from './src/navigation/TabNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Inicial"
          screenOptions={{ headerShown: false }}
        >
          {/* Telas de autenticação */}
          <Stack.Screen name="Inicial" component={TelaInicial} />
          <Stack.Screen name="Login" component={TelaLogin} />
          <Stack.Screen name="Cadastro" component={TelaCadastro} />

          {/* Screen após o LOGIN */}
          <Stack.Screen name="Principal" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
