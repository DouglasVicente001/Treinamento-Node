import { appError } from './../../../../errors/AppError';

import { prisma } from '../../../../prisma/prisma';
import { CreateMovieRentDTO } from './../../dtos/CreateMovieRentDTO';

export class CreateMovieRentUseCase{
    async execute({ userId, movieId}: CreateMovieRentDTO): Promise<void> {
        //verificar se filme existe
        const movieExists = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        })
        if (!movieExists){
            throw new appError("Movie does not exists",400);
        }
        //verificar se o filme ja esta alugado para outro usuario
        const movieAlreadyRented = await prisma.movieRent.findFirst({
            where: {
                movieId
            }
        })
        if (movieAlreadyRented) {
            throw new appError("Movie already rented",400);
        }
        //verificar se usuario existe
        const userExists = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })
        if (!userExists){
            throw new appError("User does not exists",400);
        }
        //criar a locação
        await prisma.movieRent.create({
            data: {
                movieId,
                userId,
            }
        })
    }
}