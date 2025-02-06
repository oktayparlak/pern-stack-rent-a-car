import { createContext, useState, ReactNode, useEffect } from "react";
import { authService } from "../services/auth.service";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export { AuthContext };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = user?.isAdmin || false;

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
          setToken(storedToken);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setUser(response.user);
    setToken(response.accessToken);
    localStorage.setItem("token", response.accessToken);
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    const response = await authService.register({
      firstName,
      lastName,
      email,
      password,
    });
    setUser(response.user);
    setToken(response.accessToken);
    localStorage.setItem("token", response.accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  if (isLoading) {
    return null; // veya bir loading spinner gösterebilirsiniz
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isAdmin, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
