import { DataSource } from "typeorm";
import { ICreateUserPayload } from "../interfaces/create-user-payload.interface";
import { UserEntity } from "../entities/user.entity";
import { APIGatewayProxyResult } from "aws-lambda";

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
      return {
        statusCode: 201,
        body: JSON.stringify({
          message: "User created successfully",
          data: user,
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
      return {
        statusCode: 201,
        body: JSON.stringify({
          message: "User created successfully",
          data: users,
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
}
