import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

/* Creamos el contexto como estado global */
const AuthContext = React.createContext();

/* Hook para acceder al contexto de manera global */
const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [usuario, cambiarUsuario] = useState();

    const [cargando, cambiarCargando] = useState(true);

    /* Efecto para ejecutar la comprobación de inicio de sesión */
    useEffect(() => {
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false);
        });

        return cancelarSuscripcion;
    }, []);

    return (
        <AuthContext.Provider value={{usuario: usuario}}>

            {/* Solo cargamos la app si ya estamos autenticados */}
            {!cargando && children}
        </AuthContext.Provider>
    );
}
 
export {AuthProvider, AuthContext, useAuth};
