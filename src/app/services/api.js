import { API_URL, GRAPHQL_URL } from '@/app/utils/settings'
import { GraphQLClient, gql } from 'graphql-request'

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

export const activacionCuenta = async (code) => {
  const response = await fetch(`${API_URL}/user/${localStorage.getItem('email')}/code/${code}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Error al obtener el codigo de activacion');
  }
  return response.json();
};

// Función para crear un nuevo cliente GraphQL con el token
const createGraphQLClient = (token) => {
  return new GraphQLClient(GRAPHQL_URL, {
    headers: token ? {
      Authorization: `Bearer ${token}`,
    } : {},
  });
};

export const getEventos = async (titulo, token) => {
  const graphQLClient = createGraphQLClient(token);

  const query = gql`
    query{
      eventos{
        id
        titulo
        direccion
        fecha
        asistentes{
          asistente{
            id
            nombre
            correo
            edad
          }
          valoracion{
            descripcion
          }
        }
      }
    }
  `;

  const variables = {
    titulo: titulo
  };

  try {
    const data = await graphQLClient.request(query, variables);
    return data.eventos;
  } catch (error) {
    console.error('Error fetching clases:', error);
    throw new Error('Error al obtener los eventos');
  }
};