import { AppDataSource } from "../data-source.js"
import { NextFunction, Request, Response } from "express"
import { Timetable } from "../entity/Timetable.ts"

export class TimetableController {
    private timetableRepository = AppDataSource.getRepository(Timetable)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.timetableRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const timetable = await this.timetableRepository.findOne({
            where: { id }
        })

        if (!timetable) {
            return "unregistered timetable"
        }
        return timetable
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const {
            day,
            hour
        }: Timetable = request.body;

        const timetable = Object.assign(new Timetable(), {
            day,
            hour
        });

        return this.timetableRepository.save(timetable)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let timetableToRemove = await this.timetableRepository.findOneBy({ id })

        if (!timetableToRemove) {
            return "this timetable not exist"
        }

        await this.timetableRepository.remove(timetableToRemove)

        return "timetable has been removed"
    }

}