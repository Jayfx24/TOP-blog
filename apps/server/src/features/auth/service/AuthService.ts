import { db } from "#lib/prisma.js";

class AuthService {
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
}

export default AuthService;
