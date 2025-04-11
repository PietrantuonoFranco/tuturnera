import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express";
import { Role } from "../entity/Role.ts";

const roleRepository = AppDataSource.getRepository(Role);
export class RoleController {
  static async all(request: Request, response: Response, next: NextFunction) {
    try {
      const roles = await roleRepository.find();

      if (roles.length === 0) {
        return response.status(404).json({ error: "Roles not found" });
      }

      return response.status(200).json({ message: "Roles found", roles: roles });
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  static async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
    
      if (!id) {
        return response.status(400).json({ error: "Role ID not provided"});
      }

      const role = await roleRepository.findOne({
        where: { id }
      });

      if (!role) {
        return response.status(404).json({ error: "Role not found" });
      }

      return response.status(200).json({ message: "Role found", role: role });
    } catch {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  static async save(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.body;

      if (!name) {
        return response.status(400).json({ error: "Necesary data not provided" });
      }
    
      const role = Object.assign(new Role(), { name });
        
      await roleRepository.save(role);

      return response.status(201).json({ message: "Role created", role: role });
    } catch {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  static async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).json({ error: "Role ID not provided"});
      }

      let roleToRemove = await roleRepository.findOneBy({ id });

      if (!roleToRemove) {
        return response.status(404).json({ error: "Role not found" });
      }

      await roleRepository.remove(roleToRemove);

      return response.status(204).json({ message: "Role deleted" });
    } catch {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}