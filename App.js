import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import TelaInicial from './src/screens/TelaInicial';
import TelaLogin from './src/screens/TelaLogin';
import TelaCadastro from './src/screens/TelaCadastro';
import TabNavigator from './src/navigation/TabNavigator';
import DetalhesReceita from './src/screens/DetalhesReceita';
import CadastroReceita from './src/screens/CadastroReceita';
import EditarPerfil from './src/screens/EditarPerfil';
import Configuracoes from './src/screens/Configuracoes';
import SobreAplicativo from './src/screens/SobreAplicativo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Inicial"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#FFF6E7' },
          }}
        >
          <Stack.Screen name="Inicial" component={TelaInicial} />
          <Stack.Screen name="Login" component={TelaLogin} />
          <Stack.Screen name="Cadastro" component={TelaCadastro} />
          <Stack.Screen name="Principal" component={TabNavigator} />
          <Stack.Screen name="DetalhesReceita" component={DetalhesReceita} />
          <Stack.Screen name="EditarReceita" component={CadastroReceita} />
          <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
          <Stack.Screen name="Configuracoes" component={Configuracoes} />
          <Stack.Screen name="Sobre" component={SobreAplicativo} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
