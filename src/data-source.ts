import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: process.env.DB_TYPE,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USER, 
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: true,
	entities: [
		__dirname + "/entity/*.ts"
	],
	migrations: [
		__dirname + "/migrations/*.ts"
	],
	subscribers: [
		__dirname + "/subscribers/*.ts"
	],
});
