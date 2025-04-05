import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

export const AppDataSource = new DataSource({
    type: "postgres",  
    host: process.env.HOST,
    port: parseInt(process.env.PORT || '3306'),
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [],
    migrations: [],
    subscribers: [],
});

// Inicializa la conexión
AppDataSource.initialize()
    .then(() => console.log("✅ Conexión a la base de datos establecida"))
    .catch((error) => console.log("❌ Error de conexión:", error));