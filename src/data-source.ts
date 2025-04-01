import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './config/env'; // Import your validated environment config

export const AppDataSource = new DataSource({
    type: 'postgres', // Type assertion since we validated with envalid
    host: env.DB_HOST,
    port: env.DB_PORT, // Already validated as number
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [__dirname + '/entity/*.ts'],
    migrations: [__dirname + '/migrations/*.ts'],
    subscribers: [__dirname + '/subscribers/*.ts'],
});
