import express, { NextFunction, Request, Response } from "express";
import { routes } from './routes';
import { appError } from './errors/AppError';
const app = express();

app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof appError) {
        return response.status(err.statuscode).json({
            status: "error",
            message: err.message
        })
    }
    return response.status(500).json({
        status: "error",
        message: 'internal server error - ${err.message}'
    })
})

app.listen(333, () => console.log("Server is running in port 333")); 