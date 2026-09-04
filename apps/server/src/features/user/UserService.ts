import { db } from "#lib/prisma.js";
import { type UserCreateInput } from "#generated/prisma/models.js";

// type UserCreateType = Omit<UserCreateInput,"updatedAt"|"createdAt">;

class UserService {
  constructor() {}

  static async findUserByUsername(username: string) {
    return await db.user.findUnique({
      where: {
        username,
      },
    });
  }

  static async findUserById(id: number) {
    return await db.user.findUnique({
      where: {
        id,
      },
    });
  }
  static async createUser(data: UserCreateInput) {
    return await db.user.create({
      data,
    });
  }
}

export default UserService;
