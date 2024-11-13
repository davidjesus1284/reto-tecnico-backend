import { DataSource } from "typeorm";
import { UserService } from "../../services/user.service";
import { ICreateUserPayload } from "../../interfaces/create-user-payload.interface";

jest.mock("typeorm", () => {
  const actualTypeorm = jest.requireActual("typeorm");
  return {
    ...actualTypeorm,
    DataSource: jest.fn().mockImplementation(() => ({
      initialize: jest.fn(),
      destroy: jest.fn(),
      getRepository: jest.fn(),
    })),
  };
});

describe("Testing UserService in serverless app", () => {
  let userService: UserService;
  let dataSource: jest.Mocked<DataSource>;
  let userRepository: { create: jest.Mock; save: jest.Mock };

  beforeEach(() => {
    dataSource = new DataSource({} as any) as jest.Mocked<DataSource>;

    userRepository = {
      create: jest.fn(),
      save: jest.fn(),
    };

    dataSource.getRepository.mockReturnValue(userRepository as any);

    userService = new UserService(dataSource);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a user and return success message", async () => {
    const payload: ICreateUserPayload = {
      name: "Juan",
      email: "juan@example.com",
    };
    const userEntityMock = { id: 1, ...payload };

    userRepository.create.mockReturnValue(userEntityMock);
    userRepository.save.mockResolvedValue(userEntityMock);

    const result = await userService.createUser(payload);

    expect(dataSource.initialize).toHaveBeenCalled();
    expect(userRepository.create).toHaveBeenCalledWith(payload);
    expect(userRepository.save).toHaveBeenCalledWith(userEntityMock);
    expect(result).toEqual({
      statusCode: 201,
      body: JSON.stringify({
        message: "User created successfully",
        data: userEntityMock,
      }),
    });
  });

  it("Should return a 500 error if a problem occurs", async () => {
    const payload: ICreateUserPayload = {
      name: "Juan",
      email: "juan@example.com",
    };
    userRepository.create.mockImplementation(() => {
      throw new Error("DB error");
    });

    const result = await userService.createUser(payload);

    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    });
  });
});
