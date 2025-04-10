import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source.ts";
import { Routes } from "./routes.ts";
import 'dotenv/config';
import cors from "cors"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();

    app.use(cors());

    app.use(express.json());

    // register express routes from defined application routes
    Routes.forEach(entityRoute => {
        entityRoute.forEach(route => {
            (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
                const result = (new (route.controller as any))[route.action](req, res, next);

                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });
    });

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
