export const DAYS = {
    en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    es: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
} as const;
  
export const APPOINTMENT_STATES = {
    en: ["Available", "Pending", "Confirmed", "Cancelled"],
    es: ["Disponible", "Pendiente", "Confirmado", "Cancelado"],
} as const;

export type DaysType = typeof DAYS;
export type AppointmentStatesType = typeof APPOINTMENT_STATES;