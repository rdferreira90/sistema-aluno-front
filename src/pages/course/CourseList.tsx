import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses, deleteCourse } from '@/api/courseService';
import { PaginatedTable } from '@/components/PaginatedTable';
import GenericModal from '@/components/Modal';
import { toast } from 'react-toastify';

interface Course {
  id: number;
  name: string;
}

export default function CourseListPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalConfirmAction, setModalConfirmAction] = useState<() => void>(() => () => {});

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (error) {
        toast.error('Erro ao carregar cursos.');
      }
    }

    fetchCourses();
  }, []);

  const handleDelete = (id: number) => {
    setModalTitle('Confirmar Exclusão');
    setModalMessage('Tem certeza que deseja excluir este curso?');
    setModalConfirmAction(() => () => handleConfirmDelete(id));
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async (id: number) => {
    try {
      const response = await deleteCourse(id);
      setCourses((prev) => prev.filter((course) => course.id !== id));
      toast.success(response.message || 'Curso excluído com sucesso.');
    } catch (error) {
      toast.error('Erro ao excluir curso.');
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'name', label: 'Nome', sortable: true },
    {
      key: 'id',
      label: 'Ações',
      render: (course: Course) => (
        <div className="flex items-center gap-4">
          <Link to={`/course/${course.id}`} className="text-blue-600 hover:underline">
            Editar
          </Link>
          <button
            onClick={() => handleDelete(course.id)}
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
        <h1 className="text-2xl font-bold">Cursos</h1>
        <Link to="/course/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          Novo Curso
        </Link>
      </div>

      <PaginatedTable data={courses} columns={columns} searchKeys={['name']} />

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
