// import { NavLink } from 'react-router-dom';
// import { useState } from 'react';
// import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
// import { getLucideIcon } from '../utils/getLucideIcon';
// import { MenuItem } from '../types/menuItem';
// import { useAuth } from '../contexts/AuthContext';

// const menuItems: MenuItem[] = [
//     {
//         label: 'Dashboard',
//         icon: 'Home',
//         path: '/dashboard',
//         permission: 'view_dashboard'
//     },
//     {
//         label: 'Alunos',
//         icon: 'Users',
//         children: [
//             { label: 'Listar', icon: 'List', path: '/student', permission: 'view_students' },
//             { label: 'Novo', icon: 'UserPlus', path: '/student/new' },
//         ],
//     },
//     {
//         label: 'Professores',
//         icon: 'GraduationCap',
//         path: '/teacher',
//     },
//     {
//         label: 'Disciplinas',
//         icon: 'Book',
//         path: '/subject',
//     },
//     {
//         label: 'Secretaria',
//         icon: 'ClipboardList',
//         children: [
//             { label: 'Turmas', icon: 'LayoutGrid', path: '/class' },
//             { label: 'Matrículas', icon: 'ClipboardEdit', path: '/enrollment' },
//             { label: 'Alunos', icon: 'Users', path: '/student', permission: 'view_students' },
//             { label: 'Professores', icon: 'GraduationCap', path: '/teacher', permission: 'view_teachers' },
//         ],
//     },
//     {
//         label: 'Relatórios',
//         icon: 'BarChart',
//         children: [
//             { label: 'Alunos', icon: 'FileText', path: '/reports/students' },
//             { label: 'Disciplinas', icon: 'FileText', path: '/reports/subjects' },
//         ],
//     },
// ];


// export function Sidebar() {
//     const [collapsed, setCollapsed] = useState(false);
//     const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
//     const { permissions } = useAuth();

//     const toggleSection = (label: string) => {
//         setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
//     };

//     const filteredMenu = menuItems
//         .filter(item => !item.permission || permissions.includes(item.permission))
//         .map(item => ({
//             ...item,
//             children: item.children?.filter(child => !child.permission || permissions.includes(child.permission))
//         }));


//     return (
//         <aside className={`bg-indigo-900 text-white p-4 ${collapsed ? 'w-20' : 'w-64'} min-h-screen transition-all duration-300`}>
//             <div className={`flex ${collapsed ? 'justify-center' : 'justify-between'} items-center mb-6`}>
//                 {!collapsed && <h2 className="text-xl font-bold">Menu</h2>}
//                 <button onClick={() => setCollapsed(!collapsed)}>
//                     <Menu />
//                 </button>
//             </div>

//             <nav className="flex flex-col gap-2">
//                 {filteredMenu.map((item) => {
//                     const Icon = getLucideIcon(item.icon);
//                     const isOpen = openSections[item.label];

//                     if (item.children) {
//                         return (
//                             <div key={item.label}>
//                                 <button
//                                     onClick={() => toggleSection(item.label)}
//                                     className="flex items-center gap-2 w-full px-2 py-2 rounded hover:bg-blue-700"
//                                 >
//                                     <Icon className="w-5 h-5" />
//                                     {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
//                                     {!collapsed && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
//                                 </button>

//                                 {isOpen && !collapsed && (
//                                     <div className="ml-6 mt-1 flex flex-col gap-1">
//                                         {item.children.map((child) => {
//                                             const ChildIcon = getLucideIcon(child.icon);
//                                             return (
//                                                 <NavLink
//                                                     key={child.label}
//                                                     to={child.path || '#'}
//                                                     className={({ isActive }) =>
//                                                         `flex items-center gap-2 px-2 py-1 rounded hover:bg-blue-700 ${isActive ? 'bg-blue-700' : ''
//                                                         }`
//                                                     }
//                                                 >
//                                                     <ChildIcon className="w-4 h-4" />
//                                                     <span>{child.label}</span>
//                                                 </NavLink>
//                                             );
//                                         })}
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     }

//                     return (
//                         <NavLink
//                             key={item.label}
//                             to={item.path || '#'}
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-2 py-2 rounded hover:bg-blue-700 ${isActive ? 'bg-blue-700' : ''
//                                 }`
//                             }
//                         >
//                             <Icon className="w-5 h-5" />
//                             {!collapsed && <span>{item.label}</span>}
//                         </NavLink>
//                     );
//                 })}
//             </nav>
//         </aside>
//     );
// }

import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { getLucideIcon } from '../utils/getLucideIcon';
import { MenuItem } from '../types/menuItem';
import { useAuth } from '../contexts/AuthContext';
import { buildMenu } from '@/utils/buildMenu';

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
    const { permissions } = useAuth();
    const menuItems = buildMenu(permissions);

    const toggleSection = (label: string) => {
        setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
    };


    function renderMenuItems(items: MenuItem[], level = 0): JSX.Element[] {
        return items.map((item) => {
            const Icon = getLucideIcon(item.icon);
            const isOpen = openSections[item.label];
            const hasChildren = item.children && item.children.length > 0;
            const paddingLeft = collapsed ? '' : `pl-${level * 4}`; // adiciona indentação

            if (hasChildren) {
                return (
                    <div key={item.label}>
                        <button
                            onClick={() => toggleSection(item.label)}
                            className={`flex items-center gap-2 w-full px-2 py-2 rounded hover:bg-blue-700 ${paddingLeft}`}
                        >
                            <Icon className="w-5 h-5" />
                            {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                            {!collapsed && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                        </button>

                        {isOpen && !collapsed && (
                            <div className="ml-4 flex flex-col gap-1">
                                {renderMenuItems(item.children!, level + 1)}
                            </div>
                        )}
                    </div>
                );
            }

            return (
                <NavLink
                    key={item.label}
                    to={item.path || '#'}
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-2 rounded hover:bg-blue-700 ${isActive ? 'bg-blue-700' : ''
                        } ${paddingLeft}`
                    }
                >
                    <Icon className="w-5 h-5" />
                    {!collapsed && <span>{item.label}</span>}
                </NavLink>
            );
        });
    }

    return (
        <aside className={`bg-indigo-900 text-white p-4 ${collapsed ? 'w-20' : 'w-64'} min-h-screen transition-all duration-300`}>
            <div className={`flex ${collapsed ? 'justify-center' : 'justify-between'} items-center mb-6`}>
                {!collapsed && <h2 className="text-xl font-bold">Menu</h2>}
                <button onClick={() => setCollapsed(!collapsed)}>
                    <Menu />
                </button>
            </div>

            <nav className="flex flex-col gap-2">
                {renderMenuItems(menuItems)}
            </nav>
        </aside>
    );
}
