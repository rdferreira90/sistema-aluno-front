// import { useNavigate } from "react-router-dom";

// export function Header() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <header className="w-full bg-gray-100 px-6 py-6 shadow">
//       <div className="flex justify-between items-center max-w-6xl mx-auto">        
//         <div className="absolute right-6 top-6 flex items-center gap-4">
//           <button className="text-blue-600">Perfil</button>
//           <button
//             className="bg-red-500 text-white px-3 py-1 rounded"
//             onClick={handleLogout}
//           >
//             Sair
//           </button>
//         </div>
//       </div>
//       <div className="my-8">
//         <h1 className="text-2xl font-semibold text-center w-full">Sistema do Seminário</h1>
//       </div>
//     </header>
//   );
// }


// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { LogOut, User } from "lucide-react";

// export function Header() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user) {
//       const parsed = JSON.parse(user);
//       setUsername(parsed.name || parsed.username || "Usuário");
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <header className="w-full bg-gray-100 px-6 py-6 shadow">
//       <div className="flex justify-between items-center max-w-6xl mx-auto">
//         <h1 className="text-2xl font-semibold text-center w-full">Sistema do Seminário</h1>

//         <div className="absolute right-6 top-6">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <div className="flex items-center gap-2 cursor-pointer">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src="" alt="Avatar" />
//                   <AvatarFallback>{username[0]}</AvatarFallback>
//                 </Avatar>
//                 <span className="font-medium text-sm">{username}</span>
//               </div>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-40 mt-2 mr-4">
//               <DropdownMenuItem onClick={() => navigate("/profile")}>
//                 <User className="w-4 h-4 mr-2" /> Meu Perfil
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={handleLogout}>
//                 <LogOut className="w-4 h-4 mr-2" /> Sair
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// }


// import { useNavigate } from "react-router-dom"
// import { Avatar } from "@/components/ui/avatar"
// import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu"
// import { LogOut, User as UserIcon } from "lucide-react"

// export function Header() {
//   const navigate = useNavigate()
//   const user = JSON.parse(localStorage.getItem("user") || "{}")

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     navigate("/login")
//   }

//   return (
//     <header className="w-full bg-gray-100 px-6 py-4 shadow relative">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl font-semibold text-center">Sistema do Seminário</h1>
//       </div>

//       <div className="absolute top-4 right-6">
//         <DropdownMenu
//           trigger={
//             <div className="flex items-center gap-2 cursor-pointer">
//               <Avatar fallback={user.name?.[0]?.toUpperCase() || "U"} />
//               <span className="text-sm font-medium text-gray-700">{user.name || "Usuário"}</span>
//             </div>
//           }
//         >
//           <DropdownMenuItem onClick={() => navigate("/profile")}>
//             <UserIcon className="w-4 h-4 mr-2" />
//             Meu Perfil
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={handleLogout}>
//             <LogOut className="w-4 h-4 mr-2" />
//             Sair
//           </DropdownMenuItem>
//         </DropdownMenu>
//       </div>
//     </header>
//   )
// }


import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";

export function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="w-full bg-gray-100 px-6 py-4 shadow relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-center">Sistema do Seminário</h1>
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
