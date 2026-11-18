import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

// Layout raiz: envolve todas as rotas com o estado global do usuário.
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFF6E7' },
        }}
      >
        {/* Rotas públicas de entrada e autenticação. */}
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="cadastro" />

        {/* Grupo que contém as cinco abas principais do aplicativo. */}
        <Stack.Screen name="(tabs)" />

        {/* Rotas empilhadas abertas sobre as abas. */}
        <Stack.Screen name="receita/[id]" />
        <Stack.Screen name="receita/editar/[id]" />
        <Stack.Screen name="usuario/editar-perfil" />
        <Stack.Screen name="usuario/configuracoes" />
        <Stack.Screen name="usuario/sobre" />
      </Stack>
    </AuthProvider>
  );
}
