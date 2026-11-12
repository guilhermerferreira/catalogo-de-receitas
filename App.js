import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaLogin from './src/screens/TelaLogin';
import { NavigationContainer } from '@react-navigation/native';
import TelaHome from './src/screens/TelaHome';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={TelaLogin} />
        <Stack.Screen name='Home' component={TelaHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

