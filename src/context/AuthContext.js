import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    function definirUsuario(usuarioLogado) {
        setUsuario(usuarioLogado);
    }

    function logout() {
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{
            usuario,
            definirUsuario,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}