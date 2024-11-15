import { ApplicationType } from "../types/application-type";

export const configLoader = (): ApplicationType => {
  return {
    url: process.env.START_WARS_API!,
    db: {
      host: process.env.DB_HOST!,
      port: process.env.DB_PORT!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      name: process.env.DB_NAME!,
    },
  };
};
