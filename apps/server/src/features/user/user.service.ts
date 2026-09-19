import { db } from "#lib/prisma.js";
import { type UserCreateInput } from "#generated/prisma/models.js";

async function findUserByUsername(username: string) {
  return await db.user.findUnique({
    where: {
      username,
    },
  });
}

async function findUserById(id: number) {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
}
async function createUser(payload: UserCreateInput) {
  return await db.user.create({
    data: payload,
    omit: {
      passwordHash: true,
    },
  });
}

const UserService = {
  findUserByUsername,
  findUserById,
  createUser,
};

export default UserService;
