import { createContext, useContext, useEffect, useState } from 'react';
import { getPermissionsFromToken } from '../api/auth';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  permissions: string[];
}


export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  permissions: [] 
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);

  const login = (user: User, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token); 
    setUser(user);
  
    const perms = getPermissionsFromToken(token); 
    console.log('permissions', perms)
    setPermissions(perms);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");    
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");    
    if (stored) setUser(JSON.parse(stored));

    const perms = getPermissionsFromToken();
    setPermissions(perms);

  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, permissions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth  = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');

  const hasPermission = (permission: string) => {
    return context.permissions?.includes(permission);
  };

  return {
    ...context,
    hasPermission,
  };
}