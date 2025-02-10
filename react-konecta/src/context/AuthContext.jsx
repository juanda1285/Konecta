import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user'); // Recupera el estado completo del usuario
    if (token && storedUser) {
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const userData = JSON.parse(storedUser); // Usa el estado guardado
          setUser(userData);
        } else {
          console.error('El token no tiene el formato JWT correcto');
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Limpia el estado del usuario
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData)); // Guarda el estado completo del usuario
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Limpia el estado del usuario
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Agrega la validación de propiedades
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => React.useContext(AuthContext);