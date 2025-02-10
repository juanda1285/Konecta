const API_URL = 'http://localhost:3001'; // URL base de la API

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Suponiendo que el backend devuelve un mensaje de error en formato JSON
    throw new Error(errorData.message || 'Error al registrar el usuario');
  } 
  return response;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Error al iniciar sesión');
  }
  return response.text(); // Devuelve el token
};

const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const fetchEmpleados = async () => {
    const response = await fetch(`${API_URL}/empleado`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  };
  
  export const addEmpleado = async (empleado) => {
    const response = await fetch(`${API_URL}/empleado`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(empleado),
    });
    return response;
  };

  export const deleteEmpleado = async (id) => {
    await fetch(`${API_URL}/empleado/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
  };
  
  export const fetchSolicitudes = async () => {
    const response = await fetch(`${API_URL}/solicitud`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  };
  
  export const addSolicitud = async (solicitud) => {
    const response = await fetch(`${API_URL}/solicitud`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(solicitud),
    });
    return response;
  };
  
  export const deleteSolicitud = async (id) => {
    await fetch(`${API_URL}/solicitud/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
  };