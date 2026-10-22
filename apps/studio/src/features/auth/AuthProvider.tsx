import type { TLoginUser, TUser } from "@blog/lib";
import { useState, type ReactNode } from "react";
import AuthService from "./AuthService";
import { AxiosError } from "axios";

import { AuthContext } from "./AuthContext";

import AuthenticationError from "@/errors/UnauthorizedError";
import { useNavigate } from "react-router";

const TOKEN_KEY = "token";
export function AuthProvider({ children }: { children: ReactNode }) {
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
        navigate("/posts"); //TODO: Remove or change to home - for client/studio
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
      {children}
    </AuthContext>
  );
}

export default AuthProvider;
