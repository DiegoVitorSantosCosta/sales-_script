import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import cors from "cors";
import { errors } from 'celebrate';
import routes from "@shared/routes";
import AppError from './../errors/App.errors';
// import "@shared/infra/typeorm"
import { AppDataSource } from "../infra/typeorm";
import uploadConfig from '@config/uploads';

AppDataSource.initialize()
    .then(async connect => {
        console.log('connect in database')
    })
    .catch((error) => console.log("Error: ", error))

const app = express();
const port = 3000

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(port, () => {
    console.log('Sever is runner in port ', port);
})