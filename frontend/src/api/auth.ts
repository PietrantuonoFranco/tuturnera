import api from "./api.ts"

const entity: string = "auths";

export const login = async (email: string, password: string) => {
  const response = await api.post(`${entity}/login`, { 
    email, 
    password 
  }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
    
  return response.data;
};
  
export const logout = async () => {
  await api.post(`${entity}/logout`, {}, {
    withCredentials: true
  });
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get(`${entity}/profile`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return await response.data.user;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    
    return null;
  }
};