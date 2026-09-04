import bcrypt from "bcrypt";

export async function genHash(string: string): Promise<string> {
  return await bcrypt.hash(string, 12);
}

export async function isValidPwd(
  userPwd: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(userPwd, hash);
}
