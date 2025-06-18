import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUser } from '@/api/userService';
import { PaginatedTable } from '@/components/PaginatedTable';
import GenericModal from '@/components/Modal';
import { toast } from 'react-toastify';
import { User } from '@/types/user';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   username: string;
//   enrollment: string;
//   is_global_admin: boolean;
//   status: boolean;
// }

export default function UserListPage() {
  const [, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalConfirmAction, setModalConfirmAction] = useState<() => void>(() => () => {});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        setError('Erro ao carregar usuários');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    setModalTitle('Confirmar Exclusão');
    setModalMessage('Tem certeza que deseja excluir este usuário?');
    setModalConfirmAction(() => () => handleConfirmDelete(id));
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async (id: number) => {
    try {
      const response = await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success(response.message);
    } catch (error) {
      toast.error('Erro ao excluir usuário.');
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (user: User) => {
    navigate('/users/edit', {
      state: {
        isEditMode: true,
        existingUser: user
      }
    });
  };

  const columns = [
    { key: 'name', label: 'Nome', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'username', label: 'Usuário', sortable: true },
    { key: 'enrollment', label: 'Matrícula', sortable: true },
    {
      key: 'isGlobalAdmin',
      label: 'Admin Global',
      render: (user: User) => (user.isGlobalAdmin ? 'Sim' : 'Não')
    },
    {
      key: 'status',
      label: 'Status',
      render: (user: User) => (user.status ? 'Ativo' : 'Inativo')
    },
    {
      key: 'actions',
      label: 'Ações',
      render: (user: User) => (
        <div className="flex items-center gap-4">
          {/* <Link to={`/users/${user.id}`} className="text-blue-600 hover:underline">
            Editar
          </Link> */}
          <button
                onClick={() => handleEdit(user)}
                className="text-blue-600 hover:underline"
              >
                Editar
              </button>
          <button
            onClick={() => handleDelete(user.id)}
            className="text-red-600 hover:underline"
          >
            Excluir
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <Link to="/users/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          Novo Usuário
        </Link>
      </div>

      <PaginatedTable
        data={users}
        columns={columns}
        searchKeys={['name', 'email', 'username']}        
      />

      <GenericModal
        isOpen={isModalOpen}
        title={modalTitle}
        message={modalMessage}
        onConfirm={modalConfirmAction}
        onCancel={handleCancelDelete}
        confirmLabel="Confirmar"
        cancelLabel="Cancelar"
      />
    </div>
  );
}
