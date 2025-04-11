import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPermission, getPermissionById, updatePermission } from '@/api/permissionService';

export default function PermissionFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    if (isEdit && id) {
      getPermissionById(Number(id)).then((data) => {
        setForm({ name: data.name, description: data.description });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && id) {
      await updatePermission(Number(id), form);
    } else {
      await createPermission(form);
    }
    navigate('/permissions');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Editar Permissão' : 'Nova Permissão'}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nome da permissão (ex: view_users)"
          className="p-2 border rounded"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descrição"
          className="p-2 border rounded"
          required
        />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Salvar
        </button>
      </form>
    </div>
  );
}
