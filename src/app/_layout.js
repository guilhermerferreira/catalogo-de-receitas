import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFF6E7' } }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="login" />
                <Stack.Screen name="cadastro" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="receita/[id]" />
                <Stack.Screen name="receita/editar/[id]" />
                <Stack.Screen name="usuario/editar-perfil" />
                <Stack.Screen name="usuario/configuracoes" />
                <Stack.Screen name="usuario/sobre" />
            </Stack>
        </AuthProvider>
    );
}
