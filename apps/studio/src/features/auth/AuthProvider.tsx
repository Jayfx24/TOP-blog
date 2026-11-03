import type { TLoginUser, TUser } from "@blog/lib";
import { useEffect, useState, type ReactNode } from "react";
import AuthService from "./AuthService";
import { AxiosError } from "axios";

import { AuthContext } from "./AuthContext";

import AuthenticationError from "@/errors/UnauthorizedError";
import { useNavigate } from "react-router";

const TOKEN_KEY = "access_token";
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem(TOKEN_KEY) || "",
  );

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const { user: currentUser } = await AuthService.getCurrentUser();

        setUser(currentUser ?? null);
      } catch (error){
        // TODO: handle the error
        console.log(error)
        setUser(null);
      } finally {
        setIsLoading(false);
        
      }
    };
    restoreUser();
  }, [setUser]);
  // check if user token is active else login

  const navigate = useNavigate();
  // const navigate = useNavigate();

  const login = async (data: TLoginUser) => {
    try {
      setIsLoading(true);
      const { user, token }: { user: TUser | null; token: string } =
        await AuthService.login(data);

      if (user) {
        setUser(user);
        setAccessToken(token);
        localStorage.access_token = token;
        navigate("/posts"); //TODO: Remove or change to home - for client/studio
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new AuthenticationError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    // TODO: error handling logic
    await AuthService.logout();
    setAccessToken("");
    setUser(null);
    navigate("/login");

    localStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext value={{ user, accessToken, login, logout, isLoading }}>
      {children}
    </AuthContext>
  );
}

export default AuthProvider;
