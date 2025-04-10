import { AppDataSource } from "../data-source.js"
import { NextFunction, Request, Response } from "express"
import { Adress } from "../entity/Adress.ts"
import { ApplyChangesetOptions } from "node:sqlite"
import { Appointment } from "../entity/Appointment.ts"

export class AdressController {
    private adressRepository = AppDataSource.getRepository(Adress)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.adressRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const adress = await this.adressRepository.findOne({
            where: { id }
        })

        if (!adress) {
            return "unregistered adress"
        }
        return adress
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const {
            street,
            number,
            floor,
            department,
            intersectionStreet,
            city,
            province,
            country
        } = request.body;

        const adress = Object.assign(new Adress(), {
            street,
            number,
            floor,
            department,
            intersectionStreet,
            city,
            province,
            country
        })

        return this.adressRepository.save(adress)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let adressToRemove = await this.adressRepository.findOneBy({ id })

        if (!adressToRemove) {
            return "this adress not exist"
        }

        await this.adressRepository.remove(adressToRemove)

        return "adress has been removed"
    }

}