import type { TLoginUser, TUser } from "@blog/lib";
import { createContext, useContext } from "react";


interface IAuthContext {
  user: TUser | null;
  accessToken: string;
  login: (data: TLoginUser) => void;
  logout: () => void;
  isLoading: boolean
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  accessToken: "",
  login: () => {},
  logout: () => {},
  isLoading: true

});

export const useAuth = (): IAuthContext  => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
