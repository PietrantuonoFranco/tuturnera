import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express";
import { Service } from "../entity/Service.ts";

const serviceRepository = AppDataSource.getRepository(Service);
export class ServiceController {
  static async all(request: Request, response: Response, next: NextFunction) {
    try {
      const services = await serviceRepository.find();

      if (services.length === 0) {
        return response.status(404).json({ error: "Services not found" });
      }

      return response.status(200).json({ message: "Services found", services: services });
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    } 
  }

  static async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).json({ error: "Service ID not provided"});
      }

      const service = await serviceRepository.findOne({
        where: { id }
      });

      if (!service) {
        return response.status(404).json({ error: "Service not found" });
      }

      return response.status(200).json({ message: "Service found", service: service });
    } catch {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  static async save(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        name,
        phone,
        email,
        description,
        imgProfileURL,
        adress,
        timetables,
      } = request.body;

      if (!name || !adress || !timetables) {
        return response.status(400).json({ error: "Necesary data not provided" });
      }

      const service = Object.assign(new Service(), {
        name,
        phone,
        email,
        description,
        imgProfileURL,
        adress,
        timetables,
      });

      await serviceRepository.save(service);

      return response.status(201).json({ message: "Service created", service: service });
    } catch {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  static async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).json({ error: "Service ID not provided"});
      }

      let serviceToRemove = await serviceRepository.findOneBy({ id });

      if (!serviceToRemove) {
        return response.status(404).json({ error: "Service not found" });
      }

      await serviceRepository.remove(serviceToRemove);

      return response.status(204).json({ message: "Service deleted" });
    } catch {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}