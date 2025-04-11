import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express";
import { Adress } from "../entity/Adress.ts";

const adressRepository = AppDataSource.getRepository(Adress);
export class AdressController {
  static async all(request: Request, response: Response, next: NextFunction) {
    try {
      const adresses = await adressRepository.find();

      if (adresses.length === 0) {
        return response.status(404).json({ error: "Adresses not found" });
      }

      return response.status(200).json({ message: "Adresses found", adresses: adresses });
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  static async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
    
      if (!id) {
        return response.status(400).json({ error: "Adress ID not provided"});
      }

      const adress = await adressRepository.findOne({
        where: { id }
      });

      if (!adress) {
        return response.status(404).json({ error: "Adress not found" });
      }

      return response.status(200).json({ message: "Adress found", adress: adress });
    } catch {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  static async save(request: Request, response: Response, next: NextFunction) {
    try {  
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

      if ( !street || !number || !city || !province || !country) {
        return response.status(400).json({ error: "Adress not null data not provided" });
      }

      const adress = Object.assign(new Adress(), {
        street,
        number,
        floor,
        department,
        intersectionStreet,
        city,
        province,
        country
      });

      await adressRepository.save(adress);

      return response.status(201).json({ message: "Adress created", adress: adress });
    } catch {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  static async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).json({ error: "Adress ID not provided"});
      }
      
      let adressToRemove = await adressRepository.findOneBy({ id });

      if (!adressToRemove) {
        return response.status(404).json({ error: "Adress not found" });
      }

      await adressRepository.remove(adressToRemove);

      return response.status(204).json({ message: "Adress deleted" });
    } catch {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}