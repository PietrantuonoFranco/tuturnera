import "reflect-metadata";
import { DataSource } from "typeorm";
import 'dotenv/config';

// Entities
import { Adress } from "./entity/Adress.ts";
import { Appointment } from "./entity/Appointment.ts";
import { Role } from "./entity/Role.ts";
import { Service } from "./entity/Service.ts";
import { Timetable } from "./entity/Timetable.ts";
import { User } from "./entity/User.ts";


export const AppDataSource = new DataSource({
    type: "postgres",  
    host: process.env.DB_HOST || 'postgres',
    port: parseInt(process.env.PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // ¡Cuidado en producción! (usa migraciones)
    logging: true,
    entities: [ Adress, Appointment, Service, Role, Timetable, User],
    migrations: [],
    subscribers: [],
});

AppDataSource.initialize()
    .then(() => console.log("✅ Conexión a la base de datos establecida"))
    .catch((error) => console.log("❌ Error de conexión:", error));