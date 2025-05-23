import { createContext, useContext, useEffect, useState } from 'react';
import { getPermissionsFromToken } from '../api/auth';
import { User } from '@/types/user';


interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  permissions: string[] | null;
  userUnits: UnitPermission[];
  selectedUnit: UnitPermission | null;
  selectUnit: (unitId: number) => void;
}


export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  permissions: [] ,
  userUnits: [], 
  selectedUnit: null,
  selectUnit: () => {},
});

export interface UnitPermission {
  unit: {
    id: number;
    name: string;
  };
  permissions: {
    id: number;    
    name: string;
    description: string;
  }[];
}


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<string[] | null>([]);
  const [userUnits, setUserUnits] = useState<UnitPermission[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<UnitPermission | null>(null);


  // const login = (user: User, token: string) => {
  //   localStorage.setItem("user", JSON.stringify(user));
  //   localStorage.setItem("token", token); 
  //   setUser(user);
  
    // const perms = getPermissionsFromToken(token); 
  //   console.log('permissions', perms)
  //   setPermissions(perms);
  // };

  const login = (user: User, token: string) => {
     
    const decodedToken = getPermissionsFromToken(token);
    if(!decodedToken) return;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token); 

    user.isGlobalAdmin = decodedToken.is_global_admin;
    setUser(user);
  
    const units: UnitPermission[] = decodedToken.permissionsByUnit;
    setUserUnits(units);
  
    if (units.length === 1) {      
      setSelectedUnit(units[0]);
      localStorage.setItem("unitId", units[0].unit?.id.toString()) ; 
      const permissionKeys = units[0].permissions.map(p => p.name);
      setPermissions(permissionKeys);
    } else {
      setSelectedUnit(null);
      setPermissions([]);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");    
    localStorage.removeItem("user");
    localStorage.removeItem("unitId");
  };


  const selectUnit = (unitId: number) => {
    const unit = userUnits.find(u => u.unit.id === unitId);
    if (unit) {
      setSelectedUnit(unit);
      localStorage.setItem("unitId", unit.unit?.id.toString()) ; 
      const permissionKeys = unit.permissions.map(p => p.name);
      setPermissions(permissionKeys);
    }
  };


  useEffect(() => {
    const stored = localStorage.getItem("user");    
    if (stored) setUser(JSON.parse(stored));

    const perms = getPermissionsFromToken();
    if(!perms) return;

    let permissionKeys = [""];
    if(selectedUnit){
      permissionKeys = selectedUnit.permissions.map(p => p.name);
    }else{
      permissionKeys = perms.permissionsByUnit[0].permissions.map(p => p.name);      
    }
    setPermissions(permissionKeys);
  }, []);

  return (
    // <AuthContext.Provider value={{ user, login, logout, permissions }}>
    //   {children}
    // </AuthContext.Provider>
    <AuthContext.Provider value={{
      user,
      permissions,
      login,
      logout,
      userUnits,
      selectedUnit,
      selectUnit
    }}>
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