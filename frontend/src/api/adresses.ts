import api from "./api";

const entity: string = "adresses";

export const getAllAdresses = () => api.get(entity).then(({ data }) => data);

export const getAdressById = (id: string) => api.get(`${entity}/${id}`).then(({ data }) => data);


export const createAdress = ({ ...adress }) => {
    api.post(entity, adress).then(({ data }) => data);
}

export const deleteAdress = (id: string) => api.delete(`${entity}/${id}`);