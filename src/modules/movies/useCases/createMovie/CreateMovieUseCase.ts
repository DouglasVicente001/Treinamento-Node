import { CreateMovieDTO } from './../../dtos/CreateMovieDTO';
import { Movie } from "@prisma/client";
import { appError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/prisma";
import "express-async-errors";

export class CreateMovieUseCase {
    async execute({ title, duration, release_date }: CreateMovieDTO): Promise<Movie> {
        //verificar se o usuário ja existe
        const movieAlreadyExists = await prisma.movie.findUnique({
            where: {
                title,
            },
        });

        if (movieAlreadyExists) {
            throw new appError("Movie already exists!", 400);
        }
        //criar usuario
        const movie = await prisma.movie.create({
            data: {
                title,
                duration,
                release_date,
            },
        }); 
        return movie;
    }
}