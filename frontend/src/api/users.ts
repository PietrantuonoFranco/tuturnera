import api from "./api";

const entity: string = "users";

export const getAllUsers = () => api.get(entity).then(({ data }) => data);

export const getUserById = (id: string) => api.get(`${entity}/${id}`).then(({ data }) => data);


export const createUser = ({ ...user }) => {
    api.post(entity, user).then(({ data }) => data);
}

export const deleteUser = (id: string) => api.delete(`${entity}/${id}`);