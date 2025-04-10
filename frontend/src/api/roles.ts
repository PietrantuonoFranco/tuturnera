import api from "./api";

const entity: string = "roles";

export const getAllRoles = () => api.get(entity).then(({ data }) => data);

export const getRoleById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createRole = ({ ...role }) => {
    api.post(entity, role).then(({ data }) => data);
}

export const deleteRole = (id: string) => api.delete(`${entity}/${id}`);