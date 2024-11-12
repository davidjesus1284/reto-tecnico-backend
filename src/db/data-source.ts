import * as dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT! || "3306"),
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  logging: true,
  synchronize: false,
  migrationsTableName: "migrations",
  entities: ["src/entities/**/*.entity.ts"], // Ruta simplificada
  migrations: ["src/migrations/*.ts"], // Ruta simplificada
});
