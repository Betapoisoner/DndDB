import dotenv from 'dotenv';
import path from 'path';
import logger  from './utils/logger';

// Load environment variables first to ensure availability for subsequent modules
dotenv.config({ path: path.resolve(__dirname, '../.env') });
logger.debug('Environment variables loaded', {
    envKeys: Object.keys(process.env).filter((k) => k.startsWith('DB')|| k.startsWith('LOG') || k.startsWith('CONSOLE')),
});

import express from 'express'; // Changed import syntax
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { Routes } from './routes';
import cors from 'cors'; // Changed import syntax

AppDataSource.initialize()
    .then(async () => {
        const app = express(); // Now correctly using the default export

        app.use(cors());
        app.use(express.json({ limit: '500mb' }));
        app.use(express.urlencoded({ extended: true, limit: '500mb' }));
        app.use(bodyParser.json());

        // Route registration
        Routes.forEach((route) => {
            (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
                const result = new (route.controller as any)()[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then((result) => result !== null && result !== undefined ? res.send(result) : undefined);
                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });

        app.listen(3000, () => {
            logger.silly('Express server has started on port 3000');
        });
    })
    .catch((error) => console.log(error));