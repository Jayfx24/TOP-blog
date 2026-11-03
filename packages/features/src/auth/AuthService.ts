import { api } from "../config/axios.config";
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

async function logout() {
  const { data } = await api.post("auth/logout");
  return data;
}

async function getCurrentUser() {
  const { data } = await api.get("auth/me");
  return data;
}

const AuthService = {
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
