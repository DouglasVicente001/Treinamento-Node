
import { User } from "@prisma/client";
import { appError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/prisma";
import { CreateUserDTO } from "../../dtos/CreateUserDto";
import "express-async-errors";
export class CreateUserUseCase {
    async execute({name, email}: CreateUserDTO): Promise<User> {
    //verificar se o usuário ja existe
    const userAlreadyExists = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (userAlreadyExists) {
        throw new appError("User already exists!",400);
    } 
    //criar usuario
    const user = await prisma.user.create({
        data: {
            name,
            email,
        },
    });
    return user;
    }
}