import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllSubjects, deleteSubject } from '@/api/subjectService';
import { PaginatedTable } from '@/components/PaginatedTable';
import GenericModal from '@/components/Modal';
import { toast } from 'react-toastify';

interface Subject {
  id: number;
  name: string;
  description?: string;
  course_hours?: number;
  isActive: boolean;
}

export default function SubjectListPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalConfirmAction, setModalConfirmAction] = useState<() => void>(() => () => {});

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const data = await getAllSubjects();
        setSubjects(data);
      } catch (error) {
        toast.error('Erro ao carregar disciplinas.');
      }
    }

    fetchSubjects();
  }, []);

  const handleDelete = (id: number) => {
    setModalTitle('Confirmar Exclusão');
    setModalMessage('Tem certeza que deseja excluir esta disciplina?');
    setModalConfirmAction(() => () => handleConfirmDelete(id));
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async (id: number) => {
    try {
      const response = await deleteSubject(id);
      setSubjects((prev) => prev.filter((subject) => subject.id !== id));
      toast.success(response.message || 'Disciplina excluída com sucesso.');
    } catch (error) {
      toast.error('Erro ao excluir disciplina.');
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'name', label: 'Nome', sortable: true },
    { key: 'course_hours', label: 'Carga Horária' },
    { key: 'isActive', label: 'Ativa', render: (s: Subject) => (s.isActive ? 'Sim' : 'Não') },
    {
      key: 'id',
      label: 'Ações',
      render: (subject: Subject) => (
        <div className="flex items-center gap-4">
          <Link to={`/subjects/${subject.id}`} className="text-blue-600 hover:underline">
            Editar
          </Link>
          <button
            onClick={() => handleDelete(subject.id)}
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
        <h1 className="text-2xl font-bold">Disciplinas</h1>
        <Link to="/subjects/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          Nova Disciplina
        </Link>
      </div>

      <PaginatedTable data={subjects} columns={columns} searchKeys={['name']} />

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
