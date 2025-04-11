import { AppDataSource } from "../data-source.js"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User.js"
import "dotenv"
import bcrypt from "bcryptjs";

const userRepository = AppDataSource.getRepository(User);
export class UserController {
  static async all(request: Request, response: Response, next: NextFunction) {
    try {
      const users = await userRepository.find();

      if (users.length === 0) {
        return response.status(404).json({ error: "Users not found" });
      }

      return response.status(200).json({ message: "Users found", users: users });
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

    
  static async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
    
      if (!id) {
        return response.status(500).json({ error: "User ID not provided"});
      }

      const user = await userRepository.findOne({
        where: { id }
      });

      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      return response.status(200).json({ message: "User found", user: user });
    } catch {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  static async save(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        email,
        name,
        surname,
        password,
        imgProfileURL,
        role,
        associatedUsers,
        services,
        appointments,
      } = request.body;

      if (!email || !name || !surname || !password || !role) {
        return response.status(400).json({ error: "Necesary data not provided" });
      }

      let user = await userRepository.findOne({ where: { email } });
      
      if (user) {
        return response.status(400).json({ message: "User already exists" });
      }

      user = Object.assign(new User(), {
        email,
        name,
        surname,
        password,
        imgProfileURL,
        role,
        associatedUsers,
        services,
        appointments,
      });

      await user.hashPassword();
      await userRepository.save(user);

      return response.status(201).json({ message: "User created", user: user });
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  static async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).json({ error: "User ID not provided"});
      }

      let userToRemove = await userRepository.findOneBy({ id });

      if (!userToRemove) {
        return response.status(404).json({ error: "User not found" });
      }

      await userRepository.remove(userToRemove);

      return response.status(204).json({ message: "User deleted" });
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}