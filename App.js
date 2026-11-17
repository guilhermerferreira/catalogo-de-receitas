
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import TelaLogin from './src/screens/TelaLogin';
import TelaCadastro from './src/screens/TelaCadastro';
import TelaInicial from './src/screens/TelaInicial';
import TabNavigator from './src/navigation/TabNavigator';

import { UsuarioProvider } from './src/context/UsuarioContext';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <UsuarioProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Login'>
                    <Stack.Screen name='Inicial' component={TelaInicial} />
                    <Stack.Screen name='Login' component={TelaLogin} />
                    <Stack.Screen name='Cadastro' component={TelaCadastro} />
                    <Stack.Screen name='Principal' component={TabNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </UsuarioProvider>
    );
}
