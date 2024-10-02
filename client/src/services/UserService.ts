import axios from 'axios';

const API_URL = 'http://localhost:4444/users';

export interface User {
  id: number;
  name: string;
  email: string;
  profile: {
    phone: string;
  };
}

export interface CreateUserDTO {
  name: string;
  email: string;
  phone: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  phone?: string;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createUser = async (data: CreateUserDTO): Promise<User> => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateUser = async (id: number, data: UpdateUserDTO): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, data);
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
