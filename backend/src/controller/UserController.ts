import { AppDataSource } from "../data-source.js"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User.js"
import "dotenv"
import bcrypt from "bcryptjs";

export class UserController {
    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
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

        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = Object.assign(new User(), {
            email,
            name,
            surname,
            hashedPassword,
            imgProfileURL,
            role,
            associatedUsers,
            services,
            appointments,
        })

        return this.userRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

}