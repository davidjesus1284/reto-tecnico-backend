import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { ServiceSwarApi } from "../services/service-swar-api.service";
import { UserService } from "../services/user.service";
import { AppDataSource } from "../db/data-source";

const service = new ServiceSwarApi();
const userService = new UserService(AppDataSource);
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
  return userService.createUser(body);
};

export const getListUsers = async () => {
  return userService.getListUser();
};

export const getUser = async (event: APIGatewayEvent) => {
  const { id } = event.pathParameters || {};
  return userService.getUserById(id);
};
