import { db } from "#lib/prisma.js";
import { type UserCreateInput } from "#generated/prisma/models.js";


// TODO: USE LIB TYPES
async function findUserByUsername(username: string) {
  return await db.user.findUnique({
    where: {
      username,
    },
    omit: {
      passwordHash: false,
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
  });
}

const UserService = {
  findUserByUsername,
  findUserById,
  createUser,
};

export default UserService;
