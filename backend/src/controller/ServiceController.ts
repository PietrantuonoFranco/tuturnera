import { AppDataSource } from "../data-source.js"
import { NextFunction, Request, Response } from "express"
import { Service } from "../entity/Service.ts"

export class ServiceController {
    private serviceRepository = AppDataSource.getRepository(Service)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.serviceRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const service = await this.serviceRepository.findOne({
            where: { id }
        })

        if (!service) {
            return "unregistered service"
        }
        return service
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const {
            name,
            phone,
            email,
            description,
            imgProfileURL,
            adress,
            timetables,
        }: Service = request.body;

        const service = Object.assign(new Service(), {
            name,
            phone,
            email,
            description,
            imgProfileURL,
            adress,
            timetables,
        })

        return this.serviceRepository.save(service)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let serviceToRemove = await this.serviceRepository.findOneBy({ id })

        if (!serviceToRemove) {
            return "this service not exist"
        }

        await this.serviceRepository.remove(serviceToRemove)

        return "service has been removed"
    }

}