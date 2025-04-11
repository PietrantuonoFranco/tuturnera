import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express";
import { Timetable } from "../entity/Timetable.ts";

const timetableRepository = AppDataSource.getRepository(Timetable);
export class TimetableController {
  static async all(request: Request, response: Response, next: NextFunction) {
    try {
      const timetables = await timetableRepository.find();

      if (timetables.length === 0) {
        return response.status(404).json({ error: "Timetables not found" });
      }

      return response.status(200).json({ message: "Timetables found", timetables: timetables });
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  static async one(request: Request, response: Response, next: NextFunction) {
    try {  
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).json({ error: "Timetable ID not provided"});
      }

      const timetable = await timetableRepository.findOne({
        where: { id }
      });

      if (!timetable) {
        return response.status(404).json({ error: "Timetable not found" });
      }

      return response.status(200).json({ message: "Timetable found", timetable: timetable });
    } catch {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  static async save(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        day,
        hour
      } = request.body;

      if (!day || !hour) {
        return response.status(400).json({ error: "Necesary data not provided" });
      }

      const timetable = Object.assign(new Timetable(), {
        day,
        hour
      });

      await timetableRepository.save(timetable);

      return response.status(201).json({ message: "Timetable created", timetable: timetable });
    } catch {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  static async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).json({ error: "Timetable ID not provided"});
      }

      let timetableToRemove = await timetableRepository.findOneBy({ id });

      if (!timetableToRemove) {
        return response.status(404).json({ error: "Timetable not found" });
      }

      await timetableRepository.remove(timetableToRemove)

      return response.status(204).json({ message: "Timetable deleted" });
    } catch {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}