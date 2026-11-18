import { Tabs } from 'expo-router';
import Ionicons from '@react-native-vector-icons/ionicons';

function icone(ativo, inativo) {
    return function IconeDaAba({ focused, color, size }) {
        return <Ionicons name={focused ? ativo : inativo} color={color} size={size} />;
    };
}

export default function TabLayout() {
    return (
        <Tabs
            initialRouteName="index"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#0C343E',
                tabBarInactiveTintColor: '#66767A',
                tabBarHideOnKeyboard: true,
                tabBarStyle: { backgroundColor: '#FFFBF3', borderTopColor: '#E5E0D0' },
            }}
        >
            <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: icone('home', 'home-outline') }} />
            <Tabs.Screen name="favoritos" options={{ title: 'Favoritos', tabBarIcon: icone('heart', 'heart-outline') }} />
            <Tabs.Screen name="publicar" options={{ title: 'Publicar', tabBarIcon: ({ focused }) => <Ionicons name="add-circle" color={focused ? '#FFBE31' : '#0C343E'} size={45} /> }} />
            <Tabs.Screen name="minhas" options={{ title: 'Minhas', tabBarIcon: icone('reader', 'reader-outline') }} />
            <Tabs.Screen name="usuario" options={{ title: 'Perfil', tabBarIcon: icone('person', 'person-outline') }} />
        </Tabs>
    );
}
