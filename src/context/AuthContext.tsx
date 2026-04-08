import { createContext, useContext, useState } from "react";
import { register, login, logout } from "../services/api/auth";
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "author";
  bio: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: FormData) => Promise<void>;
  logout: () => void;
  syncUser: (partialUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null"),
  );

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const handleLogin = async (data: { email: string; password: string }) => {
    const res = await login(data);

    setUser(res.data.user);
    setToken(res.data.token);

    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);

    return res.data;
  };

  const handleRegister = async (data: FormData) => {
    await register(data);
  };

  const handleLogout = async () => {
    token && (await logout(token));

    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const syncUser = (partialUser: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;

      const nextUser = { ...prev, ...partialUser };
      localStorage.setItem("user", JSON.stringify(nextUser));

      return nextUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        syncUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
