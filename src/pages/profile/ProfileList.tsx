import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProfiles } from '@/api/profileService';

interface Profile {
  id: number;
  name: string;
  description: string;
}

export default function ProfileListPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllProfiles();
      setProfiles(data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Perfis</h1>
        <Link to="/profiles/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          Novo Perfil
        </Link>
      </div>

      <table className="w-full border table-auto">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Descrição</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id} className="hover:bg-gray-100">
              <td className="p-2 border">{profile.name}</td>
              <td className="p-2 border">{profile.description}</td>
              <td className="p-2 border">
                <Link to={`/profiles/${profile.id}`} className="text-blue-600 hover:underline">
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
