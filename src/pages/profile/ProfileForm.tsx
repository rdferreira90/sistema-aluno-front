import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProfileById, createProfile, updateProfile } from '@/api/profileService';
import { getAllPermissions } from '@/api/permissionService';

interface Permission {
  id: number;
  name: string;
  description: string;
}

export default function ProfileFormPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', description: '', permissionIds: [] as number[] });
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    async function fetchPermissions() {
      const data = await getAllPermissions();
      setPermissions(data);
    }

    async function fetchProfile() {
      if (isEdit) {
        const data = await getProfileById(Number(id));
        setForm({
          name: data.name,
          description: data.description,
          permissionIds: data.permissionIds,
        });
      }
    }

    fetchPermissions();
    fetchProfile();
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePermissionToggle = (permissionId: number) => {
    setForm((prev) => ({
      ...prev,
      permissionIds: prev.permissionIds.includes(permissionId)
        ? prev.permissionIds.filter((id) => id !== permissionId)
        : [...prev.permissionIds, permissionId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit && id) {
        await updateProfile(Number(id), form);
      } else {
        await createProfile(form);
      }
      navigate('/profiles');
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar o perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/profiles');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Editar Perfil' : 'Novo Perfil'}</h1>

      <form className="flex flex-col gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nome do perfil"
          className="p-2 border rounded"
          required
        />
        {/* <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descrição"
          className="p-2 border rounded"
          required
        /> */}

        <div>
          <label className="block font-semibold mb-2">Permissões</label>
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto border p-2 rounded">
            {permissions.map((perm) => (
              <label key={perm.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.permissionIds.includes(perm.id)}
                  onChange={() => handlePermissionToggle(perm.id)}
                />
                {perm.description}
              </label>
            ))}
          </div>
        </div>
        {error && <div className="text-red-600 font-semibold">{error}</div>}
        <div className="flex gap-2 ml-auto">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>

      </form>

    </div>
  );
}
