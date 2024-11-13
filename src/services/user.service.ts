import { DataSource } from "typeorm";
import { ICreateUserPayload } from "../interfaces/create-user-payload.interface";
import { UserEntity } from "../entities/user.entity";
import { APIGatewayProxyResult } from "aws-lambda";
import { TranslatedObject } from "../types/object-translate.type";

export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  public async createUser(
    payload: ICreateUserPayload
  ): Promise<APIGatewayProxyResult> {
    try {
      await this.dataSource.initialize();
      const userRepository = this.dataSource.getRepository(UserEntity);
      const user = userRepository.create(payload);
      await userRepository.save(user);
      const userTranslated = this.translateKeysToSpanish(user);
      return {
        statusCode: 201,
        body: JSON.stringify({
          message: "User created successfully",
          data: userTranslated,
        }),
      };
    } catch (error) {
      console.error("Error creating user:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal server error" }),
      };
    } finally {
      await this.dataSource.destroy();
    }
  }

  public async getListUser(): Promise<APIGatewayProxyResult> {
    try {
      await this.dataSource.initialize();
      const userRepository = this.dataSource.getRepository(UserEntity);
      const users = await userRepository.manager
        .createQueryBuilder(UserEntity, "user")
        .getMany();
      const usersTranslate = users.map((user) =>
        this.translateKeysToSpanish(user)
      );
      return {
        statusCode: 201,
        body: JSON.stringify({
          message: "User list generate",
          data: usersTranslate,
        }),
      };
    } catch (error) {
      console.error("Error find users:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal server error" }),
      };
    } finally {
      await this.dataSource.destroy();
    }
  }

  public async getUserById(id: string): Promise<APIGatewayProxyResult> {
    try {
      await this.dataSource.initialize();
      const userRepository = this.dataSource.getRepository(UserEntity);
      const user = await userRepository.manager
        .createQueryBuilder(UserEntity, "user")
        .where("user.id = :id", { id })
        .getOne();
      const userTranslated = this.translateKeysToSpanish(user);
      return {
        statusCode: 201,
        body: JSON.stringify({
          message: "User found successfully",
          data: userTranslated,
        }),
      };
    } catch (error) {
      console.error("Error find user:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal server error" }),
      };
    } finally {
      await this.dataSource.destroy();
    }
  }

  private translateKeysToSpanish(obj: any) {
    const newTranslated: TranslatedObject = {};
    const translated = this.translated();

    for (const key in obj) {
      if (key in translated) {
        const newKey = translated[key];
        newTranslated[newKey] = obj[key];
      } else {
        newTranslated[key] = obj[key];
      }
    }

    return newTranslated;
  }

  private translated() {
    const translations: { [key: string]: string } = {
      name: "nombre",
      email: "correo",
    };

    return translations;
  }
}
