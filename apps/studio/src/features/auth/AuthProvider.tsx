import type { TLoginUser, TUser } from "@blog/lib";
import { useState, type ReactNode } from "react";
import AuthService from "./AuthService";
import { AxiosError } from "axios";

import { AuthContext } from "./AuthContext";
import type { TLogin } from "./types";
import AuthenticationError from "@/errors/UnauthorizedError";
import { Outlet, useNavigate } from "react-router";

const TOKEN_KEY = "token";
export function AuthProvider() {
  const [user, setUser] = useState<TUser | null>(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem(TOKEN_KEY) || "",
  );

  const navigate = useNavigate();
  // const navigate = useNavigate();

  const login = async (data: TLoginUser) => {
    try {
      const { user, token }: { user: TUser | null; token: string } =
        await AuthService.login(data);
      if (user) {
        setUser(user);
        setAccessToken(token);
        localStorage.token = token;
        navigate("/posts");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new AuthenticationError(error.message);
      }
    }
  };

  const logout = () => {
    setAccessToken("");
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  };
  return (
    <AuthContext value={{ user, accessToken, login, logout }}>
      {/* {children} */}
      <Outlet />
    </AuthContext>
  );
}

export default AuthProvider;
