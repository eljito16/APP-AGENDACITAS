import { createContext, useState, ReactNode } from "react";

type Role = "cliente" | "negocio";

type User = {
  username: string;
  password: string;
  role: Role;
  businessName?: string;
  description?: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => void;
  register: (username: string, password: string, role: Role) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const login = (username: string, password: string) => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
    } else {
      alert("Usuario y/o Contraseña incorrectos");
    }
  };

  const register = (username: string, password: string, role: Role) => {
    const newUser = { username, password, role };
    setUsers([...users, newUser]);
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}