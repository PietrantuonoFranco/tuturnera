import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source.ts";
import { User } from "../entity/User.ts";
import 'dotenv/config';

const userRepository = AppDataSource.getRepository(User);
const jwtSecret = process.env.JWT_SECRET || "your-secret-key";

export class AuthController {
  static async register(request: Request, response: Response) {
    try {
      const { email, password, name } = request.body;
      
      let user = await userRepository.findOne({ where: { email } });
      
      if (user) {
        return response.status(400).json({ message: "User already exists" });
      }

      user = new User();
      user.email = email;
      user.password = password;
      user.name = name;
      
      await user.hashPassword();
      await userRepository.save(user);

      const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
        expiresIn: "1h",
      });

      return response
        .status(201)
        .cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 3600000,
        })
        .json({ 
          user: user
        });
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      
      if (!email || !password) {
        return response.status(400).json({ 
          message: "Email and password are required" 
        });
      }

      const user = await userRepository.findOne({ where: { email } });
      
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      const isValid = await user.comparePassword(password);

      if (!isValid) {
        return response.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return response
        .status(200)
        .cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 3600000,
        })
        .json({ 
          user: user
        });
    } catch (error) {
      console.error("Login error:", error); // Log detallado
      return response.status(500).json({ 
        message: "Internal server error",
        error: error.message // En desarrollo, muestra el mensaje de error
      });
    }
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie("authToken");
    
    return res.status(200).json({ message: "Logged out successfully" });
  }

  static async profile(request: Request, response: Response) {
    try {
      const user = request.user as User;

      return response.json({ user: user });
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}