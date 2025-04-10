import api from "./api";

const entity: string = "services";

export const getAllServices = () => api.get(entity).then(({ data }) => data);

export const getServiceById = (id: string) => api.get(`${entity}/${id}`).then(({ data }) => data);


export const createService = ({ ...service }) => {
    api.post(entity, service).then(({ data }) => data);
}

export const deleteService = (id: string) => api.delete(`${entity}/${id}`);