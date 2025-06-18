
import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const AuthContext = useAuth();

  const handleLogout = () => {    
    AuthContext.logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-gray-100 px-6 py-4 shadow relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-center">Sistema de Gestão Gnosis</h1>
      </div>

      <div className="absolute top-4 right-6">
        <DropdownMenu
          trigger={
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm font-medium text-gray-700">{user.name || "Usuário"}</span>
              <Avatar fallback={user.name?.[0]?.toUpperCase() || "U"} />
            </div>
          }
        >
          <DropdownMenuItem
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2"
          >
            <UserIcon className="w-4 h-4" />
            <span>Meu Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenu>
      </div>
    </header>
  );
}
