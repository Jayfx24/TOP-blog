import type { TUser } from "@blog/lib";
import {  useState, type ReactNode } from "react";
import AuthService from "./AuthService";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import type { TLogin } from "./types";

interface IAuthProvider {
  children: ReactNode;
}

const TOKEN_KEY = "token";
export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<TUser | null>(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem(TOKEN_KEY) || "",
  );

  // const navigate = useNavigate();

  const login = async ({ username, password }: TLogin) => {
    try {
      const { user, token }: { user: TUser | null; token: string } =
        await AuthService.login({ username, password });

      if (user) {
        setUser(user);
        setAccessToken(token);
        localStorage.token = token;
        // navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
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

export default AuthProvider

