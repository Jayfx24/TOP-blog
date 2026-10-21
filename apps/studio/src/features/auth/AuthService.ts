import { api } from "@/config/axios.config";
import type { TUser } from "@blog/lib";

async function login({
  username,
  pwd,
}: {
  username: string;
  pwd: string;
}): Promise<{ user: TUser | null; token: string }> {
  const { data } = await api.post("auth/login", { username, pwd });
  return data;
}

const AuthService = {
  login,
};
export default AuthService;
