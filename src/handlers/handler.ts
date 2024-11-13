import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { ServiceSwarApi } from "../services/service-swar-api.service";
import { UserService } from "../services/user.service";
import { AppDataSource } from "../db/data-source";

const service = new ServiceSwarApi();

export const getDataSwarApi = async (): Promise<APIGatewayProxyResult> => {
  const { data, status } = await service.getData();
  return {
    statusCode: status,
    body: JSON.stringify(data),
  };
};

export const createData = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body || "{}");
  const userService = new UserService(AppDataSource);
  return userService.createUser(body);
};

export const getListUsers = async () => {
  const userService = new UserService(AppDataSource);
  return userService.getListUser();
};
