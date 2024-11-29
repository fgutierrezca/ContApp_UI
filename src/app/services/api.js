import { API_URL } from '@/app/utils/settings'


export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Error en creacion de cuenta');
    }
    return response.json();
  };

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Error en el inicio de sesión');
  }
  return response.json();
};

export const getUserData = async (token) => {
  const response = await fetch(`${API_URL}/user`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Error al obtener datos del usuario');
  }
  return response.json();
};

export const getCodeActivation = async (code) => {
  const response = await fetch(`${API_URL}/user/${localStorage.getItem('email')}/code/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(code)
  });
  if (!response.ok) {
    throw new Error('Error al obtener el codigo de activacion');
  }
  return response.json();
};

export const activacionCuenta = async (email) => {
  const response = await fetch(`${API_URL}/user/${localStorage.getItem('email')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email)
  });
  if (!response.ok) {
    throw new Error('Error al activar cuenta');
  }
  return response.json();
};