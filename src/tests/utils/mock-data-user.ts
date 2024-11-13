import { UserEntity } from "../../entities/user.entity";

export const userDb = new UserEntity({
  email: "test@test.com",
  name: "test",
});
