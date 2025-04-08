import { createContext, useState, useEffect } from "react";

interface AuthContextType {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (user: string) => {
    setUser(user);
    localStorage.setItem("user", user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(stored);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};