import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPermissions } from '@/api/permissionService';

interface Permission {
  id: number;
  name: string;
  description: string;
}

export default function PermissionListPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    async function fetchPermissions() {
      const data = await getAllPermissions();
      setPermissions(data);
    }
    fetchPermissions();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Permissões</h1>
        <Link to="/permissions/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          Nova Permissão
        </Link>
      </div>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Descrição</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id} className="hover:bg-gray-100">
              <td className="p-2 border">{permission.name}</td>
              <td className="p-2 border">{permission.description}</td>
              <td className="p-2 border">
                <Link to={`/permissions/${permission.id}`} className="text-blue-600 hover:underline">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
