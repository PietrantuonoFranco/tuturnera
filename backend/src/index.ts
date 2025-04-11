import express from "express";
import { AppDataSource } from "./data-source.ts";
import 'dotenv/config';
import cors from "cors"
import cookieParser from "cookie-parser"

//Routes
import AdressRoutes from "./routes/AdressRoutes.ts"
import AppointmentRoutes from "./routes/AppointmentRoutes.ts"
import AuthRoutes from "./routes/AuthRoutes.ts"
import RoleRoutes from "./routes/RoleRoutes.ts"
import ServiceRoutes from "./routes/ServiceRoutes.ts"
import TimetableRoutes from "./routes/TimetableRoutes.ts"
import UserRoutes from "./routes/UserRoutes.ts"

AppDataSource.initialize().then(async () => {
    // create express app
    const app = express();

    app.use(cors({
        origin: 'http://localhost:4321',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.use(cookieParser());
    app.use(express.json());

    // register express routes from defined application routes
    app.use("/adresses", AdressRoutes);
    app.use("/appointments", AppointmentRoutes);
    app.use("/auths", AuthRoutes);
    app.use("/roles", RoleRoutes);
    app.use("/services", ServiceRoutes);
    app.use("/timetables", TimetableRoutes);
    app.use("/users", UserRoutes);
    
    // setup express app here
    // ...

    // start express server
    app.listen(process.env.EXPRESS_PORT);

    // insert new users for test
  /*  await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            firstName: "Timber",
            lastName: "Saw",
            age: 27
        })
    )

    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            firstName: "Phantom",
            lastName: "Assassin",
            age: 24
        })
    )
*/
    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
