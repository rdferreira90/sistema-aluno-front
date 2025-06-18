import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllClassAssignments, deleteClassAssignment } from '@/api/classAssignmentService';
import { PaginatedTable } from '@/components/PaginatedTable';
import GenericModal from '@/components/Modal';
import { toast } from 'react-toastify';

interface ClassAssignment {
  id: number;
  description: string;
  date_ini: string;
  date_end: string;
  professor?: {
    id: number;
    name: string;
  };
}

export default function ClassAssignmentListPage() {
  const [assignments, setAssignments] = useState<ClassAssignment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalConfirmAction, setModalConfirmAction] = useState<() => void>(() => () => {});

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllClassAssignments();
        setAssignments(data);
      } catch (error) {
        toast.error('Erro ao carregar turmas.');
      }
    }

    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    setModalTitle('Confirmar Exclusão');
    setModalMessage('Tem certeza que deseja excluir esta turma?');
    setModalConfirmAction(() => () => handleConfirmDelete(id));
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async (id: number) => {
    try {
      const response = await deleteClassAssignment(id);
      setAssignments((prev) => prev.filter((item) => item.id !== id));
      toast.success(response.message || 'Turma excluída com sucesso.');
    } catch (error) {
      toast.error('Erro ao excluir turma.');
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'description', label: 'Descrição', sortable: true },
    { key: 'date_ini', label: 'Início' },
    { key: 'date_end', label: 'Término' },
    {
      key: 'professor',
      label: 'Professor',
      render: (item: ClassAssignment) => item.professor?.name || '-',
    },
    {
      key: 'id',
      label: 'Ações',
      render: (item: ClassAssignment) => (
        <div className="flex items-center gap-4">
          <Link to={`/class-assignment/${item.id}`} className="text-blue-600 hover:underline">
            Editar
          </Link>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-600 hover:underline"
          >
            Excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Turmas</h1>
        <Link to="/class-assignment/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          Nova Turma
        </Link>
      </div>

      <PaginatedTable data={assignments} columns={columns} searchKeys={['description']} />

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
