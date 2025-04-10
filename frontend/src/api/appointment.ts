import api from "./api"

const entity: string = "appointments"

export const getAllAppointments = () => api.get(entity).then(({ data }) => data);

export const getAppointmentById = (id: string) => api.get(`${entity}/${id}`).then(({ data }) => data);


export const createAppointment = ({ ...appointment }) => {
    api.post(entity, appointment).then(({ data }) => data);
}

export const deleteAppointment = (id: string) => api.delete(`${entity}/${id}`);