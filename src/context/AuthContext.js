import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

// Provider compartilha o usuário autenticado com todas as telas.
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  function definirUsuario(usuarioLogado) {
    // Chamado depois que o login é validado no SQLite.
    setUsuario(usuarioLogado);
  }

  function logout() {
    setUsuario(null);
  }

  function atualizarUsuario(dados) {
    setUsuario((usuarioAtual) => ({ ...usuarioAtual, ...dados }));
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        definirUsuario,
        logout,
        atualizarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
