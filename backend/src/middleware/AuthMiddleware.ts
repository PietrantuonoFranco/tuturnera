import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source.ts";
import { User } from "../entity/User.ts";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const token = req.cookies.authToken;
      
      if (!token) {
          return res.status(401).json({ message: 'No autenticado - No hay token' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
      
      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOne({ 
          where: { id: decoded.userId },
      });

      if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      req.user = user;

      next();
  } catch (error) {
      console.error('Error en autenticación:', error);
      return res.status(401).json({ message: 'No autenticado - Token inválido' });
  }
};