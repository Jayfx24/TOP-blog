import type { TUser } from "@blog/lib";
import { createContext, useContext } from "react";
import type { TLogin } from "./types";

interface IAuthContext {
  user: TUser | null;
  accessToken: string;
  login: (data: TLogin) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  accessToken: "",
  login: () => {},
  logout: () => {},
});

export const useAuth = (): IAuthContext  => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
